import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import MainScene from "../components/main-scene";
import FadeInText from "../components/fade-in-text";

const TestScene: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pedro Serrano</title>
        <meta name="description" content="Pedro Serrano, Spatial designer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">{/* <FadeInText /> */}</div>
      <div className=" bg-gray-200 h-screen w-screen">
        <MainScene />
      </div>
      {/* Testing css */}
      <div>
        <div className="pl-6 pt-6 font-semibold text-5xl">Works</div>
      </div>
    </>
  );
};

export default TestScene;
