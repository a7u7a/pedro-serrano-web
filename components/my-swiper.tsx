import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { PesePost } from "../lib/interfaces";
import ImagePost from "./image-post";
import useMeasure from "react-use-measure";
import SwiperNavigation from "./swiper-nav"

// external arrows reference: https://github.com/nolimits4web/swiper/issues/3855#issuecomment-1188290035

interface SwiperProps {
  posts: PesePost[];
}

const MySwiper = ({ posts }: SwiperProps) => {
  const [swiperContainer, swiperBounds] = useMeasure();
  const [swiperWidth, setSwiperWidth] = useState(1);
  const [firstSlideWidth, setfirstSlideWidth] = useState(1);
  const gap = 30;

  useEffect(() => {
    setSwiperWidth(swiperBounds.width);
  }, [swiperWidth, swiperBounds]);

  return (
    <div ref={swiperContainer}>
      <Swiper
        slidesPerView={"auto"}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        spaceBetween={gap}
        modules={[Navigation]}
        simulateTouch={false}
        className="mySwiper"
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
        <span slot={"container-start"}>
          <SwiperNavigation />
        </span>
      </Swiper>
    </div>
  );
};
export default MySwiper;
