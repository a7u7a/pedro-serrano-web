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
  console.log("allPosts", allPosts);
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
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getPosts();
  return {
    props: {
      allPosts,
    },
  };
};

export default Home;
