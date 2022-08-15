import { forwardRef } from "react";
import { PesePost } from "../lib/interfaces";
import ImagePost from "./image-post";
import MySwiper from "./my-swiper";
import FadeIn from "./fade-in";

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
      <div
        ref={ref}
        className={`
        mt-40
        flex flex-col
        pr-4 sm:pr-6
        font-normal text-right text-white text-3xl md:text-4xl`}
      >
        <FadeIn threshold={1}>
          <div className="flex flex-row justify-end">
            <div className="w-full md:w-2/3 lg:w-1/2">
              <p>
                Selected projects. Phasellus nisl dolor, congue eget tortor
                maximus, interdum tristique orci.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="mt-12 space-y-6 md:space-y-12">
          {cats.map((cat, i) => (
            <div key={i}>
              <FadeIn threshold={1}>
                <div className="mb-6">{cat}</div>
              </FadeIn>
              <FadeIn threshold={0.2}>
                <MySwiper
                  posts={allPosts.filter((post) => {
                    return post.category === cat;
                  })}
                />
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
export default Blog;
