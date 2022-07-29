import { forwardRef } from "react";

const MyFooter = forwardRef<HTMLDivElement>((props, ref) => {
  MyFooter.displayName = "MyFooter";
  return (
    <div ref={ref} className="w-screen pb-[70vh]">
      <div className="pl-4 sm:pl-6 flex flex-col w-full md:w-2/3 lg:w-1/2 font-regular md:text-4xl text-white">
        Pedro Serrano 2022
      </div>
    </div>
  );
});
export default MyFooter;
