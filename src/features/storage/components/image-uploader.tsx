"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, Check, Loader2, Image as ImageIcon, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const isBusy = phase === "converting" || phase === "uploading";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setStats(null);

    // Validación de tipo de imagen
    const isImage = file.type.startsWith("image/") || /\.(jpe?g|png|webp)$/i.test(file.name);
    if (!isImage) {
      setErrorMsg("Formato no compatible. Por favor sube una imagen JPG, PNG o WebP.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      // 1. Interceptar y convertir automáticamente a WebP de alta fidelidad vía Canvas API
      setPhase("converting");
      const { blob: webpBlob, stats: compStats } = await convertToWebP(file);
      setStats(compStats);

      // 2. Subir el WebP procesado al Storage de Supabase
      setPhase("uploading");
      const timestamp = Date.now();
      const storagePath = `${folderPath}/${fileId}-${suffix}-${timestamp}.webp`;

      const supabase = createClient();
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
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
      } = supabase.storage.from(bucketName).getPublicUrl(storagePath);

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
        <span className="font-mono text-xs text-neutral-400 font-medium">
          {label}
        </span>
        {previewUrl && (
          <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
            <Check className="h-3 w-3" /> Imagen WebP activa
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Thumbnail Preview */}
        <div className="relative h-16 w-16 rounded-xl border border-white/10 bg-black/60 overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Vista previa"
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon className="h-6 w-6 text-neutral-600" />
          )}
          {isBusy && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center">
              <Loader2 className="h-5 w-5 text-amber-400 animate-spin" />
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
              "inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 font-mono text-xs font-bold transition-all cursor-pointer",
              phase === "success"
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                : "border-white/15 bg-white/5 text-neutral-200 hover:border-amber-400 hover:bg-white/10 hover:text-white",
              isBusy && "opacity-60 cursor-not-allowed"
            )}
          >
            {phase === "converting" ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />
                <span>Transformando a WebP (Canvas)...</span>
              </>
            ) : phase === "uploading" ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />
                <span>Subiendo al Storage...</span>
              </>
            ) : phase === "success" ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>¡Procesada y guardada en WebP!</span>
              </>
            ) : (
              <>
                <Upload className="h-3.5 w-3.5 text-amber-400" />
                <span>{previewUrl ? "Reemplazar Imagen (JPG/PNG/WebP)" : "Subir Imagen (JPG/PNG/WebP)"}</span>
              </>
            )}
          </button>

          {/* Estadísticas de compresión en tiempo real */}
          {stats ? (
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded text-emerald-300">
              <Sparkles className="h-3 w-3 text-emerald-400 shrink-0" />
              <span>
                {stats.originalFormat} ({stats.originalSizeKb} KB) → WebP ({stats.compressedSizeKb} KB)
                {stats.reductionPercentage > 0 ? ` [−${stats.reductionPercentage}%]` : ""}
              </span>
            </div>
          ) : (
            <p className="font-mono text-[10px] text-neutral-400">
              Sube JPG, PNG o WebP. Se convertirá y comprimirá automáticamente a WebP de alta fidelidad.
            </p>
          )}
        </div>
      </div>

      {errorMsg && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 flex items-center gap-2 text-red-300 font-mono text-[11px]">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-400" />
          <span className="truncate">{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
