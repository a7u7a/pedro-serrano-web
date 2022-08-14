import { forwardRef } from "react";
import FadeInSection from "./test-visible";

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
      text-white font-regular text-3xl md:text-4xl`}
    >
      <p>Hi, I’m Pedro.</p>
      <p>
        I’m a spatial designer based in Berlin since 2019. I work across
        multiple disciplines to plan, communicate and produce contemporary
        environments.
      </p>
      <p>
        From houses to bespoke furniture pieces, interior architecture and
        exhibition design, I co-operate with clients and an ever expanding
        network of professionals to create work that fosters sensory engagement
        while remaining critical of its context.
      </p>
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
          <FadeInSection key={number}>{number}</FadeInSection>
        ))}
      </div>
    </div>
  );
});
export default IntroHeader;
