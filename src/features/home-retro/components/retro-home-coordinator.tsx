"use client";

import { useState } from "react";
import { RetroNavbar } from "./retro-navbar";
import { CommandPalette } from "./command-palette";

interface RetroHomeCoordinatorProps {
  children: React.ReactNode;
}

export function RetroHomeCoordinator({ children }: RetroHomeCoordinatorProps) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const handleSelectSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <RetroNavbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      {children}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={handleSelectSection}
      />
    </>
  );
}
