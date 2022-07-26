import { useState } from "react";
import Image from "next/image";
import { PesePost } from "../lib/interfaces";

interface ImagePostProps {
  post: PesePost;
}

const ImagePost = ({ post }: ImagePostProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative pr-4 pt-4">
      <div className={`relative ${post.imgWidth>post.imgHeight? "w-[35rem]": "w-80"} `}>
        <Image
          src={post.image}
          width={post.imgWidth}
          height={post.imgHeight}
          alt={post.alt}
        />
        <div className="absolute bottom-0 left-0 pb-3 pl-2 text-sm font-normal">
          {expanded ? <div className="">{post.body}</div> : <></>}
          <button onClick={() => setExpanded(!expanded)} className="">
            <p className="underline pt-2">{expanded ? "less" : "more"}</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImagePost;
