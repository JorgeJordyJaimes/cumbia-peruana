"use client";

import { useState } from "react";
import { BrutalistTopBar } from "./brutalist-top-bar";
import { BrutalistNavbar } from "./brutalist-navbar";
import { CommandPalette } from "@/features/home-retro/components/command-palette";

interface BrutalistCoordinatorProps {
  children: React.ReactNode;
  totalAlbumes?: number | null;
  totalSellos?: number | null;
}

export function BrutalistCoordinator({
  children,
  totalAlbumes = 719,
  totalSellos = 258,
}: BrutalistCoordinatorProps) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <>
      <BrutalistTopBar totalAlbumes={totalAlbumes} totalSellos={totalSellos} />
      <BrutalistNavbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      {children}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </>
  );
}
