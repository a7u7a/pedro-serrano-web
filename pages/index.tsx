import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import TestBox from "../components/testBox";
import TestImport from "../components/testImport";
import TestBoxScroll from "../components/testBoxScroll";
import MainScene from "../components/mainScene";
import InfoPanel from "../components/info-panel"

const TestScene: NextPage = () => {
  const [value, setValue] = useState(5);
  const MAX = 50;

  return (
    <div>
      <div className="absolute inset-x-0 top-0 h-16 bg-green-100 z-10">
        header
        <InfoPanel/>
      </div>

      <div className="absolute bg-gray-200 h-screen w-screen">
        <MainScene />
      </div>
    </div>
  );
};

export default TestScene;
