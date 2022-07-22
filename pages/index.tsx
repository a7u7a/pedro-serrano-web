import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import MainScene from "../components/main-scene";

const TestScene: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pedro Serrano</title>
        <meta name="description" content="Pedro Serrano, Spatial designer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Testing css */}
      {/* <div className="absolute flex flex-col inset-x-0 w-1/4 top-0 z-10 h-full">
        <p className="text-5xl ">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
        <p className="text-5xl">hello</p>
      </div> */}

      <div className="absolute bg-gray-200 h-screen w-screen">
        <MainScene />
      </div>
    </>
  );
};

export default TestScene;
