import Image from 'next/image';

import Link from 'next/link';

import { FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';



export default function Home() {

 return (

 <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 text-gray-900 dark:text-gray-100">

<main className="flex flex-col gap-16 items-center text-center sm:text-left max-w-screen-xl mx-auto py-8 px-4 sm:px-8">

{/* Foto */}

<div className="flex justify-center mb-8 animate__animated animate__fadeIn animate__delay-1s">

 <Image

 src="/foto de claudio.svg"

alt="Foto de Claudio Lucas"

 width={180}
 height={180}

 className="rounded-full shadow-2xl border-4 border-white dark:border-gray-800 transform transition duration-300 hover:scale-105"
priority

 />
</div>



{/* Nome e Descrição */}

 <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-800 dark:text-white text-center animate__animated animate__fadeIn animate__delay-2s">

 Claudio Lucas Henrique Francisco Ribeiro

</h1>

 <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center mt-4 animate__animated animate__fadeIn animate__delay-2s">

Analista de Desenvolvimento de Sistemas | Universitário na Universidade Braz Cubas

 </p>

<p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-center mt-2 animate__animated animate__fadeIn animate__delay-3s">

 Desenvolvedor apaixonado por tecnologia, sempre buscando inovar e criar soluções inteligentes. Explore meus projetos e veja o que já desenvolvi!

 </p>





</main>



 {/* Seções */}

{/* Sobre Mim */}

 <section id="about" className="mt-32 py-16 px-4 sm:px-8 bg-white dark:bg-gray-800 shadow-xl rounded-xl border-t border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:scale-105">

 <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-8">Sobre Mim</h2>

 <div className="text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed max-w-4xl mx-auto space-y-4">

 <p>

 Olá, eu sou o Claudio Lucas! 🚀 Sou um desenvolvedor apaixonado por tecnologia, sempre em busca de novas formas de transformar ideias em soluções inovadoras.

</p>

 <p>

 Com foco em desenvolvimento de sistemas e na criação de experiências digitais impactantes, meu objetivo é oferecer soluções eficazes e criativas.

</p>

 <p>

 Atualmente estudo na Universidade Braz Cubas e atuo como Analista de Desenvolvimento de Sistemas, desenvolvendo projetos que transformam realidades!

 </p>

</div>

 </section>



 {/* Currículo */}

<section id="curriculum" className="mt-32 py-16 px-4 sm:px-8 bg-white dark:bg-gray-800 shadow-xl rounded-xl border-t border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:scale-105">
  <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-8">Currículo</h2>
  <p className="text-lg text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
    Um resumo das minhas competências, qualificações e experiências profissionais. Para mais detalhes:
  </p>
  <div className="flex justify-center">
    <Link
      href="/CLAUDIO LUCAS HENRIQUE FRANCISCO RIBEIRO 2026.pdf" // Alterado para .pdf
      download="CLAUDIO LUCAS HENRIQUE FRANCISCO RIBEIRO 2026.pdf" // Opcional: nome do arquivo para download
      className="text-blue-500 font-medium hover:underline text-lg transition duration-300 transform hover:scale-105"
    >
      📄 Baixar Currículo (PDF) {/* Alterado para PDF */}
    </Link>
  </div>
</section>




{/* Projetos */}

 <section id="projects" className="mt-32 py-16 px-4 sm:px-8 bg-white dark:bg-gray-800 shadow-xl rounded-xl border-t border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:scale-105">

 <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-8">Projetos</h2>

 <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-16">

 Veja alguns dos projetos que desenvolvi. Estou sempre em busca de novos desafios e oportunidades!

 </p>



 {/* Reutilizando estrutura de projeto */}

 {[{ nome: "Plataforma de Vagas", desc: "Plataforma desenvolvida para auxiliar estudantes a encontrar vagas de estágio e emprego. O projeto foi implementado utilizando HTML e CSS para estruturar e estilizar a interface do usuário, JavaScript para tornar o site interativo, e PHP no back-end para gerenciar as requisições de usuários, além de realizar o processamento e armazenamento de dados.", imagens: ["/projeto1-1.svg", "/projeto1-2.svg"], link: "https://github.com/maximonGamer/Plataforma-de-vagas-" },

 { nome: "Apollo Grill Vision", desc: "Aplicativo desenvolvido para facilitar a localização de unidades de restaurantes, exibição de menus e fornecimento de informações detalhadas sobre o funcionamento de cada estabelecimento. Criado com Flutter, proporcionando uma interface fluida e responsiva, e Firebase para gerenciamento de dados em tempo real, autenticação de usuários e armazenamento de informações, garantindo uma experiência dinâmica e personalizada para os usuários.", imagens: ["/projeto2-1.svg", "/projeto2-2.svg"], link: "https://www.canva.com/design/DAGR-Jh5L_c/GNNhrywfCb7-73htNDmTbw/edit?utm_content=DAGR-Jh5L_c&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" },
 { nome: "Jornal a Verdade", desc: "Portal de notícias moderno e responsivo, criado com HTML, CSS3 e JavaScript. O site foi desenvolvido com foco em proporcionar uma experiência acessível e fluida, oferecendo conteúdo relevante e atualizado para os usuários.", imagens: ["/projeto3-1.svg", "/projeto3-2.svg"], link: "https://github.com/maximonGamer/Universidade-UBC" }

 ].map((projeto, idx) => (

 <div key={idx} className="mb-16 text-center">

 <div className="flex flex-wrap justify-center gap-8 mb-8">

 {projeto.imagens.map((img, i) => (

 <Image key={i} src={img} alt={`${projeto.nome} - Imagem ${i + 1}`} width={350} height={200} className="rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105" />

 ))}

</div>

<h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{projeto.nome}</h3>

 <p className="text-md text-gray-600 dark:text-gray-300 max-w-xl mx-auto my-2">{projeto.desc}</p>

 <Link href={projeto.link} target="_blank" className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 text-lg font-medium transition duration-300 transform hover:scale-105">

 Ver Projeto

</Link>

 </div>

 ))}

 </section>



 {/* Contato */}

 <section id="contact" className="mt-32 py-16 px-4 sm:px-8 bg-white dark:bg-gray-800 shadow-xl rounded-xl border-t border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:scale-105">

 <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-8">Contato</h2>

<p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-8">

 Tem um projeto ou ideia inovadora em mente? Vamos conversar e transformar suas ideias em realidade! Conecte-se comigo:

 </p>

 <div className="flex justify-center gap-8">

 <Link href="https://www.linkedin.com/in/claudio-lucas-henrique-francisco-ribeiro-1a8148346/" target="_blank" className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 text-2xl">

 <FaLinkedin />

 </Link>

 <Link href="https://www.instagram.com/claudio_ribeirofh/" target="_blank" className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 text-2xl">

 <FaInstagram />

 </Link>

 <Link href="https://wa.me/5511998115005" target="_blank" className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 text-2xl">

 <FaWhatsapp />

 </Link>

 </div>

 </section>

</div>

 );

}

