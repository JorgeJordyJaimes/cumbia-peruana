import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Panel de Control | Kumbia Sound",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 dark">
      {children}
    </div>
  );
}
