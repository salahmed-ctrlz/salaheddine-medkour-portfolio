interface ParallaxOptions {
  intensity?: number;
  reverse?: boolean;
  bounds?: number;
}

export const handleParallax = (
  event: MouseEvent | Touch,
  element: HTMLElement,
  options: ParallaxOptions = {}
) => {
  const {
    intensity = 0.05,
    reverse = false,
    bounds = 15
  } = options;

  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const deltaX = (mouseX - centerX) * intensity;
  const deltaY = (mouseY - centerY) * intensity;

  const boundedX = Math.max(Math.min(deltaX, bounds), -bounds);
  const boundedY = Math.max(Math.min(deltaY, bounds), -bounds);

  const transformX = reverse ? -boundedX : boundedX;
  const transformY = reverse ? -boundedY : boundedY;

  element.style.transform = `translate3d(${transformX}px, ${transformY}px, 0)`;
};

export const initParallaxEffect = (
  element: HTMLElement,
  options: ParallaxOptions = {}
) => {
  const handleMouseMove = (e: MouseEvent) => {
    handleParallax(e, element, options);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleParallax(e.touches[0], element, options);
    }
  };

  const resetPosition = () => {
    element.style.transform = 'translate3d(0, 0, 0)';
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('touchmove', handleTouchMove);
  window.addEventListener('mouseleave', resetPosition);
  window.addEventListener('touchend', resetPosition);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('mouseleave', resetPosition);
    window.removeEventListener('touchend', resetPosition);
  };
};

export const useParallaxScroll = (
  element: HTMLElement,
  options: { speed?: number; offset?: number } = {}
) => {
  const { speed = 0.1, offset = 0 } = options;
  
  const handleScroll = () => {
    const scrolled = window.scrollY;
    const translateY = (scrolled * speed) + offset;
    element.style.transform = `translate3d(0, ${translateY}px, 0)`;
  };

  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}; 