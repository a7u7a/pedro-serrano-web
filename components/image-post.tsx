import { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { PesePost } from "../lib/interfaces";

interface ImagePostProps {
  post: PesePost;
}

const ImagePost = ({ post }: ImagePostProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`relative ${
        post.imgWidth > post.imgHeight ? "w-[38rem] h-[28rem]"
        : post.imgWidth === post.imgHeight ? "h-[28rem] w-[28rem]"
        : "w-[28rem] h-[38rem]"
      } `}
    >
      <Image
        src={post.image}
        alt={post.alt}
        layout="fill"
        objectFit="cover"
      />
      <div
        className={`absolute bottom-0 left-0 right-0 text-left font-normal ${
          expanded ? "bg-gradient-to-t	from-neutral-600 via-neutral-600" : ""
        }`}
      >
        {/* {expanded ? (
          <div className="pl-3 text-right text-2xl pr-3 pt-3">{post.body}</div>
        ) : (
          <></>
        )} */}

{expanded ? (
          <ReactMarkdown className={"textOnImage"} remarkPlugins={[remarkGfm]}>
          {post.body}
        </ReactMarkdown>
        ) : (
          <></>
        )}

        

        <button onClick={() => setExpanded(!expanded)} className="">
          <p className="text-base text-gray-300 underline pt-3 pb-3 pl-3">
            {expanded ? "less" : "more"}
          </p>
        </button>
      </div>
    </div>
  );
};
export default ImagePost;
