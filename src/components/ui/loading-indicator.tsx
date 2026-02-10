"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import NextTopLoader from "nextjs-toploader";

export default function GlobalLoader() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#000000");

  // Sync loader color with your Shadcn theme
  useEffect(() => {
    // If dark mode, use white (or your primary color), else black
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#09090b");
  }, [resolvedTheme]);

  return (
    <NextTopLoader
      color={color}
      showSpinner={false}
      height={2}
      crawl={true}
      speed={200}
      // The "State of the Art" glow effect (The 'peg' adds a blur)
      shadow={`0 0 10px ${color},0 0 5px ${color}`}
      zIndex={9999}
    />
  );
}
