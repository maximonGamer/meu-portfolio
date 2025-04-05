"use client";

import { useEffect, useRef } from "react";

interface CodeDrop {
  x: number;
  y: number;
  speed: number;
  char: string;
  alpha: number;
  size: number;
  color: string;
}

export default function CodeRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const codeDrops: CodeDrop[] = [];
    const chars =
      "12123214123335564645677547654786568445634234124124ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?{}[]|\\:;,.~`'\"";
    const numDrops = 800; // Aumentando o número de gotas

    // Função para gerar as gotas de código
    const generateDrops = () => {
      for (let i = 0; i < numDrops; i++) {
        codeDrops.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          speed: Math.random() * 3 + 2, // Mais variação na velocidade
          char: chars.charAt(Math.floor(Math.random() * chars.length)),
          alpha: Math.random() * 0.5 + 0.5,
          size: Math.random() * 20 + 10, // Tamanho variável
          color: `hsl(${Math.random() * 360}, 100%, 70%)`, // Cor variável com HSL
        });
      }
    };

    // Função para desenhar as gotas de código
    const renderDrops = () => {
      if (!canvas) return;

      // Limpar o canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fundo com sombra sutil
      ctx.fillStyle = "rgba(13, 13, 13, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Desenhando as gotas de código
      codeDrops.forEach((drop) => {
        drop.y += drop.speed;

        // Se a gota ultrapassar a parte inferior da tela, reinicia a posição dela
        if (drop.y > canvas.height) {
          drop.y = -20;
          drop.x = Math.random() * window.innerWidth;
        }

        // Efeito de brilho neon e cor dinâmica
        ctx.font = `${drop.size}px monospace`;
        ctx.fillStyle = `rgba(255, 255, 255, ${drop.alpha})`; // Cor principal branca com brilho
        ctx.shadowBlur = 10;
        ctx.shadowColor = drop.color; // A cor do brilho é diferente para cada gota
        ctx.fillText(drop.char, drop.x, drop.y);

        // Variação na transparência
        drop.alpha += Math.random() * 0.05 - 0.025;
        if (drop.alpha > 1) drop.alpha = 1;
        if (drop.alpha < 0.2) drop.alpha = 0.2;
      });
    };

    // Função para redimensionar o canvas
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Inicializando o canvas e os eventos
    const initCanvas = () => {
      resizeCanvas();
      generateDrops();
      renderDrops();
    };

    initCanvas();

    // Redimensionamento do canvas
    window.addEventListener("resize", resizeCanvas);

    // Repetindo a animação
    const animate = () => {
      renderDrops();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] bg-black"
    />
  );
}
