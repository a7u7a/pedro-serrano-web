import { forwardRef } from "react";
import { PesePost } from "../lib/interfaces";
import ImagePost from "./image-post";
import MySwiper from "./my-swiper";

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
          <p className="mt-10 mb-4 font-regular text-4xl text-neutral-600">
            Projects
          </p>

          <MySwiper posts={allPosts} />

          <div className="mt-6 flex flex-col ">
            {cats.map((cat, i) => (
              <div key={i}>
                <div className="mt-4 text-xl text-neutral-600">{cat}</div>
                <MySwiper
                  posts={allPosts.filter((post) => {
                    return post.category === cat;
                  })}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
export default Blog;
