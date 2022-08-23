import { forwardRef } from "react";
import { PesePost } from "../lib/interfaces";
import ImagePost from "./image-post";
import MySwiper from "./my-swiper";
import FadeIn from "./wrappers/fade-in";

interface BlogProps {
  posts: PesePost[];
  ref: HTMLDivElement;
  category: string;
}

const Gallery = forwardRef<HTMLDivElement, BlogProps>(
  ({ posts, category }: BlogProps, ref) => {
    Gallery.displayName = "Gallery";

    return (
      <div
        ref={ref}
        className={`
        mt-40
        flex flex-col
        pr-4 sm:pr-6
        pl-4 sm:pl-6
        font-normal text-right text-white text-3xl md:text-4xl`}
      >
        <div>
          <FadeIn threshold={1}>
            <div className="mb-2 md:mb-6">{category}</div>
          </FadeIn>
          <FadeIn threshold={0.2}>
            <MySwiper
              posts={posts.filter((post) => {
                return post.category === category;
              })}
            />
          </FadeIn>
        </div>
      </div>
    );
  }
);
export default Gallery;
