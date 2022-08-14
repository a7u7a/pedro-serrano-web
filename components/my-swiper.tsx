import { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Scrollbar, Navigation, Pagination } from "swiper";
import { PesePost } from "../lib/interfaces";
import ImagePost from "./image-post";

interface SwiperProps {
  posts: PesePost[];
}

// example from here: https://github.com/nolimits4web/swiper/issues/3855#issuecomment-1188290035

const SwiperNavigation = () => {
  const swiper = useSwiper();
  const [slideProgress, setSlideProgress] = useState<number>(0);

  swiper.on("slideChange", (e) => {
    setSlideProgress(e.progress);
  });

  return (
    <div className="flex flex-row justify-end">
      <div className="flex flex-row space-x-3">
        <button
          className={`${slideProgress === 0 ? "text-gray-300" : "text-white"}`}
          onClick={() => swiper.slidePrev()}
          disabled={slideProgress === 0}
        >
          ←
        </button>
        <button
          className={`${slideProgress === 1 ? "text-gray-300" : "text-white"}`}
          onClick={() => swiper.slideNext()}
          disabled={slideProgress === 1}
        >
          →
        </button>
      </div>
    </div>
  );
};

const MySwiper = ({ posts }: SwiperProps) => {
  // slidesPerView auto, scrollbar, navigation
  return (
    <Swiper
      slidesPerView={"auto"}
      navigation={{
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      }}
      spaceBetween={30}
      modules={[Navigation]}
      className="mySwiper"
    >
      <SwiperNavigation />

      {posts.map((post, i) => (
        <SwiperSlide key={i}>
          <ImagePost post={post} key={post.id} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default MySwiper;
