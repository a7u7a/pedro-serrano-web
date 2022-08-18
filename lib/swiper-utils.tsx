import { Swiper, Scrollbar, Navigation, Pagination } from "swiper";

const getTotalSliderWidth = (swiper: Swiper, gap: number) => {
  const widths = swiper.slides.map((slide, i) => {
    const addGap = i === swiper.slides.length - 1 ? 0 : gap; // skip last gap
    return slide.clientWidth + addGap;
  });
  const sum = widths.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  return sum;
};

export default getTotalSliderWidth;
