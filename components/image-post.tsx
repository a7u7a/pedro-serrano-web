import { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useMediaQuery from "./../lib/media";
import { PesePost } from "../lib/interfaces";
import { X } from "phosphor-react";
import exp from "constants";

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
      transition-all duration-150 ease-in-out
      ${expanded ? "grayscale" : "grayscale-0"}`}
    >
      <Image
        placeholder="blur"
        blurDataURL={rgbDataURL(120, 120, 120)}
        src={post.image}
        alt={post.alt}
        layout="fill"
        objectFit="cover"
      />

      <div>
        {/* Background */}
        <div
          className={`transition-opacity duration-150 ease-in-out absolute w-full h-full bg-black ${
            expanded ? "opacity-40" : "opacity-0"
          } `}
        />

        {/* X button */}
        <button onClick={() => setExpanded(!expanded)}>
          <div
            className={
              "absolute right-0 text-3xl md:text-4xl text-white z-50 pr-4 bottom-0 pb-4"
            }
          >
            <div
              className={`transition-transform duration-150 ease-in-out ${
                expanded ? "rotate-0" : "rotate-45"
              }`}
            >
              <svg
                width={isSm ? 18 : 20}
                height={isSm ? 18 : 20}
                viewBox="0 0 126 126"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.63604 2.63604C6.15076 -0.87868 11.8492 -0.87868 15.364 2.63604L63 50.2721L110.636 2.63604C114.151 -0.87868 119.849 -0.87868 123.364 2.63604C126.879 6.15076 126.879 11.8492 123.364 15.364L75.7279 63L123.364 110.636C126.879 114.151 126.879 119.849 123.364 123.364C119.849 126.879 114.151 126.879 110.636 123.364L63 75.7279L15.364 123.364C11.8492 126.879 6.15076 126.879 2.63604 123.364C-0.87868 119.849 -0.87868 114.151 2.63604 110.636L50.2721 63L2.63604 15.364C-0.87868 11.8492 -0.87868 6.15076 2.63604 2.63604Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </button>

        {/* Text overlay */}
        <div className=" absolute bottom-0">
          <div
            className={`transition-opacity duration-150 ease-in-out z-50 ${
              expanded ? "opacity-100" : "opacity-0"
            } `}
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
