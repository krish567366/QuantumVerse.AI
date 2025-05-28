import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  pin?: boolean;
  anticipatePin?: number;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export const useScrollTrigger = (
  animationFunction: (timeline: gsap.core.Timeline) => void,
  options: ScrollTriggerOptions = {},
  dependencies: any[] = []
) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [trigger, setTrigger] = useState<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: options.trigger || elementRef.current,
        start: options.start || 'top bottom',
        end: options.end || 'bottom top',
        scrub: options.scrub !== undefined ? options.scrub : false,
        markers: options.markers || false,
        toggleActions: options.toggleActions || 'play none none reverse',
        pin: options.pin || false,
        anticipatePin: options.anticipatePin || 0,
        onEnter: options.onEnter,
        onLeave: options.onLeave,
        onEnterBack: options.onEnterBack,
        onLeaveBack: options.onLeaveBack,
      },
    });

    animationFunction(timeline);
    
    setTrigger(timeline.scrollTrigger);

    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill();
      }
      timeline.kill();
    };
  }, [options, ...dependencies]);

  return { elementRef, trigger };
};

export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    gsap.to(element, {
      y: () => (window.innerHeight - element.offsetTop) * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return elementRef;
};