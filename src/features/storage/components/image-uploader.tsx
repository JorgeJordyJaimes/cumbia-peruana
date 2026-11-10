"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, Check, Loader2, Image as ImageIcon, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_EXTENSIONS = /\.(jpe?g|png|webp)$/i;
const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB

interface ImageUploaderProps {
  bucketName?: string;
  folderPath: string; // e.g. "albumes", "grupos", "personas", "sellos"
  fileId: string | number;
  suffix?: string; // e.g. "portada", "contraportada", "foto", "logo"
  currentUrl?: string | null;
  onUploaded: (publicUrl: string) => Promise<void> | void;
  className?: string;
  label?: string;
}

interface CompressionStats {
  originalFormat: string;
  originalSizeKb: number;
  compressedSizeKb: number;
  reductionPercentage: number;
}

// Convierte e intercepta cualquier imagen (JPG, PNG, WebP) a formato WebP optimizado en el cliente usando Canvas API
async function convertToWebP(
  file: File,
  maxDimension = 1600,
  quality = 0.90
): Promise<{ blob: Blob; stats: CompressionStats }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Redimensionamiento preservando ratio si excede el tamaño máximo
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("No se pudo inicializar el contexto Canvas 2D"));
          return;
        }

        // Renderizado en canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Transformación a WebP de alta fidelidad
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Error al generar el Blob WebP desde Canvas"));
              return;
            }

            const originalExt = file.name.split(".").pop()?.toUpperCase() || "IMG";
            const originalKb = Math.round(file.size / 1024);
            const compressedKb = Math.round(blob.size / 1024);
            const reduction = Math.max(0, Math.round((1 - blob.size / file.size) * 100));

            resolve({
              blob,
              stats: {
                originalFormat: originalExt,
                originalSizeKb: originalKb,
                compressedSizeKb: compressedKb,
                reductionPercentage: reduction,
              },
            });
          },
          "image/webp",
          quality
        );
      };
      img.onerror = () => reject(new Error("No se pudo cargar la imagen para su procesamiento"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Error al leer el archivo en memoria"));
    reader.readAsDataURL(file);
  });
}

export function ImageUploader({
  bucketName = "media",
  folderPath,
  fileId,
  suffix = "img",
  currentUrl,
  onUploaded,
  className,
  label = "Subir Imagen",
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<"idle" | "converting" | "uploading" | "success" | "error">("idle");
  const [stats, setStats] = useState<CompressionStats | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [prevCurrentUrl, setPrevCurrentUrl] = useState(currentUrl);
  if (currentUrl !== prevCurrentUrl) {
    setPrevCurrentUrl(currentUrl);
    setPreviewUrl(currentUrl || null);
  }

  const isBusy = phase === "converting" || phase === "uploading";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setStats(null);

    // 1. Verificación de tamaño máximo en cliente (evitar DoS de memoria en Canvas)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMsg("El archivo supera el tamaño máximo permitido de 15 MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // 2. Validación estricta de tipo MIME y extensión (bloqueando SVG y formatos no admitidos)
    const isValidMime = ALLOWED_MIME_TYPES.includes(file.type);
    const isValidExt = ALLOWED_EXTENSIONS.test(file.name);
    if (!isValidMime || !isValidExt) {
      setErrorMsg("Formato no compatible. Por favor sube una imagen JPG, PNG o WebP válida.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      // 1. Interceptar y convertir automáticamente a WebP de alta fidelidad vía Canvas API
      setPhase("converting");
      const { blob: webpBlob, stats: compStats } = await convertToWebP(file);
      setStats(compStats);

      // 2. Subir el WebP procesado al Storage de Supabase (sanitizando componentes de ruta)
      setPhase("uploading");
      const timestamp = Date.now();
      const sanitizedFolder = folderPath.replace(/[^a-zA-Z0-9_\-\/]/g, "").replace(/\.\./g, "").replace(/^\/+|\/+$/g, "");
      const sanitizedFileId = String(fileId).replace(/[^a-zA-Z0-9_\-]/g, "");
      const sanitizedSuffix = suffix.replace(/[^a-zA-Z0-9_\-]/g, "");
      const sanitizedBucket = bucketName.replace(/[^a-zA-Z0-9_\-]/g, "");
      const storagePath = `${sanitizedFolder}/${sanitizedFileId}-${sanitizedSuffix}-${timestamp}.webp`;

      const supabase = createClient();
      const { error: uploadError } = await supabase.storage
        .from(sanitizedBucket)
        .upload(storagePath, webpBlob, {
          contentType: "image/webp",
          upsert: true,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // 3. Obtener URL pública directa
      const {
        data: { publicUrl },
      } = supabase.storage.from(sanitizedBucket).getPublicUrl(storagePath);

      setPreviewUrl(publicUrl);

      // 4. Notificar callback del componente padre
      await onUploaded(publicUrl);

      setPhase("success");
      setTimeout(() => {
        setPhase("idle");
      }, 5000);
    } catch (err: unknown) {
      setPhase("error");
      const message = err instanceof Error ? err.message : "Error durante el procesamiento o subida";
      setErrorMsg(message);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs text-[#1F1305] font-black uppercase">
          {label}
        </span>
        {previewUrl && (
          <span className="border border-[#1F1305] bg-[#10B981] text-white px-1.5 py-0.2 font-mono text-[10px] font-black flex items-center gap-1 shadow-[1px_1px_0px_#1F1305]">
            <Check className="h-3 w-3" /> WebP Activa
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Thumbnail Preview */}
        <div className="relative h-16 w-16 border-2 border-[#1F1305] bg-[#FAF8F5] overflow-hidden flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#1F1305]">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Vista previa"
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon className="h-6 w-6 text-[#5A5245]" />
          )}
          {isBusy && (
            <div className="absolute inset-0 bg-[#1F1305]/75 flex items-center justify-center">
              <Loader2 className="h-5 w-5 text-white animate-spin" />
            </div>
          )}
        </div>

        {/* Upload Button & Trigger */}
        <div className="flex-1 space-y-1.5">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={handleFileChange}
            disabled={isBusy}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isBusy}
            className={cn(
              "inline-flex items-center gap-2 border-2 border-[#1F1305] px-3.5 py-1.5 font-mono text-xs font-black shadow-[2px_2px_0px_#1F1305] transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5",
              phase === "success"
                ? "bg-[#10B981] text-white"
                : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]",
              isBusy && "opacity-60 cursor-not-allowed"
            )}
          >
            {phase === "converting" ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#E80000]" />
                <span>Transformando a WebP (Canvas)...</span>
              </>
            ) : phase === "uploading" ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#E80000]" />
                <span>Subiendo al Storage...</span>
              </>
            ) : phase === "success" ? (
              <>
                <Check className="h-3.5 w-3.5 text-white" />
                <span>¡Procesada y guardada en WebP!</span>
              </>
            ) : (
              <>
                <Upload className="h-3.5 w-3.5 text-[#E80000]" />
                <span>{previewUrl ? "Reemplazar Imagen (JPG/PNG/WebP)" : "Subir Imagen (JPG/PNG/WebP)"}</span>
              </>
            )}
          </button>

          {/* Estadísticas de compresión en tiempo real */}
          {stats ? (
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] bg-[#EDE0D0] border border-[#1F1305] px-2 py-0.5 text-[#1F1305] font-bold shadow-[1px_1px_0px_#1F1305]">
              <Sparkles className="h-3 w-3 text-[#E80000] shrink-0" />
              <span>
                {stats.originalFormat} ({stats.originalSizeKb} KB) → WebP ({stats.compressedSizeKb} KB)
                {stats.reductionPercentage > 0 ? ` [−${stats.reductionPercentage}%]` : ""}
              </span>
            </div>
          ) : (
            <p className="font-mono text-[10px] text-[#5A5245]">
              Sube JPG, PNG o WebP. Se convertirá y comprimirá automáticamente a WebP de alta fidelidad.
            </p>
          )}
        </div>
      </div>

      {errorMsg && (
        <div className="border-2 border-[#1F1305] bg-[#FEE2E2] p-2 flex items-center gap-2 text-[#991B1B] font-mono text-[11px] font-bold shadow-[2px_2px_0px_#1F1305]">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 text-[#991B1B]" />
          <span className="truncate">{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
