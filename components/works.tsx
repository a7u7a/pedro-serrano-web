import { PesePost } from "../lib/interfaces";
import ImagePost from "./image-post";

interface WorksProps {
  allPosts: PesePost[];
}

const getCategories = (allPosts: PesePost[]) => {
  const cats = allPosts.map((post) => {
    return post.category;
  });
  return [...new Set(cats)];
};

const Works = ({ allPosts }: WorksProps) => {
  const cats = getCategories(allPosts);
  
  return (
    <div className="mt-16 w-screen bg-white pb-96 bottom-0">
      <div className="pl-6 flex flex-col text-black">
        <p className="mt-10 font-regular text-4xl">Recent works</p>
        <div className="mt-6 flex flex-col ">
          {cats.map((cat, i) => (
            <div key={i}>
              <div className="mt-4 text-xl">{cat}</div>
              <div className=" flex flex-col pr-6 md:flex-row flex-wrap">
                {allPosts
                  .filter((post) => {
                    return post.category === cat;
                  })
                  .map((post) => (
                    <ImagePost post={post} key={post.id} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Works;
