import { forwardRef } from "react";
import FadeIn from "./wrappers/fade-in";

const MainText = forwardRef<HTMLDivElement>((props, ref) => {
  // avoids eslint error
  MainText.displayName = "MainText";
  return (
    <div
      ref={ref}
      className={`
      flex flex-col
      space-y-6 md:space-y-12
      w-full md:w-2/3 lg:w-1/2
      mt-40
      pl-4 sm:pl-6 
      pr-4 sm:pr-0
      max-w-2xl
      text-white font-regular text-3xl md:text-4xl`}
    >
      <FadeIn threshold={1}>
        <p className="leading-tight">
          From houses to bespoke furniture pieces, interior architecture and
          exhibition design.
        </p>
      </FadeIn>
      <FadeIn threshold={1}>
        <p className="leading-tight">
          I co-operate with clients and an ever expanding network of
          professionals to create work that fosters sensory engagement while
          remaining critical of its context.
        </p>
      </FadeIn>
    </div>
  );
});
export default MainText;
