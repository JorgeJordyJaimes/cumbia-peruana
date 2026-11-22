"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Mail, ArrowLeft, Loader2, AlertCircle, CheckCircle2, Disc3 } from "lucide-react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) {
        setErrorMessage(
          "No se pudo solicitar el restablecimiento. Intenta de nuevo en unos minutos."
        );
      } else {
        setSent(true);
      }
    } catch {
      setErrorMessage("Error de conexión con el servidor de autenticación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-2 border-[#1F1305] bg-white p-8 sm:p-10 w-full max-w-md mx-auto shadow-[8px_8px_0px_#1F1305]">
      <div className="text-center space-y-2 mb-8">
        <div className="mx-auto h-12 w-12 border-2 border-[#1F1305] bg-[#F1730C] flex items-center justify-center shadow-[3px_3px_0px_#1F1305] mb-4">
          <Disc3 className="h-7 w-7 text-[#1F1305]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black font-cooper text-[#1F1305] tracking-tight">
          Recuperar Acceso
        </h2>
        <p className="font-mono text-xs text-[#5A5245] font-bold">
          Kumbia Sound // Restablecimiento de Contraseña
        </p>
      </div>

      {sent ? (
        <div className="space-y-5">
          <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-4 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0 mt-0.5" />
            <div className="space-y-1.5 font-mono text-xs text-[#1F1305]">
              <p className="font-black uppercase tracking-wider">Solicitud registrada</p>
              <p className="text-[#5A5245] leading-relaxed">
                Si el correo existe en el archivo, recibirás un enlace para definir una nueva
                contraseña. Revisa también la carpeta de spam.
              </p>
            </div>
          </div>

          <Link
            href="/admin/login"
            className="w-full border-2 border-[#1F1305] bg-white py-3 px-4 font-mono text-xs font-black uppercase tracking-wider text-[#1F1305] shadow-[4px_4px_0px_#1F1305] hover:bg-[#EDE0D0] transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al Inicio de Sesión</span>
          </Link>
        </div>
      ) : (
        <>
          {errorMessage && (
            <div className="mb-6 border-2 border-[#1F1305] bg-[#FEE2E2] p-3.5 flex items-center gap-3 text-[#991B1B] text-xs font-mono font-bold shadow-[2px_2px_0px_#1F1305]">
              <AlertCircle className="h-4 w-4 shrink-0 text-[#991B1B]" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-xs text-[#5A5245] font-bold uppercase tracking-wider mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5A5245]" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full border-2 border-[#1F1305] bg-[#FAF8F5] py-3 pl-10 pr-4 text-sm text-[#1F1305] placeholder-[#5A5245] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E80000] transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 border-2 border-[#1F1305] bg-[#E80000] py-3 px-4 font-mono text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_#1F1305] hover:bg-[#1F1305] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  <span>Enviando Instrucciones...</span>
                </>
              ) : (
                <>
                  <span>Enviar Enlace de Recuperación</span>
                  <Mail className="h-4 w-4 text-white" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/admin/login"
              className="font-mono text-[11px] font-bold text-[#5A5245] underline underline-offset-2 hover:text-[#E80000] transition-colors"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
