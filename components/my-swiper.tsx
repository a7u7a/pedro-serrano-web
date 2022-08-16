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
    setSlideProgress(e.progress);
    // console.log("swiper.translate", swiper.translate);
    // console.log("swiper", swiper);
  });

  return (
    <div className="flex flex-row justify-end mb-2">
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
        // slidesOffsetBefore={swiperWidth - 560}
        onSlideChange={(swiper) => {
          // console.log("slideChange", swiper);
          // here we set progress of the bar according to the next slide width
          // we need to detect direction before calling setProgress()
          // swiper.setProgress(0.1, 500)
        }}
        onInit={(swiper) => {
          // here we get the width of the first slide to apply on slidesOffsetBefore
          // setfirstSlideWidth(swiper.slidesSizesGrid[0])
          console.log("swiper", swiper);
          if(swiper.slides[0]){
            const firstSlideWidth = swiper.slides[0].clientWidth
            console.log("firstSlideWidth", firstSlideWidth);
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
