import { Scroll } from "@react-three/drei";
import PeseLogo from "./logo";
import { PesePost } from "../lib/interfaces";
import Works from "./works";

interface MainContentProps {
  allPosts: PesePost[];
}

const MainContent = ({ allPosts }: MainContentProps) => {
  return (
    <div className="pl-4 sm:pl-6 pr-4 sm:pr-0 flex flex-col w-full md:w-[40rem] space-y-6 md:space-y-16 font-regular text-3xl md:text-4xl text-white mix-blend-exclusion">
      <div className="">Hi, I’m Pedro.</div>
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
        ideas, spaces and realities. If you agree, send me an email
      </p>
      <div>
        <p>Contact</p>
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
};
export default MainContent;
