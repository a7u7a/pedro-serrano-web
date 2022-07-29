import { forwardRef } from "react";
import PeseLogo from "./logo";

const IntroHeader = forwardRef<HTMLDivElement>((props, ref) => {
  // avoids eslint error
  IntroHeader.displayName = "IntroHeader";
  return (
    <div
      ref={ref}
      className="pt-[79vh] pl-4 sm:pl-6 pr-4 sm:pr-0 flex flex-col w-full md:w-2/3 lg:w-1/2 space-y-6 md:space-y-12 font-normal text-3xl md:text-4xl text-white mix-blend-exclusion pb-12"
    >
      <p>Hi, I’m Pedro.</p>
      <p>I’m a spatial designer based in Berlin since 2019.</p>
      <p>
        From houses to bespoke furniture pieces, interior architecture and
        exhibition design, I co-operate with clients and an ever expanding
        network of professionals to create work that fosters sensory engagement
        while remaining critical of its context.
      </p>
      <p>
        I work across multiple disciplines to plan, communicate and produce
        contemporary environments.
      </p>
      <p>
        There’s never been a more urgent time to connect and think about new
        ideas, spaces and realities.
      </p>
      <div>
        <p>Get in touch if you agree:</p>
        <ul>
          <li>→ hi@pese.works</li>
          <li>
            <a href="https://www.instagram.com/_pese/">→ @pese</a>
          </li>
        </ul>
      </div>
      <PeseLogo />
    </div>
  );
});
export default IntroHeader;
