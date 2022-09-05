import { forwardRef } from "react";
import FadeIn from "./wrappers/fade-in";

const IntroHeader = forwardRef<HTMLDivElement>((props, ref) => {
  // avoids eslint error
  IntroHeader.displayName = "IntroHeader";
  return (
    <div
      ref={ref}
      className={`
      flex flex-col
      space-y-6 md:space-y-12
      w-full md:w-2/3 lg:w-1/2
      pt-[79vh]
      pl-4 sm:pl-6 
      pr-4 sm:pr-0 
      max-w-2xl
      text-white font-regular text-3xl md:text-4xl`}
    >
      <p>Hi, I’m Pedro.</p>

      <p className="leading-tight">
        I’m a spatial designer based in Berlin since 2019.
      </p>

      <FadeIn threshold={1}>
        <p>
          Working across multiple disciplines to plan, communicate and produce
          contemporary environments.
        </p>
      </FadeIn>
    </div>
  );
});
export default IntroHeader;
