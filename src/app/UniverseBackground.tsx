"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const stars: Star[] = [];
    const maxStars = window.innerWidth < 600 ? 150 : 300; // Ajuste do número de estrelas

    // Função para gerar as estrelas
    const generateStars = () => {
      for (let i = 0; i < maxStars; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 1, // Tamanho das estrelas
          speed: Math.random() * 0.5 + 0.2, // Velocidade aleatória
          opacity: Math.random() * 0.5 + 0.5, // Opacidade aleatória para efeito mais sutil
        });
      }
    };

    // Função para desenhar as estrelas
    const renderStars = () => {
      if (!canvas) return;

      // Limpar o canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Desenhando as estrelas
      stars.forEach((star) => {
        // Efeito de movimento suave das estrelas
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0; // Reinicia a posição das estrelas no topo
        }

        // Efeito de brilho suave das estrelas
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.shadowBlur = 10; // Cria um leve desfoque para suavizar o brilho
        ctx.shadowColor = "white"; // Cor do brilho da estrela
        ctx.fill();
      });
    };

    // Inicializando o canvas e as estrelas
    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStars();
      renderStars();
    };

    initCanvas();

    // Redimensionamento do canvas
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderStars();
    });

    // Função de animação com throttle para otimizar a performance
    let lastTime = 0;
    const fps = 60; // Limitar a 60 FPS
    const animate = (time: number) => {
      if (time - lastTime > 1000 / fps) {
        renderStars();
        lastTime = time;
      }
      requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener("resize", renderStars);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] bg-black"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }} // Fundo preto com leve transparência
    />
  );
}
