import { forwardRef } from "react";
import PeseLogo from "./logo";

const MyFooter = forwardRef<HTMLDivElement>((props, ref) => {
  MyFooter.displayName = "MyFooter";
  return (
    <div
      className={`
    flex flex-col
    space-y-6 md:space-y-12
    w-full md:w-2/3 lg:w-1/2
    pb-[70vh]
    pl-4 sm:pl-6
    pr-4 sm:pr-0
    mt-20
    text-white font-regular text-3xl md:text-4xl`}
    >
      <p>
        {`There's never been a more urgent time to connect and think about
              new ideas, spaces and realities. If you agree, send me an email ;)`}
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
      <p className="underline">Full PDF portfolio here</p>
      <PeseLogo />
    </div>
  );
});
export default MyFooter;
