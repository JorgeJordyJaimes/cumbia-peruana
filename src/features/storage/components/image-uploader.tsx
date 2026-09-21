"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, Check, Loader2, Image as ImageIcon, AlertCircle } from "lucide-react";
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

// Convierte cualquier imagen seleccionada a formato WebP optimizado en el cliente
async function convertToWebP(file: File, maxDimension = 1400, quality = 0.88): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

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
          reject(new Error("No se pudo obtener el contexto 2D de canvas"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Fallo al convertir la imagen a WebP"));
          },
          "image/webp",
          quality
        );
      };
      img.onerror = () => reject(new Error("Error al cargar la imagen"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Error al leer el archivo"));
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
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setSuccess(false);

    // Validación estricta: Solo formato WebP
    const isWebP = file.type === "image/webp" || file.name.toLowerCase().endsWith(".webp");
    if (!isWebP) {
      setErrorMsg("Formato no admitido: Solo se permite subir imágenes en formato WebP (.webp).");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setUploading(true);

    try {
      // 1. Optimizar y validar resolución a WebP en el navegador
      const webpBlob = await convertToWebP(file);

      // Generar nombre determinista: ej. albumes/14-portada-178995.webp
      const timestamp = Date.now();
      const storagePath = `${folderPath}/${fileId}-${suffix}-${timestamp}.webp`;

      const supabase = createClient();

      // 2. Subir a Supabase Storage con upsert
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(storagePath, webpBlob, {
          contentType: "image/webp",
          upsert: true,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // 3. Obtener URL pública
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(storagePath);

      setPreviewUrl(publicUrl);

      // 4. Notificar al padre para actualizar la base de datos
      await onUploaded(publicUrl);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al subir la imagen";
      setErrorMsg(message);
    } finally {
      setUploading(false);
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
          <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
            <Check className="h-3 w-3" /> Imagen cargada
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
          {uploading && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center">
              <Loader2 className="h-5 w-5 text-amber-400 animate-spin" />
            </div>
          )}
        </div>

        {/* Upload Button & Trigger */}
        <div className="flex-1 space-y-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/webp,.webp"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border px-3 py-2 font-mono text-xs transition-all cursor-pointer",
              success
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : "border-white/15 bg-white/5 text-neutral-200 hover:border-amber-400 hover:bg-white/10 hover:text-white",
              uploading && "opacity-50 cursor-not-allowed"
            )}
          >
            {uploading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />
                <span>Procesando & Subiendo...</span>
              </>
            ) : success ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>¡Actualizado con Éxito!</span>
              </>
            ) : (
              <>
                <Upload className="h-3.5 w-3.5 text-amber-400" />
                <span>{previewUrl ? "Reemplazar WebP" : "Seleccionar Archivo WebP"}</span>
              </>
            )}
          </button>

          <p className="font-mono text-[10px] text-amber-400/80">
            Restricción activa: Solo archivos en formato WebP (.webp).
          </p>
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
