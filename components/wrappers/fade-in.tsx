import { useRef, useState, useEffect, ReactElement } from "react";

/**
 * Wrapper component for fade in transition effect.
 * Based on: https://stackoverflow.com/questions/59595700/how-to-make-a-react-component-fade-in-on-scroll-using-intersectionobserver-but
 */

interface FadeInProps {
  children: ReactElement;
  threshold: number;
}

const FadeIn = ({ children, threshold }: FadeInProps) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          // unobserve after transition
          observer.unobserve(domRef.current!);
        }
      },
      { threshold: threshold }
    );
    observer.observe(domRef.current!);
    return () => observer.disconnect();
  });

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {children}
    </div>
  );
};

export default FadeIn;
