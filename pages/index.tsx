import Image from "next/image";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import MainScene from "../components/main-scene";
import { getPosts } from "../lib/posts";
import { PesePost } from "../lib/interfaces";

interface HomeProps {
  allPosts: PesePost[];
}

const Home = ({ allPosts }: HomeProps) => {
  return (
    <>
      <Head>
        <title>Pedro Serrano</title>
        <meta
          name="description"
          content="Pedro Serrano, Spatial designer, Architect."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen w-screen">
        <MainScene />
      </div>

      {/* <div className="absolute top-0 right-0">
        <div className="p-12">
          <Image
            width={130}
            height={46}
            src={"/logo_w.png"}
            alt="Pedro Serrano"
          />
        </div>
      </div> */}

      {/* <div>
        <div className="pl-6 pt-6 font-semibold text-5xl">Works</div>
      </div> */}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getPosts();
  console.log("allPosts", allPosts);

  return {
    props: {
      allPosts,
    },
  };
};

export default Home;
