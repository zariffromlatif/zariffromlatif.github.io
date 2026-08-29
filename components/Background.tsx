"use client";

import { useEffect, useRef } from "react";

// A subtle "constellation" field: drifting nodes connected by faint indigo
// lines that thicken near the cursor. Fully paused under prefers-reduced-motion
// (replaced by a static gradient via CSS in globals.css).
export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return; // static gradient handles this case

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;

    const ACCENT = "109, 115, 255";
    const mouse = { x: -9999, y: -9999 };

    type Node = { x: number; y: number; vx: number; vy: number };
    let nodes: Node[] = [];

    function seed() {
      // Density scales with viewport area, capped for performance.
      const count = Math.min(90, Math.floor((width * height) / 18000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const LINK_DIST = 130;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Wrap around edges
        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        // Node dot
        const dm = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const near = dm < 160;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, near ? 1.8 : 1.2, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${ACCENT}, ${near ? 0.7 : 0.35})`;
        ctx!.fill();

        // Links to subsequent nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          if (d < LINK_DIST) {
            const base = (1 - d / LINK_DIST) * 0.18;
            // Boost opacity for links near the cursor
            const cursorBoost =
              Math.min(dm, Math.hypot(m.x - mouse.x, m.y - mouse.y)) < 160
                ? 0.22
                : 0;
            ctx!.beginPath();
            ctx!.moveTo(n.x, n.y);
            ctx!.lineTo(m.x, m.y);
            ctx!.strokeStyle = `rgba(${ACCENT}, ${base + cursorBoost})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
    >
      <canvas ref={canvasRef} />
      {/* Vignette to keep text legible toward the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base" />
    </div>
  );
}
