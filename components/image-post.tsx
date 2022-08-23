import { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useMediaQuery from "./../lib/media";
import { PesePost } from "../lib/interfaces";

interface ImagePostProps {
  post: PesePost;
}

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1:number, e2:number, e3:number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r:number, g:number, b:number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

const ImagePost = ({ post }: ImagePostProps) => {
  const isSm = useMediaQuery("(max-width: 640px)");
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`relative font-normal text-black 
      ${
        isSm
          ? `${
              post.imgWidth > post.imgHeight
                ? "w-[100%] h-[18rem]"
                : post.imgWidth === post.imgHeight
                ? "w-[100%] h-[22rem]"
                : "w-[100%] h-[32rem]"
            } `
          : `${
              post.imgWidth > post.imgHeight
                ? "w-[38rem] h-[28rem]"
                : post.imgWidth === post.imgHeight
                ? "h-[28rem] w-[28rem]"
                : "w-[28rem] h-[38rem]"
            } `
      }
      `}
    >
      <Image placeholder="blur" blurDataURL={rgbDataURL(30, 30, 30)} src={post.image} alt={post.alt} layout="fill" objectFit="cover" />

      {/* Text post overlay */}
      <div className="absolute bottom-0">
        <div className="flex flex-col ">
          <div className={`z-50 ${expanded ? "visible" : "invisible"}`}>
            <ReactMarkdown
              className={"textOnImage"}
              remarkPlugins={[remarkGfm]}
            >
              {post.body}
            </ReactMarkdown>
          </div>

          <button onClick={() => setExpanded(!expanded)} className={"z-50"}>
            <p
              className={`text-base text-left underline pt-0 pb-2 pl-2 z-50 ${
                expanded
                  ? "text-gray-800"
                  : "text-gray-200 mix-blend-difference"
              }`}
            >
              {expanded ? "less" : "more"}
            </p>
          </button>

          <div
            className={`transition-opacity duration-100 ease-in-out absolute w-full h-full flex flex-col ${
              expanded ? "opacity-80" : "opacity-0"
            } `}
          >
            <div className="w-full h-2/3 bg-gradient-to-t via-gray-200 from-gray-200"></div>
            <div className="w-full -mt-0.5 h-1/3 bg-gray-200"></div>
          </div>
          {/* <div className="absolute inset-0 bg-slate-400"></div> */}
        </div>
      </div>
    </div>
  );
};
export default ImagePost;
