import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'framer-motion';

// Split text into individual characters/words for animation
export const useAnimatedText = (type: 'chars' | 'words' = 'chars', once: boolean = true) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(textRef, { once });
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const element = textRef.current;
    let elements: HTMLSpanElement[] = [];
    let animation: gsap.core.Timeline;

    // Split text into spans
    if (type === 'chars') {
      const text = element.innerText;
      element.innerHTML = '';
      
      text.split('').forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.style.display = 'inline-block';
        charSpan.innerText = char === ' ' ? '\u00A0' : char;
        element.appendChild(charSpan);
        elements.push(charSpan);
      });
    } else {
      const text = element.innerText;
      element.innerHTML = '';
      
      text.split(' ').forEach((word, i) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.innerText = word;
        
        element.appendChild(wordSpan);
        if (i < text.split(' ').length - 1) {
          element.appendChild(document.createTextNode(' '));
        }
        
        elements.push(wordSpan);
      });
    }

    // Reset initial state
    gsap.set(elements, { 
      y: 40, 
      opacity: 0,
    });

    if (inView) {
      // Create animation
      animation = gsap.timeline()
        .to(elements, {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          ease: 'power3.out',
          duration: 0.8,
        });
    }

    return () => {
      if (animation) animation.kill();
    };
  }, [inView, type]);

  return textRef;
};