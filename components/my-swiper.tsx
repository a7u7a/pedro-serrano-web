import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Pagination } from "swiper";
import { PesePost } from "../lib/interfaces";
import ImagePost from "./image-post";

interface SwiperProps {
  posts: PesePost[];
}

const MySwiper = ({ posts }: SwiperProps) => {
  // slidesPerView auto, scrollbar, navigation
  return (
    <div className="">
      <Swiper
        slidesPerView={"auto"}
        navigation={true}
        spaceBetween={30}
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar, Navigation]}
        className="mySwiper"
      >
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
