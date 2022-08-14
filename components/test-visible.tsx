import { useRef, useState, useEffect } from "react";

// testing this: https://stackoverflow.com/questions/59595700/how-to-make-a-react-component-fade-in-on-scroll-using-intersectionobserver-but

const FadeInSection = ({ children }: { children: number }) => {
  const domRef = useRef<HTMLElement>(null);

  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // In your case there's only one element to observe:
      if (entries[0].isIntersecting) {
        // Not possible to set it back to false like this:
        setVisible(true);
        // No need to keep observing:
        observer.unobserve(domRef.current!);
      }
    });

    observer.observe(domRef.current!);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={domRef}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </section>
  );
};

export default FadeInSection;
