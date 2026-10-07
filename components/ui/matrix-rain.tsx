"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MatrixRainProps {
  color?: string;
  className?: string;
}

export function MatrixRain({ color = "#4D3CF7", className }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // A mix of symbols, numbers, and katakana/letters for authentic look
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}[]|;:<>?~ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ".split("");
    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = [];
    
    // Initialize drops at random negative positions so they don't all start at once
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100;
    }

    const draw = () => {
      // Semi-transparent white to create the trailing effect on a white background
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Add some random brightness to the lead character by drawing it again occasionally
        if (Math.random() > 0.9) {
            ctx.fillStyle = color; // solid color for the head
        } else {
            ctx.fillStyle = `${color}99`; // slightly transparent for the tail
        }

        ctx.fillText(text, x, y);

        // Reset drop to top randomly after it crosses the screen
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    };

    let animationFrameId: number;
    // Use setTimeout to control framerate (approx 30fps)
    const render = () => {
      draw();
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(render);
      }, 50);
    };
    render();

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(animationFrameId);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full block", className)}
      style={{
        maskImage: "radial-gradient(ellipse at center, black 0%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 80%)",
      }}
    />
  );
}
