'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaInstagram, FaWhatsapp, FaBars, FaTimes, FaArrowDown, FaGithub, FaCode, FaRocket } from 'react-icons/fa';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence, useScroll } from 'framer-motion';

// Tipos aprimorados
type SectionId = 'home' | 'about' | 'curriculum' | 'projects' | 'contact';

interface Project {
  id: string;
  nome: string;
  desc: string;
  detalhes: string;
  imagens: string[];
  link: string;
  github?: string;
  tecnologias: string[];
  categoria: 'web' | 'mobile' | 'fullstack';
  destaque?: boolean;
}

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'mobile' | 'tools';
  icon?: string;
}

interface TimelineItem {
  year: string;
  title: string;
  company?: string;
  description: string;
  type: 'work' | 'education' | 'project';
  skills?: string[];
}

// Hook personalizado para intersection observer (COM A CORREÇÃO)
const useIntersectionObserver = (containerRef: React.RefObject<HTMLElement | null>) => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  useEffect(() => {
    // Adicionada verificação para garantir que a ref não é nula
    if (!containerRef.current) {
        return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { 
        root: containerRef.current, 
        threshold: 0.5,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [containerRef]);

  return activeSection;
};


// Componente de partículas otimizado
const ParticleField = () => {
  const particles = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: 1 + Math.random() * 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12
    })), []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white opacity-10"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0.5, 1.5, 0.5],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Gradientes de fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-blue-900/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </div>
  );
};

// Componente de loading
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
    <motion.div
      className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export default function GalacticPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const activeSection = useIntersectionObserver(containerRef);

  // Efeito de loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Função de scroll otimizada com useCallback
  const galacticScrollTo = useCallback((sectionId: SectionId) => {
    const section = document.getElementById(sectionId);
    if (section && containerRef.current) {
      const sectionTop = section.offsetTop;
      
      containerRef.current.scrollTo({
        top: sectionTop - 80, // Ajuste para o header fixo
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  }, []);

  // Dados estruturados e organizados
  const menuItems: { id: SectionId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Início', icon: <FaRocket size={16} /> },
    { id: 'about', label: 'Sobre', icon: <FaCode size={16} /> },
    { id: 'curriculum', label: 'Experiência', icon: <FaGithub size={16} /> },
    { id: 'projects', label: 'Projetos', icon: <FaRocket size={16} /> },
    { id: 'contact', label: 'Contato', icon: <FaWhatsapp size={16} /> }
  ];

  const skills: Skill[] = [
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'Next.js', level: 85, category: 'frontend' },
    { name: 'TypeScript', level: 80, category: 'frontend' },
    { name: 'JavaScript', level: 95, category: 'frontend' },
    { name: 'HTML5/CSS3', level: 95, category: 'frontend' },
    { name: 'Tailwind CSS', level: 90, category: 'frontend' },
    { name: 'Node.js', level: 75, category: 'backend' },
    { name: 'Flutter', level: 70, category: 'mobile' },
    { name: 'Firebase', level: 80, category: 'backend' },
    { name: 'Git', level: 85, category: 'tools' }
  ];

  const projects: Project[] = [
    {
      id: 'plataforma-vagas',
      nome: "Plataforma de Vagas",
      desc: "Sistema completo para conectar estudantes a oportunidades de estágio e emprego",
      detalhes: "Plataforma desenvolvida com React e Node.js, oferecendo funcionalidades avançadas de busca, filtros personalizados, sistema de notificações e dashboard para empresas.",
      imagens: ["/projeto1-1.svg", "/projeto1-2.svg"],
      link: "https://github.com/maximonGamer/Plataforma-de-vagas-",
      github: "https://github.com/maximonGamer/Plataforma-de-vagas-",
      tecnologias: ['React', 'Node.js', 'MongoDB', 'Express'],
      categoria: 'fullstack',
      destaque: true
    },
    {
      id: 'apollo-grill',
      nome: "Apollo Grill Vision",
      desc: "App móvel para localização de restaurantes com realidade aumentada",
      detalhes: "Aplicativo desenvolvido em Flutter com integração de mapas, GPS e recursos de realidade aumentada para facilitar a localização de unidades de restaurantes.",
      imagens: ["/projeto2-1.svg", "/projeto2-2.svg"],
      link: "https://www.canva.com/design/DAGR-Jh5L_c/GNNhrywfCb7-73htNDmTbw/edit?utm_content=DAGR-Jh5L_c&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
      tecnologias: ['Flutter', 'Dart', 'Google Maps API', 'Firebase'],
      categoria: 'mobile',
      destaque: true
    },
    {
      id: 'jornal-verdade',
      nome: "Portal Jornal a Verdade",
      desc: "Portal de notícias moderno com CMS personalizado",
      detalhes: "Portal de notícias responsivo com sistema de gerenciamento de conteúdo, sistema de comentários, newsletter e otimização SEO completa.",
      imagens: ["/projeto3-1.svg", "/projeto3-2.svg"],
      link: "https://github.com/maximonGamer/Universidade-UBC",
      github: "https://github.com/maximonGamer/Universidade-UBC",
      tecnologias: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
      categoria: 'web'
    }
  ];

  const timeline: TimelineItem[] = [
    {
      year: "2024-2025",
      title: "Analista de Desenvolvimento de Sistemas",
      company: "Freelancer",
      description: "Desenvolvimento de soluções web e mobile personalizadas para diversos clientes, utilizando tecnologias modernas como React, Next.js e Flutter.",
      type: "work",
      skills: ['React', 'Next.js', 'Flutter', 'Firebase']
    },
    {
      year: "2023-2025",
      title: "Desenvolvedor Full Stack Júnior",
      company: "Startup Local",
      description: "Desenvolvimento e manutenção de aplicações web, colaboração em equipe ágil e implementação de novas funcionalidades.",
      type: "work",
      skills: ['JavaScript', 'Node.js', 'MongoDB', 'Git']
    },
    {
      year: "2023-2025",
      title: "Análise e Desenvolvimento de Sistemas",
      company: "Universidade Braz Cubas",
      description: "Graduação focada em desenvolvimento de software, metodologias ágeis, banco de dados e arquitetura de sistemas.",
      type: "education",
      skills: ['Programação', 'Banco de Dados', 'Metodologias Ágeis']
    }
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Head>
        <title>Claudio Lucas - Desenvolvedor Full Stack | Portfólio</title>
        <meta name="description" content="Portfólio de Claudio Lucas - Desenvolvedor Full Stack especializado em React, Next.js, Flutter e tecnologias modernas." />
        <meta name="keywords" content="desenvolvedor, full stack, react, next.js, flutter, javascript, portfolio" />
        <meta name="author" content="Claudio Lucas Henrique Francisco Ribeiro" />
        <meta property="og:title" content="Claudio Lucas - Desenvolvedor Full Stack" />
        <meta property="og:description" content="Transformando ideias em soluções digitais inovadoras" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://seudominio.com" />
      </Head>

      <ParticleField />

      {/* Barra de progresso de scroll */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Container principal */}
      <div
        ref={containerRef}
        className="relative z-10 h-screen w-full overflow-y-auto"
      >
        {/* Header aprimorado */}
        <header className="fixed w-full bg-gray-900/95 backdrop-blur-md shadow-xl z-40 border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <motion.button
                onClick={() => galacticScrollTo('home')}
                className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 hover:from-purple-300 hover:to-blue-300 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  textShadow: '0 0 20px rgba(147, 51, 234, 0.5)'
                }}
              >
                Claudio Lucas
              </motion.button>

              {/* Menu Desktop Aprimorado */}
              <nav className="hidden md:flex items-center space-x-2">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => galacticScrollTo(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </nav>

              {/* Menu Mobile */}
              <motion.button
                className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </motion.button>
            </div>
          </div>

          {/* Menu Mobile Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden bg-gray-900/98 backdrop-blur-lg border-t border-gray-800"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-4 py-2 space-y-1">
                  {menuItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => galacticScrollTo(item.id)}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                          : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                      }`}
                      whileHover={{ x: 5 }}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Seção Hero Aprimorada */}
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl animate-pulse delay-1000" />
          </div>

          <motion.div
            className="relative z-10 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="mb-8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/foto de claudio.svg"
                alt="Claudio Lucas - Desenvolvedor Full Stack"
                width={220}
                height={220}
                className="rounded-full mx-auto shadow-2xl border-4 border-white/20 hover:border-purple-400/50 transition-all duration-500"
                priority
              />
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-blue-300 to-purple-400"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                textShadow: '0 0 40px rgba(147, 51, 234, 0.3)'
              }}
            >
              Claudio Lucas
            </motion.h1>

            <motion.p
              className="text-2xl sm:text-3xl text-gray-300 mb-4 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Desenvolvedor Full Stack
            </motion.p>

            <motion.p
              className="text-lg text-gray-400 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Transformando ideias em soluções digitais inovadoras com tecnologias de ponta
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <motion.button
                onClick={() => galacticScrollTo('projects')}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Projetos
              </motion.button>
              
              <motion.button
                onClick={() => galacticScrollTo('contact')}
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Entre em Contato
              </motion.button>
            </motion.div>

            <motion.div
              className="mt-16"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <button
                onClick={() => galacticScrollTo('about')}
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Rolar para a seção sobre"
              >
                <FaArrowDown size={24} />
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Seção Sobre Mim Aprimorada */}
        <section
          id="about"
          className="min-h-screen py-20 px-4 flex items-center justify-center"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="bg-gray-900/60 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 sm:p-12 shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2
                className="text-4xl sm:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Sobre Mim
              </motion.h2>
              
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                    <p>
                      🚀 <strong className="text-white">Olá! Eu sou Claudio Lucas</strong>, um desenvolvedor apaixonado por criar soluções que fazem a diferença no mundo digital.
                    </p>
                    <p>
                      Com experiência em <strong className="text-purple-300">desenvolvimento full stack</strong>, especializo-me em criar aplicações web e mobile modernas, responsivas e centradas no usuário.
                    </p>
                    <p>
                      Atualmente eu  me graduei <strong className="text-blue-300">Análise e Desenvolvimento de Sistemas</strong> na Universidade Braz Cubas, estou sempre buscando aprender novas tecnologias e metodologias.
                    </p>
                    <p>
                      Minha missão é <strong className="text-purple-300">transformar ideias complexas em soluções simples e elegantes</strong>, sempre priorizando a experiência do usuário e a qualidade do código.
                    </p>
                  </div>
                </motion.div>
                
                <div>
                  <motion.h3
                    className="text-2xl font-bold text-white mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    Habilidades Técnicas
                  </motion.h3>
                  
                  <div className="space-y-6">
                    {['frontend', 'backend', 'mobile', 'tools'].map((category, categoryIndex) => (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + categoryIndex * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <h4 className="text-lg font-semibold text-gray-200 mb-3 capitalize">
                          {category === 'frontend' && '🎨 Frontend'}
                          {category === 'backend' && '⚙️ Backend'}
                          {category === 'mobile' && '📱 Mobile'}
                          {category === 'tools' && '🛠️ Ferramentas'}
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {skills.filter(skill => skill.category === category).map((skill, index) => (
                            <div key={skill.name} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-300 font-medium">{skill.name}</span>
                                <span className="text-purple-400 text-sm">{skill.level}%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  transition={{ delay: 0.7 + index * 0.1, duration: 1 }}
                                  viewport={{ once: true }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Seção Experiência/Currículo Aprimorada */}
        <section
          id="curriculum"
          className="min-h-screen py-20 px-4 flex items-center justify-center"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="bg-gray-900/60 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 sm:p-12 shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2
                className="text-4xl sm:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Experiência & Formação
              </motion.h2>
              
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
                  Minha jornada profissional e acadêmica, construindo soluções inovadoras e sempre aprendendo.
                </p>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/CLAUDIO LUCAS HENRIQUE FRANCISCO RIBEIRO 2026.pdf"
                    download
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    📄 Download CV Completo
                  </Link>
                </motion.div>
              </motion.div>

              {/* Timeline aprimorada */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent rounded-full"></div>
                
                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={`${item.year}-${index}`}
                      className={`flex items-center w-full ${
                        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                      }`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'text-right md:pr-8' : 'text-left md:pl-8'}`}>
                        <div className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                          item.type === 'work' 
                            ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30 hover:border-purple-400/50' 
                            : item.type === 'education'
                            ? 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-500/30 hover:border-blue-400/50'
                            : 'bg-gradient-to-br from-green-900/30 to-teal-900/30 border-green-500/30 hover:border-green-400/50'
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">
                              {item.type === 'work' && '💼'}
                              {item.type === 'education' && '🎓'}
                              {item.type === 'project' && '🚀'}
                            </span>
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          </div>
                          {item.company && (
                            <p className="text-purple-300 font-medium mb-2">{item.company}</p>
                          )}
                          <p className="text-gray-400 text-sm mb-3">{item.year}</p>
                          <p className="text-gray-300 mb-4">{item.description}</p>
                          {item.skills && (
                            <div className="flex flex-wrap gap-2">
                              {item.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="relative hidden md:flex items-center justify-center w-2/12">
                        <div className={`w-6 h-6 rounded-full border-4 shadow-lg ${
                          item.type === 'work' 
                            ? 'bg-purple-500 border-purple-300' 
                            : item.type === 'education'
                            ? 'bg-blue-500 border-blue-300'
                            : 'bg-green-500 border-green-300'
                        }`}></div>
                      </div>
                      
                      <div className="hidden md:block w-5/12"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Seção Projetos Aprimorada */}
        <section
          id="projects"
          className="min-h-screen py-20 px-4 flex items-center justify-center"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2
                className="text-4xl sm:text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Projetos em Destaque
              </motion.h2>
              
              <motion.p
                className="text-lg text-gray-400 text-center mb-16 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Conheça alguns dos projetos que desenvolvi, desde aplicações web complexas até soluções mobile inovadoras.
              </motion.p>
            </motion.div>

            <div className="space-y-20">
              {projects.map((projeto, index) => (
                <motion.div
                  key={projeto.id}
                  className="group"
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className={`flex flex-col lg:flex-row items-center gap-12 ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}>
                    {/* Conteúdo do Projeto */}
                    <div className="lg:w-1/2 space-y-6">
                      <div className="flex items-center gap-3">
                        {projeto.destaque && (
                          <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full">
                            ⭐ DESTAQUE
                          </span>
                        )}
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          projeto.categoria === 'web' 
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : projeto.categoria === 'mobile'
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}>
                          {projeto.categoria.toUpperCase()}
                        </span>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-blue-300 transition-all duration-300">
                        {projeto.nome}
                      </h3>
                      
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {projeto.desc}
                      </p>
                      
                      <p className="text-gray-400 leading-relaxed">
                        {projeto.detalhes}
                      </p>
                      
                      {/* Tecnologias */}
                      <div className="flex flex-wrap gap-2">
                        {projeto.tecnologias.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gray-800/60 border border-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-700/60 hover:border-gray-600 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Links do Projeto */}
                      <div className="flex gap-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Link
                            href={projeto.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium py-3 px-6 rounded-full hover:shadow-lg transition-all duration-300"
                          >
                            <FaRocket size={16} />
                            Ver Projeto
                          </Link>
                        </motion.div>
                        
                        {projeto.github && (
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                              href={projeto.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 border-2 border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-400 font-medium py-3 px-6 rounded-full transition-all duration-300"
                            >
                              <FaGithub size={16} />
                              Código
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    </div>
                    
                    {/* Imagens do Projeto */}
                    <div className="lg:w-1/2">
                      <motion.div
                        className="relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-500"
                        whileHover={{ y: -10, rotateY: 5 }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="grid grid-cols-2 gap-1">
                          {projeto.imagens.map((img, i) => (
                            <motion.div
                              key={i}
                              className="relative aspect-video overflow-hidden"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Image
                                src={img}
                                alt={`${projeto.nome} - Screenshot ${i + 1}`}
                                fill
                                className="object-cover transition-all duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div> 
              ))}
            </div>
          </div>
        </section>

        {/* Seção Contato Aprimorada */}
        <section
          id="contato"
          className="min-h-screen py-20 px-4 flex items-center justify-center"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="bg-gray-900/60 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 sm:p-12 shadow-2xl text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                  Vamos Conversar?
                </h2>
                
                <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
                  Tem um projeto interessante em mente? Está procurando um desenvolvedor dedicado?
                </p>
                
                <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                  Adoro colaborar em projetos desafiadores e estou sempre aberto a novas oportunidades. Vamos transformar suas ideias em realidade!
                </p>
              </motion.div>
              
              {/* Links de Contato */}
              <motion.div
                className="flex flex-wrap justify-center gap-6 mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, staggerChildren: 0.1 }}
                viewport={{ once: true }}
              >
                {[
                  { 
                    icon: <FaLinkedin size={24} />, 
                    url: "https://www.linkedin.com/in/claudio-lucas-henrique-francisco-ribeiro-1a8148346/", 
                    label: "LinkedIn",
                    color: "from-blue-600 to-blue-500",
                    hoverColor: "hover:from-blue-500 hover:to-blue-400"
                  },
                  { 
                    icon: <FaWhatsapp size={24} />, 
                    url: "https://wa.me/5511998115005", 
                    label: "WhatsApp",
                    color: "from-green-600 to-green-500",
                    hoverColor: "hover:from-green-500 hover:to-green-400"
                  },
                  { 
                    icon: <FaInstagram size={24} />, 
                    url: "https://www.instagram.com/claudio_ribeirofh/", 
                    label: "Instagram",
                    color: "from-pink-600 to-purple-500",
                    hoverColor: "hover:from-pink-500 hover:to-purple-400"
                  },
                  { 
                    icon: <FaGithub size={24} />, 
                    url: "https://github.com/maximonGamer", 
                    label: "GitHub",
                    color: "from-gray-700 to-gray-600",
                    hoverColor: "hover:from-gray-600 hover:to-gray-500"
                  }
                ].map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative bg-gradient-to-r ${item.color} ${item.hoverColor} text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl`}
                    whileHover={{ y: -5, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    aria-label={item.label}
                  >
                    <span className="relative z-10">{item.icon}</span>
                    <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
              
              {/* Email de Contato */}
              <motion.div
                className="border-t border-gray-700/50 pt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-400 mb-4">📧 Ou envie um email diretamente:</p>
                <motion.a
                  href="mailto:lucasclaudio830@gmail.com"
                  className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  lucasclaudio830@gmail.com
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Rodapé Aprimorado */}
        <footer className="py-12 bg-gray-900/95 backdrop-blur-md border-t border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
                  Claudio Lucas
                </h3>
                <p className="text-gray-400 text-sm">
                  Desenvolvedor Full Stack
                </p>
              </motion.div>
              
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Claudio Lucas Henrique Francisco Ribeiro
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Todos os direitos reservados
                </p>
              </motion.div>
              
              <motion.div
                className="text-center md:text-right"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-500 text-xs">
                  Desenvolvido com ❤️ usando
                </p>
                <p className="text-gray-400 text-sm font-medium">
                  Next.js • Tailwind CSS • Framer Motion
                </p>
              </motion.div>
            </div>
          </div>
        </footer>
      </div>

      {/* Estilos globais aprimorados */}
      <style jsx global>{`
        html, body {
          scroll-behavior: smooth;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background-color: #030712; /* Fundo base para evitar flash branco */
        }
        
        .neon-text {
          text-shadow: 
            0 0 5px rgba(147, 51, 234, 0.5),
            0 0 10px rgba(147, 51, 234, 0.4),
            0 0 15px rgba(147, 51, 234, 0.3),
            0 0 20px rgba(147, 51, 234, 0.2);
        }
        
        /* Scrollbar personalizada */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #3b82f6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #2563eb);
        }
      `}</style>
    </>
  );
}