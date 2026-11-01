import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#EDE0D0",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: "Panel de Control | Kumbia Sound",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#EDE0D0] text-[#1F1305]">
      {children}
    </div>
  );
}
