"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GlassCard } from "@/components/ui/glass-card";
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
    <GlassCard variant="editorial" className="p-8 sm:p-10 w-full max-w-md mx-auto shadow-2xl">
      <div className="text-center space-y-2 mb-8">
        <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-950/50 mb-4">
          <Disc3 className="h-7 w-7 text-black animate-spin-slow" />
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Acceso Administrativo
        </h2>
        <p className="font-mono text-xs text-neutral-400">
          Kumbia Sound // Gestión de Catálogo & Multimedia
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 flex items-center gap-3 text-red-300 text-xs font-mono">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-2">
            Correo Electrónico
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              type="email"
              required
              placeholder="soundkumbia@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/50 py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:bg-black/70 focus:outline-none transition-all font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-2">
            Contraseña Maestra
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              type="password"
              required
              placeholder="••••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/50 py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:bg-black/70 focus:outline-none transition-all font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-orange-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-black" />
              <span>Verificando Credenciales...</span>
            </>
          ) : (
            <>
              <span>Iniciar Sesión</span>
              <ArrowRight className="h-4 w-4 text-black" />
            </>
          )}
        </button>
      </form>
    </GlassCard>
  );
}
