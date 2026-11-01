"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lock, Mail, Disc3, ArrowRight, Loader2, AlertCircle } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        setErrorMessage("Credenciales incorrectas. Verifica correo y contraseña.");
        setLoading(false);
        return;
      }

      if (data.user) {
        // Redirigir al panel de administración
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setErrorMessage("Error de conexión con el servidor de autenticación.");
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
          Acceso Administrativo
        </h2>
        <p className="font-mono text-xs text-[#5A5245] font-bold">
          Kumbia Sound // Gestión de Catálogo &amp; Multimedia
        </p>
      </div>

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
              placeholder="soundkumbia@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-[#1F1305] bg-[#FAF8F5] py-3 pl-10 pr-4 text-sm text-[#1F1305] placeholder-[#5A5245] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E80000] transition-all font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-xs text-[#5A5245] font-bold uppercase tracking-wider mb-2">
            Contraseña Maestra
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5A5245]" />
            <input
              type="password"
              required
              placeholder="••••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-[#1F1305] bg-[#FAF8F5] py-3 pl-10 pr-4 text-sm text-[#1F1305] placeholder-[#5A5245] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E80000] transition-all font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 border-2 border-[#1F1305] bg-[#E80000] py-3 px-4 font-mono text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_#1F1305] hover:bg-[#1F1305] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              <span>Verificando Credenciales...</span>
            </>
          ) : (
            <>
              <span>Iniciar Sesión</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
