import { AdminAuthShell } from "@/features/auth/components/admin-auth-shell";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export const metadata = {
  title: "Nueva Contraseña | Kumbia Sound",
  description: "Define una nueva contraseña para el panel administrativo.",
};

export default function ResetPasswordPage() {
  return (
    <AdminAuthShell>
      <ResetPasswordForm />
    </AdminAuthShell>
  );
}
