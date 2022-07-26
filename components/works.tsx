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
    <div className="mt-24 w-screen bg-white font-semibold text-5xl pb-96">
      <div className="pl-6 flex flex-col text-black">
        <p className="mt-6">Recent works</p>
        <div className="mt-12 flex flex-col ">
          <div className="flex flex-row flex-wrap">
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
