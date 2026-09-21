import { AmbientGlow } from "@/components/ui/ambient-glow";
import { LoginForm } from "@/features/auth/components/login-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Acceso Administrativo | Kumbia Sound",
  description: "Inicio de sesión seguro para la administración del archivo histórico.",
};

export default function AdminLoginPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#0a0a0c] text-white selection:bg-amber-500 selection:text-black p-6">
      <AmbientGlow variant="warm-solar" className="top-0 left-0" />
      <AmbientGlow variant="chicha-psychedelic" className="bottom-0 right-0" />

      {/* Barra superior con volver al catálogo */}
      <div className="container mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al Catálogo Público
        </Link>
      </div>

      {/* Formulario Central */}
      <div className="container mx-auto max-w-md py-12">
        <LoginForm />
      </div>

      {/* Pie de página */}
      <div className="text-center font-mono text-[11px] text-neutral-500">
        Kumbia Sound © {new Date().getFullYear()} — Sistema de Gestión Restringido
      </div>
    </div>
  );
}
