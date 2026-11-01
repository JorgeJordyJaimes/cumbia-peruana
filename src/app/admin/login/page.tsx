import { LoginForm } from "@/features/auth/components/login-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Acceso Administrativo | Kumbia Sound",
  description: "Inicio de sesión seguro para la administración del archivo histórico.",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#EDE0D0] text-[#1F1305] selection:bg-[#E80000] selection:text-white p-6 font-mono">
      {/* Barra superior con volver al catálogo */}
      <div className="container mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-white px-3 py-1.5 font-mono text-xs font-bold text-[#1F1305] hover:bg-[#FAF8F5] shadow-[2px_2px_0px_#1F1305] transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-[#E80000]" />
          <span>← Volver al Catálogo Público</span>
        </Link>
      </div>

      {/* Formulario Central */}
      <div className="container mx-auto max-w-md py-12">
        <LoginForm />
      </div>

      {/* Pie de página */}
      <div className="text-center font-mono text-xs text-[#5A5245] font-bold">
        Kumbia Sound © {new Date().getFullYear()} — Sistema de Gestión y Peritaje Fonográfico
      </div>
    </div>
  );
}
