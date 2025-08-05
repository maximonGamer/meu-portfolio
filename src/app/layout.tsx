"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BlackHoleEffect from "@/app/BlackHoleEffect";
import UniverseBackground from "@/app/UniverseBackground";

import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiPhp,
  SiPython,
  SiC,
  SiFlutter,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
  SiMysql,
  SiMongodb,
  SiFirebase,
} from "react-icons/si";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Portfólio de Claudio Lucas - Desenvolvedor Full Stack" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0D0D0D] text-gray-300`}
      >
        <UniverseBackground />
        <div className="black-hole" />

        <header className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-lg shadow-xl py-4 z-50 border-b border-gray-700 flex justify-center items-center space-x-8 text-lg">
          <a href="#about" className="hover:text-indigo-400 transition-all">Sobre</a>
          <a href="#curriculum" className="hover:text-indigo-400 transition-all">Currículo</a>
          <a href="#projects" className="hover:text-indigo-400 transition-all">Projetos</a>
          <a href="#contato" className="hover:text-indigo-400 transition-all">Contato</a>
        </header>

        <div className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
          <BlackHoleEffect />
        </div>

  

        <main className="min-h-screen pt-24 px-6 bg-gradient-to-b from-[#121212] to-[#0D0D0D] flex flex-col items-center justify-center">
          {children}
        </main>

        <footer id="contato" className="bg-black/60 backdrop-blur-lg py-6 text-center border-t border-gray-700 mt-10 flex justify-center gap-6">
          <a href="https://github.com/maximonGamer" className="hover:text-indigo-400 transition-all duration-300 text-2xl">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/claudio-lucas-henrique-francisco-ribeiro-1a8148346/" className="hover:text-indigo-400 transition-all duration-300 text-2xl">
            <FaLinkedin />
          </a>
          <a href="https://wa.me/5511998115005" className="hover:text-indigo-400 transition-all duration-300 text-2xl">
            <FaWhatsapp />
          </a>
        </footer>

        <div className="copyright-warning text-center py-6 text-sm text-gray-400 mt-12">
        <p className="text-center text-sm text-gray-400 mt-6">
  <span className="block mb-2 text-gray-300">© 2025 Claudio Lucas - Tecnologia Vision . Todos os direitos reservados.</span>
  <span className="block font-bold text-gray-200">
    Este conteúdo é protegido por direitos autorais e não pode ser copiado, reproduzido ou distribuído sem permissão.
  </span>
</p>
        </div>
      </body>
    </html>
  );
}
