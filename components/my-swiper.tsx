import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Pagination } from "swiper";
import { PesePost } from "../lib/interfaces";
import ImagePost from "./image-post";



interface SwiperProps {
  allPosts: PesePost[];
}

const MySwiper = ({ allPosts }: SwiperProps) => {
  return (
    <div className="">
      <Swiper
        slidesPerView={"auto"}
        navigation={true}
        spaceBetween={30}
        scrollbar={{
          hide: true,
        }}

        // pagination={{
        //   clickable: true,
        // }}
        // modules={[Pagination]}
        modules={[Scrollbar, Navigation]}
        className="mySwiper"
      >
        {allPosts.map((post, i) => (
          <SwiperSlide key={i}>
            <ImagePost post={post} key={post.id} />
          </SwiperSlide>
        ))}

        {/* <SwiperSlide>Slide 1
        <img alt={"alt"} src={"/uploads/_DSC0270.jpg"} className="w-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>Slide 2
        <img alt={"alt"} src={"/uploads/02_copy.jpg"} className="w-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </div>
  );
};
export default MySwiper;
