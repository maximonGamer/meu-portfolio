// components/AnimatedSection.js
import { useInView } from 'react-intersection-observer';

const AnimatedSection = ({
  children,
  className, // Classes originais da seção
  id,
  animationType = "fadeInUp", // Tipo de animação do Animate.css (ex: fadeInUp, fadeInDown, fadeInLeft)
  animationDuration = "1s",  // Duração da animação
  animationDelay = "0s",     // Atraso para iniciar a animação
  threshold = 0.1,           // Percentual da seção visível para disparar a animação (0.0 a 1.0)
  triggerOnce = true         // Disparar a animação apenas uma vez
}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  return (
    <section
      ref={ref}
      id={id}
      className={`${className} ${inView ? `animate__animated animate__${animationType}` : 'opacity-0'}`}
      style={inView ? { animationDuration: animationDuration, animationDelay: animationDelay } : { opacity: 0 }}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;