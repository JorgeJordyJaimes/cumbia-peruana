import { AdminAuthShell } from "@/features/auth/components/admin-auth-shell";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export const metadata = {
  title: "Recuperar Acceso | Kumbia Sound",
  description: "Solicita un enlace para restablecer la contraseña del panel administrativo.",
};

export default function ForgotPasswordPage() {
  return (
    <AdminAuthShell>
      <ForgotPasswordForm />
    </AdminAuthShell>
  );
}
