import Image from "next/image";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import MainScene from "../components/main-scene";
import { getPosts } from "../lib/posts";
import { PesePost } from "../lib/interfaces";

interface HomeProps {
  builtProj: PesePost[];
  experimentsProj: PesePost[];
}

const builtCat = "Built work";
const experimentsCat = "Experiments";

const Home = ({ builtProj, experimentsProj }: HomeProps) => {
  return (
    <>
      <Head>
        <title>Pedro Serrano</title>
        <meta
          name="description"
          content="Pedro Serrano, Berlin-based spatial designer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen w-screen">
        <MainScene builtProj={builtProj} experimentsProj={experimentsProj} />
      </div>
    </>
  );
};

const sortAlphaNum = (posts: PesePost[]) => {
  return posts.sort((a, b) => {
    return b.title.localeCompare(a.title, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });
};

const filterByCategory = (posts: PesePost[], category: string) => {
  return posts.filter((post) => {
    return post.category === category;
  });
};

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getPosts();

  const builtFiltered = filterByCategory(allPosts, builtCat);
  const builtProj = sortAlphaNum(builtFiltered);
  // console.log("builtProj", builtProj);

  const expFiltered = filterByCategory(allPosts, experimentsCat);
  const experimentsProj = sortAlphaNum(expFiltered);

  return {
    props: {
      builtProj,
      experimentsProj,
    },
  };
};

export default Home;
