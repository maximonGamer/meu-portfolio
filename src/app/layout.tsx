import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Claudio Lucas | Portfólio",
  description: "Portfólio de Claudio Lucas - Desenvolvedor e Analista de Sistemas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Portfólio de Claudio Lucas - Desenvolvedor e Analista de Sistemas" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0D0D0D] text-gray-300`}
      >
        {/* HEADER */}
        <header className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md shadow-lg py-4 z-50">
          <div className="max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
            <div className="text-3xl font-semibold tracking-wide text-indigo-500">
              Tecnologia Vision
            </div>
            <div className="mt-2 text-lg text-gray-400 italic">
              "Transformando ideias em soluções inovadoras, com foco em excelência e resultados."
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main className="min-h-screen pt-24 px-6 bg-gradient-to-b from-[#121212] to-[#0D0D0D]">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-black/50 backdrop-blur-md py-6 text-center border-t border-gray-800">
          <div className="max-w-7xl mx-auto flex justify-center items-center gap-6">
            {[ 
              { name: "GitHub", url: "https://github.com/maximonGamer" },
              { name: "LinkedIn", url: "https://www.linkedin.com/in/claudio-lucas-henrique-francisco-ribeiro-1a8148346/" },
              { name: "Telefone", url: "https://wa.me/5511998115005" }, // Substituí o link de email pelo número de telefone
            ].map((item, index) => (
              <a
                key={index}
                href={item.name === "Telefone" ? `tel:${item.url}` : item.url} // Corrigido para usar 'tel:' no telefone
                className="hover:text-indigo-400 transition-all"
              >
                {item.name}
              </a>
            ))}
          </div>
          <p className="mt-4 text-gray-500 text-sm">© 2025 Claudio Lucas. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
