import { useState } from "react";
import { useSwiper } from "swiper/react";
import getTotalSliderWidth from "../lib/swiper-utils";

const SwiperNavigation = () => {
  const swiper = useSwiper();
  const [slideProgress, setSlideProgress] = useState<number>(0);
  const [totalSlidesWidth, setTotalSlidesWidth] = useState(0);
  const [firstSlideWidth, setfirstSlideWidth] = useState(1);
  const gap = 30;

  const swiperNext = () => {
    const index = swiper.activeIndex;
    const progress = swiper.progress;
    const totalEffectiveSlidesWidth = totalSlidesWidth - firstSlideWidth;
    if (swiper.slides[index + 1]) {
      const nextSlideWidth = swiper.slides[index + 1].clientWidth;
      const nextProgress = (nextSlideWidth + gap) / totalEffectiveSlidesWidth;
      const targetProgress = progress + nextProgress;
      swiper.setProgress(targetProgress, 500);
    }
  };

  const swiperPrev = () => {
    const index = swiper.activeIndex;
    const progress = swiper.progress;
    const totalEffectiveSlidesWidth = totalSlidesWidth - firstSlideWidth;
    const prevSlideWidth = swiper.slides[index].clientWidth;
    const prevProgress = (prevSlideWidth + gap) / totalEffectiveSlidesWidth;
    const targetProgress = progress - prevProgress;
    swiper.setProgress(targetProgress, 500);
  };

  swiper.on("init", (swiper) => {
    setTotalSlidesWidth(getTotalSliderWidth(swiper, gap));

    if (swiper.slides[0]) {
      const firstSlideWidth = swiper.slides[0].clientWidth;
      setfirstSlideWidth(firstSlideWidth);
    }
  });

  swiper.on("slideChange", (swiper) => {
    setSlideProgress(swiper.progress);
  });

  return (
    <div className="flex flex-row justify-end mb-2">
      <div className="flex flex-row space-x-3">
        <button
          className={`${slideProgress === 0 ? "text-gray-300" : "text-white"}`}
          onClick={swiperPrev}
          disabled={slideProgress === 0}
        >
          ←
        </button>
        <button
          className={`${slideProgress === 1 ? "text-gray-300" : "text-white"}`}
          onClick={swiperNext}
          disabled={slideProgress === 1}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default SwiperNavigation;