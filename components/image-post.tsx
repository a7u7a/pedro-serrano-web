import { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useMediaQuery from "./../lib/media";
import { PesePost } from "../lib/interfaces";
import { X } from "phosphor-react";

interface ImagePostProps {
  post: PesePost;
}

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

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
      <Image
        placeholder="blur"
        blurDataURL={rgbDataURL(167, 167, 167)}
        src={post.image}
        alt={post.alt}
        layout="fill"
        objectFit="cover"
      />

      <div>
        {/* Background */}
        <div
          className={`transition-opacity duration-100 ease-in-out absolute w-full h-full bg-black ${
            expanded ? "opacity-40" : "opacity-0"
          } `}
        />

        {/* X button */}
        <button onClick={() => setExpanded(!expanded)}>
          <div className="absolute top-0 right-0 text-3xl md:text-4xl text-white pt-2 pr-2">
            <div
              className={`transition-transform duration-100 ease-in-out ${
                expanded ? "rotate-0" : "rotate-45"
              }`}
            >
              <X size={isSm ? 28 : 32} color="#ffffff" weight="bold" />
            </div>
          </div>
        </button>

        {/* Text overlay */}
        <div className=" absolute bottom-0">
          <div
            className={`transition-opacity duration-100 ease-in-out z-50 ${
              expanded ? "opacity-100" : "opacity-0"
            }`}
          >
            <ReactMarkdown
              className={"textOnImage"}
              remarkPlugins={[remarkGfm]}
            >
              {post.body}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImagePost;
