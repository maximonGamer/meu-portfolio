import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex flex-col gap-12 items-center sm:items-start text-center sm:text-left max-w-7xl mx-auto">
        {/* Foto */}
        <div className="flex justify-center mb-8">
          <Image
            src="/foto de claudio.svg" // Sua foto SVG no diretório public
            alt="Claudio Lucas"
            width={200}
            height={150}
            className="rounded-full shadow-lg border-4 border-white dark:border-gray-800"
          />
        </div>
        {/* Nome e descrição */}
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Claudio Lucas Henrique Francisco Ribeiro</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Analista de Desenvolvimento de Sistemas | Universitário na Universidade Braz Cubas
        </p>
        <p className="text-md text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Desenvolvedor apaixonado por tecnologia, sempre buscando inovar e criar soluções inteligentes. Explore meus
          projetos e veja o que já desenvolvi!
        </p>

        {/* Links de navegação */}
        <div className="flex gap-8 justify-center mt-6">
          <Link
            href="#about"
            className="rounded-full px-8 py-4 text-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Sobre Mim
          </Link>
          <Link
            href="#curriculum"
            className="rounded-full px-8 py-4 text-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Currículo
          </Link>
          <Link
            href="#projects"
            className="rounded-full px-8 py-4 text-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Projetos
          </Link>
          <Link
            href="#contact"
            className="rounded-full px-8 py-4 text-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Contato
          </Link>
        </div>
      </main>

      {/* Seções do site (Sobre Mim, Currículo, Projetos, Contato) */}

      {/* Sobre Mim */}
      <section id="about" className="mt-20 py-16 px-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">Sobre Mim</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-6 max-w-3xl mx-auto leading-relaxed">
          Olá, eu sou o Claudio Lucas! 🚀
          <br />
          Sou um desenvolvedor apaixonado por tecnologia, sempre em busca de novas formas de transformar ideias em soluções inovadoras. Desde o início da minha jornada profissional, tenho me dedicado a aprimorar minhas habilidades e acompanhar as últimas tendências do mercado para entregar projetos de alta qualidade. Acredito que a chave para o sucesso está na inovação constante e na busca por desafios que me permitam evoluir a cada passo.
          <br />
          Com foco em desenvolvimento de sistemas e na criação de experiências digitais impactantes, meu objetivo é não apenas atender às necessidades do usuário, mas ir além, oferecendo soluções eficazes e criativas. Estou sempre aberto a novas oportunidades de aprendizado e colaboração. Se você também compartilha dessa visão e busca transformar o futuro com tecnologia, vamos conversar e criar algo extraordinário!
        </p>

        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-6 max-w-2xl mx-auto">
          Estou atualmente estudando na Universidade Braz Cubas e atuando como Analista de Desenvolvimento de Sistemas. Durante minha
          trajetória, já desenvolvi diversos projetos, focando na criação de soluções inteligentes para problemas reais, sempre com uma
          abordagem criativa e eficaz. Além disso, sou uma pessoa focada em resultados e na busca contínua pelo aprimoramento.
        </p>
      </section>

      {/* Currículo */}
      <section id="curriculum" className="mt-20 py-16 px-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">Currículo</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-6">
          Estou sempre buscando aprimorar minhas habilidades e experiências para me tornar um profissional cada vez mais
          completo. Abaixo, você encontra um resumo das minhas competências, qualificações e as experiências mais
          relevantes que construí ao longo da minha jornada. Se você quiser saber mais ou conferir meu currículo completo,
          basta fazer o download.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            href="/CLAUDIO LUCAS HENRIQUE FRANCISCO RIBEIRO 2025 (3).docx"
            download
            className="text-blue-500 hover:underline"
          >
            Baixar Currículo (Word)
          </Link>
        </div>
      </section>

      {/* Projetos */}
      <section id="projects" className="mt-20 py-16 px-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">Projetos</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-6">
          Veja alguns dos projetos que desenvolvi. Estou sempre em busca de novos desafios e oportunidades.
        </p>

        {/* Projeto 1 */}
        <div className="flex flex-col items-center gap-8 mb-16">
          <div className="flex gap-4">
            <Image
              src="/projeto1-1.svg" // Primeira imagem do Projeto 1 em SVG
              alt="Projeto 1 - Tela 1"
              width={400}
              height={250}
              className="rounded-lg shadow-lg"
            />
            <Image
              src="/projeto1-2.svg" // Segunda imagem do Projeto 1 em SVG
              alt="Projeto 1 - Tela 2"
              width={400}
              height={250}
              className="rounded-lg shadow-lg"
            />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Projeto 1: Plataforma de Vagas</h3>
          <p className="text-md text-gray-600 dark:text-gray-300 max-w-lg text-center">
            Uma plataforma desenvolvida para ajudar estudantes a encontrar vagas de estágio e emprego, com funcionalidades
            de upload de currículo, pesquisa de vagas e visualização de detalhes. Foi desenvolvido usando React, Node.js
            e MongoDB.
          </p>
        </div>

        {/* Projeto 2 */}
        <div className="flex flex-col items-center gap-8 mb-16">
          <div className="flex gap-4">
            <Image
              src="/projeto2-1.svg" // Primeira imagem do Projeto 2 em SVG
              alt="Projeto 2 - Tela 1"
              width={400}
              height={250}
              className="rounded-lg shadow-lg"
            />
            <Image
              src="/projeto2-2.svg" // Segunda imagem do Projeto 2 em SVG
              alt="Projeto 2 - Tela 2"
              width={400}
              height={250}
              className="rounded-lg shadow-lg"
            />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Projeto 2: Apollo Grill Vision</h3>
          <p className="text-md text-gray-600 dark:text-gray-300 max-w-lg text-center">
            Um app para facilitar a localização das unidades dos restaurantes Apollo Grill, além de exibir cardápios e
            informações sobre o funcionamento do sistema. Utiliza Flutter para o front-end e Firebase para o back-end.
          </p>
        </div>

        {/* Projeto 3 */}
        <div className="flex flex-col items-center gap-8 mb-16">
          <div className="flex gap-4">
            <Image
              src="/projeto3-1.svg" // Primeira imagem do Projeto 3 em SVG
              alt="Projeto 3 - Tela 1"
              width={400}
              height={250}
              className="rounded-lg shadow-lg"
            />
            <Image
              src="/projeto3-2.svg" // Segunda imagem do Projeto 3 em SVG
              alt="Projeto 3 - Tela 2"
              width={400}
              height={250}
              className="rounded-lg shadow-lg"
            />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Projeto 3: Jornal a Verdade</h3>
          <p className="text-md text-gray-600 dark:text-gray-300 max-w-lg text-center">
          O site Jornal A Verdade foi desenvolvido com o objetivo de oferecer uma plataforma moderna e acessível para a divulgação de notícias e informações relevantes ao público. O projeto foi criado para garantir uma experiência intuitiva e dinâmica aos leitores, permitindo fácil navegação e acesso rápido às principais manchetes foi realizado com HTML , CSS , CSS3, JAVA SCRIPT.
          </p>
        </div>
      </section>

      {/* Contato */}
      <section id="contact" className="mt-20 py-16 px-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">Contato</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-6">
          Fique à vontade para me enviar uma mensagem! Se você tem um projeto ou ideia interessante, adoraria conversar
          sobre como podemos colaborar.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            href="https://www.linkedin.com/in/claudio-lucas-henrique-francisco-ribeiro-1a8148346/"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </Link>
          <Link
            href="https://www.instagram.com/claudio_ribeirofh/"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            Instagram
          </Link>
          <Link
            href="https://wa.me/5511998115005"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            WhatsApp
          </Link>
        </div>
      </section>
    </div>
  );
}
