import { PesePost } from "../lib/interfaces";
import ImagePost from "./image-post";

interface WorksProps {
  allPosts: PesePost[];
}

const Works = ({ allPosts }: WorksProps) => {
  const src = allPosts[0].image;
  const w = allPosts[0].imgWidth;
  const h = allPosts[0].imgHeight;
  return (
    <div className="mt-16 w-screen bg-white pb-96">
      <div className="pl-6 flex flex-col text-black">
        <p className="mt-10 font-regular text-4xl">Recent works</p>
        <div className="mt-6 flex flex-col ">
          <div className="flex flex-col pr-6 md:flex-row flex-wrap">
            {allPosts.map((post) => (
              <ImagePost post={post} key={post.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Works;
