import { useState } from "react";
import Image from "next/image";
import { PesePost } from "../lib/interfaces";

interface ImagePostProps {
  post: PesePost;
}

const ImagePost = ({ post }: ImagePostProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    
      <div
        className={`relative ${
          post.imgWidth > post.imgHeight ? "w-[35rem]" : "w-80"
        } `}
      >
        <Image
          src={post.image}
          width={post.imgWidth}
          height={post.imgHeight}
          alt={post.alt}
        />
        <div
          className={`absolute bottom-0 left-0 mb-1.5 right-0 text-sm font-normal ${
            expanded ? "bg-gradient-to-t	from-neutral-200 via-neutral-200" : ""
          }`}
        >
          {expanded ? (
            <div className=" pl-2 pr-2 pt-2">{post.body}</div>
          ) : (
            <></>
          )}
          <button onClick={() => setExpanded(!expanded)} className="">
            <p className="underline pt-2 pb-2 pl-2">
              {expanded ? "less" : "more"}
            </p>
          </button>
        </div>
      </div>
    
  );
};
export default ImagePost;
