import { Scroll } from "@react-three/drei";
import PeseLogo from "./logo";
import { PesePost } from "../lib/interfaces";
import Works from "./works";

interface MainContentProps {
  allPosts: PesePost[];
}

const MainContent = ({ allPosts }: MainContentProps) => {
  return (
    <div className="pl-6 flex flex-col w-[40rem] space-y-12">
      <div className="">Hi, I’m Pedro.</div>
      <p>I’m a spatial designer based in Berlin since 2019.</p>
      <p>
        I work across multiple disciplines to plan, communicate and produce
        contemporary environments.
      </p>
      <p>
        Third paragraph with some more detail. Pellentesque habitant morbi
        tristique senectus et netus et malesuada fames ac turpis egestas.
      </p>
      <div>
        <p>Contact</p>
        <ul>
          <li>hi@pese.works</li>
          <li>
            <a href="https://www.instagram.com/_pese/">@pese</a>
          </li>
        </ul>
      </div>
      <PeseLogo />
    </div>
  );
};
export default MainContent;
