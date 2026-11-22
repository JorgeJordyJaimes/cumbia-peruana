"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Lock,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Disc3,
  KeyRound,
} from "lucide-react";

type ResetStatus = "checking" | "ready" | "invalid" | "success";

export function ResetPasswordForm() {
  const [status, setStatus] = useState<ResetStatus>("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session)) {
        setStatus("ready");
      }
    });

    const prepare = async () => {
      try {
        const url = new URL(window.location.href);
        const errorDescription = url.searchParams.get("error_description");

        if (errorDescription) {
          setErrorMessage(errorDescription);
          setStatus("invalid");
          return;
        }

        const code = url.searchParams.get("code");
        const tokenHash = url.searchParams.get("token_hash");
        const type = url.searchParams.get("type");

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            setErrorMessage("El enlace de recuperación es inválido o ya expiró.");
            setStatus("invalid");
            return;
          }
          url.searchParams.delete("code");
          url.searchParams.delete("type");
          window.history.replaceState({}, "", url.pathname + url.search);
          setStatus("ready");
          return;
        }

        if (tokenHash && type === "recovery") {
          const { error } = await supabase.auth.verifyOtp({
            type: "recovery",
            token_hash: tokenHash,
          });
          if (error) {
            setErrorMessage("El enlace de recuperación es inválido o ya expiró.");
            setStatus("invalid");
            return;
          }
          url.searchParams.delete("token_hash");
          url.searchParams.delete("type");
          window.history.replaceState({}, "", url.pathname + url.search);
          setStatus("ready");
          return;
        }

        const hash = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = hash.get("access_token");
        const refreshToken = hash.get("refresh_token");

        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) {
            setErrorMessage("El enlace de recuperación es inválido o ya expiró.");
            setStatus("invalid");
            return;
          }
          window.history.replaceState({}, "", url.pathname + url.search);
          setStatus("ready");
          return;
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          setStatus("ready");
          return;
        }

        setErrorMessage("El enlace es inválido o ya expiró. Solicita uno nuevo.");
        setStatus("invalid");
      } catch {
        setErrorMessage("No se pudo validar el enlace de recuperación.");
        setStatus("invalid");
      }
    };

    void prepare();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    if (password.length < 8) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    setSaving(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setErrorMessage(
          error.message || "No se pudo actualizar la contraseña. Intenta de nuevo."
        );
        return;
      }

      await supabase.auth.signOut();
      setStatus("success");
    } catch {
      setErrorMessage("Error de conexión con el servidor de autenticación.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border-2 border-[#1F1305] bg-white p-8 sm:p-10 w-full max-w-md mx-auto shadow-[8px_8px_0px_#1F1305]">
      <div className="text-center space-y-2 mb-8">
        <div className="mx-auto h-12 w-12 border-2 border-[#1F1305] bg-[#F1730C] flex items-center justify-center shadow-[3px_3px_0px_#1F1305] mb-4">
          <Disc3 className="h-7 w-7 text-[#1F1305]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black font-cooper text-[#1F1305] tracking-tight">
          Nueva Contraseña
        </h2>
        <p className="font-mono text-xs text-[#5A5245] font-bold">
          Kumbia Sound // Restablecimiento Seguro
        </p>
      </div>

      {status === "checking" && (
        <div className="py-10 text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#E80000] mx-auto" />
          <p className="font-mono text-xs font-bold text-[#1F1305]">
            Validando enlace de recuperación...
          </p>
        </div>
      )}

      {status === "invalid" && (
        <div className="space-y-5">
          <div className="border-2 border-[#1F1305] bg-[#FEE2E2] p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-[#991B1B] shrink-0 mt-0.5" />
            <div className="space-y-1.5 font-mono text-xs text-[#991B1B]">
              <p className="font-black uppercase tracking-wider">Enlace no válido</p>
              <p className="leading-relaxed">
                {errorMessage ||
                  "El enlace de recuperación es inválido o ya expiró. Solicita uno nuevo."}
              </p>
            </div>
          </div>

          <Link
            href="/admin/forgot-password"
            className="w-full border-2 border-[#1F1305] bg-[#E80000] py-3 px-4 font-mono text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_#1F1305] hover:bg-[#1F1305] transition-all flex items-center justify-center gap-2"
          >
            <KeyRound className="h-4 w-4" />
            <span>Solicitar un Nuevo Enlace</span>
          </Link>

          <div className="text-center">
            <Link
              href="/admin/login"
              className="font-mono text-[11px] font-bold text-[#5A5245] underline underline-offset-2 hover:text-[#E80000] transition-colors"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-5">
          <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-4 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0 mt-0.5" />
            <div className="space-y-1.5 font-mono text-xs text-[#1F1305]">
              <p className="font-black uppercase tracking-wider">Contraseña actualizada</p>
              <p className="text-[#5A5245] leading-relaxed">
                Ya puedes iniciar sesión con tu nueva contraseña.
              </p>
            </div>
          </div>

          <Link
            href="/admin/login"
            className="w-full border-2 border-[#1F1305] bg-[#1F1305] py-3 px-4 font-mono text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_#E80000] hover:bg-[#E80000] transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Ir al Inicio de Sesión</span>
          </Link>
        </div>
      )}

      {status === "ready" && (
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
                Nueva Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5A5245]" />
                <input
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full border-2 border-[#1F1305] bg-[#FAF8F5] py-3 pl-10 pr-4 text-sm text-[#1F1305] placeholder-[#5A5245] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E80000] transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-[#5A5245] font-bold uppercase tracking-wider mb-2">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5A5245]" />
                <input
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Repite la contraseña"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full border-2 border-[#1F1305] bg-[#FAF8F5] py-3 pl-10 pr-4 text-sm text-[#1F1305] placeholder-[#5A5245] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E80000] transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full mt-2 border-2 border-[#1F1305] bg-[#E80000] py-3 px-4 font-mono text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_#1F1305] hover:bg-[#1F1305] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  <span>Actualizando Contraseña...</span>
                </>
              ) : (
                <>
                  <span>Guardar Nueva Contraseña</span>
                  <KeyRound className="h-4 w-4 text-white" />
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
