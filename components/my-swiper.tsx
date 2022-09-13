import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import { Navigation } from "swiper";
import { PesePost } from "../lib/interfaces";
import ImagePost from "./image-post";
import useMeasure from "react-use-measure";
import SwiperNavigation from "./swiper-nav";
import useMediaQuery from "./../lib/media";
interface MySwiperProps {
  posts: PesePost[];
}

const MySwiper = ({ posts }: MySwiperProps) => {
  const swiperRef = useRef<SwiperProps>(null!);
  const isSm = useMediaQuery("(max-width: 640px)");
  const [startSwiper, setStartSwiper] = useState(false);
  const [swiperContainer, swiperBounds] = useMeasure();
  const [swiperWidth, setSwiperWidth] = useState(1);
  const [firstSlideWidth, setfirstSlideWidth] = useState(1);
  const gap = 30;

  useEffect(() => {
    setSwiperWidth(swiperBounds.width);
  }, [swiperWidth, swiperBounds]);

  useEffect(() => {
    // Make sure isSm is resolved before the swiper component is mounted
    setStartSwiper(true);
  }, [isSm]);

  return (
    <div ref={swiperContainer}>
      {startSwiper && (
        <Swiper
          slidesPerView={"auto"}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          spaceBetween={gap}
          modules={[Navigation]}
          simulateTouch={false}
          allowTouchMove={false}
          slidesOffsetBefore={swiperWidth - firstSlideWidth}
          onInit={(swiper) => {
            // used to set slidesOffsetBefore
            if (swiper.slides[0]) {
              const firstSlideWidth = swiper.slides[0].clientWidth;
              setfirstSlideWidth(firstSlideWidth);
            }
          }}
        >
          {posts.map((post, i) => (
            <SwiperSlide key={i}>
              <ImagePost post={post} key={post.id} />
            </SwiperSlide>
          ))}

          <span slot={isSm ? "container-end" : "container-start"}>
            <SwiperNavigation />
          </span>
        </Swiper>
      )}
    </div>
  );
};
export default MySwiper;
