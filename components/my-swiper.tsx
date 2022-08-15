import { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Scrollbar, Navigation, Pagination } from "swiper";
import { PesePost } from "../lib/interfaces";
import ImagePost from "./image-post";
import useMeasure from "react-use-measure";
import { useFBO } from "@react-three/drei";

interface SwiperProps {
  posts: PesePost[];
}

// example from here: https://github.com/nolimits4web/swiper/issues/3855#issuecomment-1188290035

const SwiperNavigation = () => {
  const swiper = useSwiper();
  const [slideProgress, setSlideProgress] = useState<number>(0);

  swiper.on("slideChange", (e) => {
    // console.log("hello", e.translate);
    setSlideProgress(e.progress);
  });

  return (
    <div className="flex flex-row justify-end">
      <div className="flex flex-row space-x-3">
        <button
          className={`${slideProgress === 1 ? "text-gray-300" : "text-white"}`}
          onClick={() => swiper.slideNext()}
          disabled={slideProgress === 1}
        >
          ←
        </button>
        <button
          className={`${slideProgress === 0 ? "text-gray-300" : "text-white"}`}
          onClick={() => swiper.slidePrev()}
          disabled={slideProgress === 0}
        >
          →
        </button>
      </div>
    </div>
  );
};

const MySwiper = ({ posts }: SwiperProps) => {
  // slidesPerView auto, scrollbar, navigation
  const swiper = useSwiper();
  const [swiperContainer, swiperBounds] = useMeasure();
  const [swiperWidth, setSwiperWidth] = useState(1);
  const [firstSlideWidth, setfirstSlideWidth] = useState(1);
  const gap = 30;
  useEffect(() => {
    setSwiperWidth(swiperBounds.width);
    // console.log("swiperWidth", swiperWidth);
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
        className="mySwiper"
        slidesOffsetBefore={swiperWidth - 400}
        onInit={(swiper) => {
          // setfirstSlideWidth(swiper.slidesSizesGrid[0])
          console.log("swiper", swiper);
        }}
      >
        <SwiperNavigation />

        {posts.map((post, i) => (
          <SwiperSlide key={i}>
            <ImagePost post={post} key={post.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default MySwiper;
