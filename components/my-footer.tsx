import { forwardRef } from "react";
import FadeIn from "./wrappers/fade-in";
import PeseLogo from "./pese-logo";

const MyFooter = forwardRef<HTMLDivElement>((props, ref) => {
  MyFooter.displayName = "MyFooter";
  return (
    <div
      className={`
    flex flex-col
    space-y-6 md:space-y-12
    w-full md:w-2/3 lg:w-1/2
    mt-52
    pb-[55vh]
    pl-4 sm:pl-6
    pr-4 sm:pr-0
    max-w-2xl
    text-white font-regular text-3xl md:text-4xl`}
    >
      <FadeIn threshold={1}>
        <p className="leading-tight">
          {`There's never been a more urgent time to connect and think about
              new ideas, spaces and realities. Get in touch if you agree ;)`}
        </p>
      </FadeIn>
      <FadeIn threshold={1}>
        <div>
          <ul>
            <li>
              <a href="mailto:hi@pese.works">→ hi@pese.works</a>
            </li>
            <li>
              <a href="https://www.instagram.com/_pese/">→ @pese</a>
            </li>
          </ul>
        </div>
      </FadeIn>
      <FadeIn threshold={1}>
        <p className="underline">Full PDF portfolio here</p>
      </FadeIn>
      <FadeIn threshold={1}>
        <PeseLogo />
      </FadeIn>
    </div>
  );
});
export default MyFooter;
