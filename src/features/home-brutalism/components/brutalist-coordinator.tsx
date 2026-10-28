"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { BrutalistTopBar } from "./brutalist-top-bar";
import { BrutalistNavbar } from "./brutalist-navbar";

// Lazy-load dinámico del CommandPalette (bundle-dynamic-imports)
const CommandPalette = dynamic(
  () => import("@/features/home-retro/components/command-palette").then((mod) => mod.CommandPalette),
  { ssr: false }
);

interface BrutalistCoordinatorProps {
  children: React.ReactNode;
  totalAlbumes?: number | null;
  totalSellos?: number | null;
}

export function BrutalistCoordinator({
  children,
  totalAlbumes,
  totalSellos,
}: BrutalistCoordinatorProps) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <>
      <BrutalistTopBar totalAlbumes={totalAlbumes} totalSellos={totalSellos} />
      <BrutalistNavbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      {children}
      {isCommandPaletteOpen ? (
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
        />
      ) : null}
    </>
  );
}
