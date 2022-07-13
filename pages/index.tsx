import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import MainScene from "../components/main-scene";

const TestScene: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Pedro Serrano, Spatial designer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Testing css */}
      {/* <div className="absolute inset-x-0 top-0 h-16 bg-green-100 z-10">
        header
      </div> */}

      <div className="absolute bg-gray-200 h-screen w-screen">
        <MainScene />
      </div>
    </>
  );
};

export default TestScene;
