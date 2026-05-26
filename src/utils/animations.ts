
export const initializeRevealAnimations = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    const revealElements = document.querySelectorAll('.reveal-fade-up');
    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    // If user prefers reduced motion, show all elements immediately
    const revealElements = document.querySelectorAll('.reveal-fade-up');
    revealElements.forEach((element) => {
      element.classList.add('in-view');
    });
  }
};
