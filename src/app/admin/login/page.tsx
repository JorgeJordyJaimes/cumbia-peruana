import { AdminAuthShell } from "@/features/auth/components/admin-auth-shell";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata = {
  title: "Acceso Administrativo | Kumbia Sound",
  description: "Inicio de sesión seguro para la administración del archivo histórico.",
};

export default function AdminLoginPage() {
  return (
    <AdminAuthShell>
      <LoginForm />
    </AdminAuthShell>
  );
}
