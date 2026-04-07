"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Adapted from https://21st.dev/community/components/Kain0127/particle-text-effect
// Customisations:
//  - transparent background (the surrounding hero already paints the bg)
//  - Solana purple → green gradient per-particle instead of random rgb
//  - container-aware sizing via ResizeObserver (no hard-coded 1000×500)
//  - pause-on-hidden to save battery
//  - removed right-click "kill" mechanic — it conflicts with our CTA layout

interface Vec2 {
  x: number;
  y: number;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

// Solana brand gradient stops. Particles are coloured based on their target
// X position — left-most cells → purple, right-most → green, with a cyan
// blend through the middle.
const GRADIENT_STOPS: RGB[] = [
  { r: 153, g: 69, b: 255 }, // #9945FF purple
  { r: 203, g: 156, b: 255 }, // #CB9CFF light purple
  { r: 67, g: 180, b: 202 }, // #43B4CA cyan
  { r: 20, g: 241, b: 149 }, // #14F195 green
];

function sampleGradient(t: number): RGB {
  const clamped = Math.max(0, Math.min(1, t));
  const scaled = clamped * (GRADIENT_STOPS.length - 1);
  const lo = Math.floor(scaled);
  const hi = Math.min(lo + 1, GRADIENT_STOPS.length - 1);
  const f = scaled - lo;
  const a = GRADIENT_STOPS[lo]!;
  const b = GRADIENT_STOPS[hi]!;
  return {
    r: Math.round(a.r + (b.r - a.r) * f),
    g: Math.round(a.g + (b.g - a.g) * f),
    b: Math.round(a.b + (b.b - a.b) * f),
  };
}

class Particle {
  pos: Vec2 = { x: 0, y: 0 };
  vel: Vec2 = { x: 0, y: 0 };
  acc: Vec2 = { x: 0, y: 0 };
  target: Vec2 = { x: 0, y: 0 };

  closeEnoughTarget = 100;
  maxSpeed = 1.0;
  maxForce = 0.1;
  particleSize = 10;
  isKilled = false;

  startColor: RGB = { r: 0, g: 0, b: 0 };
  targetColor: RGB = { r: 0, g: 0, b: 0 };
  colorWeight = 0;
  colorBlendRate = 0.01;

  move(): void {
    let proximityMult = 1;
    const dx = this.pos.x - this.target.x;
    const dy = this.pos.y - this.target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget;
    }

    const toX = this.target.x - this.pos.x;
    const toY = this.target.y - this.pos.y;
    const mag = Math.sqrt(toX * toX + toY * toY);
    let nx = 0;
    let ny = 0;
    if (mag > 0) {
      nx = (toX / mag) * this.maxSpeed * proximityMult;
      ny = (toY / mag) * this.maxSpeed * proximityMult;
    }

    const steerX = nx - this.vel.x;
    const steerY = ny - this.vel.y;
    const steerMag = Math.sqrt(steerX * steerX + steerY * steerY);
    if (steerMag > 0) {
      this.acc.x += (steerX / steerMag) * this.maxForce;
      this.acc.y += (steerY / steerMag) * this.maxForce;
    }

    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.acc.x = 0;
    this.acc.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D, drawAsPoints: boolean): void {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0);
    }
    const r = Math.round(
      this.startColor.r +
        (this.targetColor.r - this.startColor.r) * this.colorWeight,
    );
    const g = Math.round(
      this.startColor.g +
        (this.targetColor.g - this.startColor.g) * this.colorWeight,
    );
    const b = Math.round(
      this.startColor.b +
        (this.targetColor.b - this.startColor.b) * this.colorWeight,
    );

    if (drawAsPoints) {
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
    } else {
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  kill(width: number, height: number): void {
    if (this.isKilled) return;
    const randomPos = generateRandomPos(
      width / 2,
      height / 2,
      (width + height) / 2,
    );
    this.target.x = randomPos.x;
    this.target.y = randomPos.y;

    this.startColor = {
      r:
        this.startColor.r +
        (this.targetColor.r - this.startColor.r) * this.colorWeight,
      g:
        this.startColor.g +
        (this.targetColor.g - this.startColor.g) * this.colorWeight,
      b:
        this.startColor.b +
        (this.targetColor.b - this.startColor.b) * this.colorWeight,
    };
    this.targetColor = { r: 0, g: 0, b: 0 };
    this.colorWeight = 0;
    this.isKilled = true;
  }
}

function generateRandomPos(cx: number, cy: number, mag: number): Vec2 {
  const rx = Math.random() * 1000;
  const ry = Math.random() * 500;
  const dx = rx - cx;
  const dy = ry - cy;
  const m = Math.sqrt(dx * dx + dy * dy);
  if (m === 0) return { x: cx, y: cy };
  return { x: cx + (dx / m) * mag, y: cy + (dy / m) * mag };
}

interface ParticleTextEffectProps {
  /** Phrases to cycle through. Use `\n` for line breaks. */
  words: string[];
  className?: string;
  /** Frames between word transitions. At 60fps, 360 ≈ 6s. */
  cycleFrames?: number;
  /** CSS font-family (passed to the offscreen canvas when rasterising). */
  fontFamily?: string;
  /** Px step between sampled pixels. Smaller = denser = slower. */
  pixelSteps?: number;
  /** Draw particles as 2×2 points (true, fast) or circles (false, prettier). */
  drawAsPoints?: boolean;
}

export function ParticleTextEffect({
  words,
  className,
  cycleFrames = 420,
  fontFamily = "'JetBrains Mono', 'Fira Code', ui-monospace, monospace",
  pixelSteps = 5,
  drawAsPoints = true,
}: ParticleTextEffectProps): React.ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameCountRef = useRef(0);
  const wordIndexRef = useRef(0);
  const isVisibleRef = useRef(true);

  // Store mutable props in refs so effect runs once.
  const wordsRef = useRef(words);
  const cycleFramesRef = useRef(cycleFrames);
  wordsRef.current = words;
  cycleFramesRef.current = cycleFrames;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = (): void => {
      const rect = wrapper.getBoundingClientRect();
      const cssW = Math.max(1, Math.floor(rect.width));
      const cssH = Math.max(1, Math.floor(rect.height));
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // ── Rasterise a phrase into target points ────────────────────────────
    const nextWord = (phrase: string): void => {
      const logicalW = canvas.width / dpr;
      const logicalH = canvas.height / dpr;

      const offscreen = document.createElement("canvas");
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const octx = offscreen.getContext("2d");
      if (!octx) return;
      octx.setTransform(dpr, 0, 0, dpr, 0, 0);
      octx.fillStyle = "white";

      const lines = phrase.split("\n");
      // Fit the biggest line into ~80 % of the canvas width.
      const longest = lines.reduce(
        (a, b) => (a.length > b.length ? a : b),
        "",
      );
      let fontSize = Math.min(
        (logicalH / Math.max(lines.length, 1)) * 0.75,
        (logicalW / Math.max(longest.length, 1)) * 1.55,
      );
      fontSize = Math.max(32, Math.min(fontSize, 200));

      octx.font = `bold ${fontSize}px ${fontFamily}`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";

      const lineHeight = fontSize * 1.05;
      const totalH = lineHeight * lines.length;
      const startY = logicalH / 2 - totalH / 2 + lineHeight / 2;
      lines.forEach((line, i) => {
        octx.fillText(line, logicalW / 2, startY + i * lineHeight);
      });

      const imgData = octx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      const stride = pixelSteps * 4;

      // Collect eligible pixel indices and shuffle so particles are assigned
      // in an organic order, not top-left → bottom-right.
      const idxs: number[] = [];
      for (let i = 0; i < pixels.length; i += stride) {
        if ((pixels[i + 3] ?? 0) > 0) idxs.push(i);
      }
      for (let i = idxs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [idxs[i], idxs[j]] = [idxs[j]!, idxs[i]!];
      }

      const particles = particlesRef.current;
      let particleIdx = 0;

      for (const pixelIndex of idxs) {
        const xDevice = (pixelIndex / 4) % canvas.width;
        const yDevice = Math.floor(pixelIndex / 4 / canvas.width);
        // Convert back to logical (CSS) pixels so particle coordinates
        // match the canvas draw transform.
        const x = xDevice / dpr;
        const y = yDevice / dpr;

        // Colour this target pixel by its horizontal position across the
        // phrase's bounding box for a smooth left→right solana gradient.
        const gradientT = x / logicalW;
        const colour = sampleGradient(gradientT);

        let particle: Particle;
        if (particleIdx < particles.length) {
          particle = particles[particleIdx]!;
          particle.isKilled = false;
          particleIdx++;
        } else {
          particle = new Particle();
          const rand = generateRandomPos(
            logicalW / 2,
            logicalH / 2,
            (logicalW + logicalH) / 2,
          );
          particle.pos.x = rand.x;
          particle.pos.y = rand.y;
          particle.maxSpeed = Math.random() * 6 + 4;
          particle.maxForce = particle.maxSpeed * 0.05;
          particle.particleSize = Math.random() * 4 + 4;
          particle.colorBlendRate = Math.random() * 0.025 + 0.005;
          particles.push(particle);
        }

        particle.startColor = {
          r:
            particle.startColor.r +
            (particle.targetColor.r - particle.startColor.r) *
              particle.colorWeight,
          g:
            particle.startColor.g +
            (particle.targetColor.g - particle.startColor.g) *
              particle.colorWeight,
          b:
            particle.startColor.b +
            (particle.targetColor.b - particle.startColor.b) *
              particle.colorWeight,
        };
        particle.targetColor = colour;
        particle.colorWeight = 0;
        particle.target.x = x;
        particle.target.y = y;
      }

      // Excess particles dissipate into space.
      for (let i = particleIdx; i < particles.length; i++) {
        particles[i]!.kill(logicalW, logicalH);
      }
    };

    // ── Animation loop ───────────────────────────────────────────────────
    const animate = (): void => {
      animationRef.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      const logicalW = canvas.width / dpr;
      const logicalH = canvas.height / dpr;

      // Soft trail fade — transparent "black" with low alpha leaves a ghost
      // behind each particle without painting a solid rectangle over the hero.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, logicalW, logicalH);
      ctx.globalCompositeOperation = "source-over";

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!;
        p.move();
        p.draw(ctx, drawAsPoints);
        if (p.isKilled) {
          if (
            p.pos.x < 0 ||
            p.pos.x > logicalW ||
            p.pos.y < 0 ||
            p.pos.y > logicalH
          ) {
            particles.splice(i, 1);
          }
        }
      }

      frameCountRef.current++;
      if (
        wordsRef.current.length > 1 &&
        frameCountRef.current % cycleFramesRef.current === 0
      ) {
        wordIndexRef.current =
          (wordIndexRef.current + 1) % wordsRef.current.length;
        nextWord(wordsRef.current[wordIndexRef.current]!);
      }
    };

    // Kick off with the first phrase.
    nextWord(wordsRef.current[0]!);
    animate();

    // Resize observer so the canvas tracks its wrapper.
    const ro = new ResizeObserver(() => {
      resize();
      // Re-rasterise current phrase at the new size.
      nextWord(wordsRef.current[wordIndexRef.current]!);
    });
    ro.observe(wrapper);

    const onVisibility = (): void => {
      isVisibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      particlesRef.current = [];
      frameCountRef.current = 0;
      wordIndexRef.current = 0;
    };
  }, [drawAsPoints, fontFamily, pixelSteps]);

  return (
    <div ref={wrapperRef} className={cn("relative w-full h-full", className)}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
