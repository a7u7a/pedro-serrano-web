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

function SortArray(x: PesePost, y: PesePost) {
  if (x.title < y.title) {
    return -1;
  }
  if (x.title > y.title) {
    return 1;
  }
  return 0;
}

const Home = ({ builtProj, experimentsProj }: HomeProps) => {
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
        <MainScene builtProj={builtProj} experimentsProj={experimentsProj} />
      </div>
    </>
  );
};

const sortAlphaNum = (posts: PesePost[]) => {
  return posts.sort((a, b) => {
    return a.title.localeCompare(b.title, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });
};

const filterByCategory = (posts: PesePost[], category:string)=>{
return posts.filter((post) => {
  return post.category === category;
});
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getPosts();

  const builtFiltered = filterByCategory(allPosts, builtCat )
  const builtProj = sortAlphaNum(builtFiltered);

  const expFiltered = filterByCategory(allPosts, experimentsCat)
  const experimentsProj = sortAlphaNum(expFiltered);

  return {
    props: {
      builtProj,
      experimentsProj,
    },
  };
};

export default Home;
