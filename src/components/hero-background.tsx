"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const TOKENS = {
  colorA: "--action-primary",
  colorB: "--action-primary",
  colorC: "--surface-elevated",
} as const;

// Semantic tokens resolve to var() chains in any color syntax; normalise to rgb
// through a 1px canvas so the shader always receives a plain color.
function readColor(name: string): string {
  const probe = document.createElement("canvas").getContext("2d", {
    willReadFrequently: true,
  });
  if (!probe) return "#000000";
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  probe.fillStyle = "#000000";
  probe.fillStyle = raw;
  probe.fillRect(0, 0, 1, 1);
  const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
  return `rgb(${r}, ${g}, ${b})`;
}

const readPalette = () => ({
  colorA: readColor(TOKENS.colorA),
  colorB: readColor(TOKENS.colorB),
  colorC: readColor(TOKENS.colorC),
});

type Shader = {
  update: (id: string, props: Record<string, unknown>) => void;
  pause: () => void;
  resume: () => void;
  destroy: () => void;
};

/**
 * Decorative WebGPU backdrop. Colors follow the semantic tokens and re-tint when
 * the theme changes. Renders nothing without WebGPU or with reduced motion, so
 * the page keeps its static dot-grid background.
 */
export function HeroBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canvas || reduceMotion.matches || !("gpu" in navigator)) return;

    let shader: Shader | undefined;
    let observer: MutationObserver | undefined;
    let cancelled = false;

    const start = async () => {
      try {
        // Heavy chunk: only fetched once the page is idle and WebGPU exists.
        const { createShader, isWebGPUSupported } = await import("shaders/js");
        if (cancelled || !(await isWebGPUSupported())) return;

        const instance = await createShader(
          canvas,
          {
            components: [
              {
                type: "Aurora",
                id: "aurora",
                props: {
                  ...readPalette(),
                  intensity: 70,
                  speed: 2,
                  curtainCount: 2,
                },
              },
            ],
          },
          {
            disableTelemetry: true,
            onReady: () => setReady(true),
            onError: () => setReady(false),
          },
        );
        if (cancelled) {
          instance.destroy();
          return;
        }
        shader = instance;

        observer = new MutationObserver(() =>
          shader?.update("aurora", readPalette()),
        );
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["data-theme"],
        });
      } catch {
        // Keep the static background.
      }
    };

    const onMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        shader?.pause();
        setReady(false);
      } else {
        shader?.resume();
        setReady(Boolean(shader));
      }
    };
    reduceMotion.addEventListener("change", onMotionChange);

    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(start)
      : window.setTimeout(start, 200);

    return () => {
      cancelled = true;
      reduceMotion.removeEventListener("change", onMotionChange);
      observer?.disconnect();
      shader?.destroy();
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 size-full opacity-0 transition-opacity duration-1000 [mask-image:linear-gradient(to_bottom,#000_0%,transparent_85%)]",
        ready && "opacity-40 dark:opacity-55",
        className,
      )}
    />
  );
}
