import {
  OrbitControls,
  TransformControls,
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import PeseLogo from "./logo";

const MainContent = () => {
  return (
    <Scroll html>
      <div className="absolute pt-6 top-[68vh] font-semibold text-5xl text-white w-screen">
        <div className="pl-6 flex flex-col w-[40rem] space-y-12">
          <div className="">Hi, I’m Pedro.</div>
          <p className="">I’m a spatial designer based in Berlin since 2019.</p>
          <p className="">
            I work across multiple disciplines to plan, communicate and produce
            contemporary environments.
          </p>
          <p className="">
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
        <div className="mt-24 w-screen bg-white font-semibold text-5xl">
          <div className="pl-6 flex flex-col text-black">
            <p className="">Recent works</p>

            <div className="mt-12 flex flex-col ">
              <p className="">Casa Panguipulli</p>
              <p className="mt-4 text-xl font-normal w-2/3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                suscipit, urna malesuada placerat fringilla, nulla lacus
                tincidunt ante, ac feugiat ipsum nulla in ante. Suspendisse id
                ligula maximus, egestas tortor sed, rhoncus neque.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Scroll>
  );
};
export default MainContent;
