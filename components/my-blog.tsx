import { forwardRef } from "react";
import { PesePost } from "../lib/interfaces";
import ImagePost from "./image-post";

interface BlogProps {
  allPosts: PesePost[];
  ref: HTMLDivElement;
}

const getCategories = (allPosts: PesePost[]) => {
  const cats = allPosts.map((post) => {
    return post.category;
  });
  return [...new Set(cats)];
};

const Blog = forwardRef<HTMLDivElement, BlogProps>(
  ({ allPosts }: BlogProps, ref) => {
    Blog.displayName = "Blog";
    const cats = getCategories(allPosts);

    return (
      <div ref={ref} className="w-screen bg-white pb-12">
        <div className="pl-4 sm:pl-6 flex flex-col text-black">
          <p className="mt-10 font-regular text-4xl text-neutral-600">Projects</p>
          <div className="mt-6 flex flex-col ">
            {cats.map((cat, i) => (
              <div key={i}>
                <div className="mt-4 text-xl text-neutral-600">{cat}</div>
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
  }
);
export default Blog;
