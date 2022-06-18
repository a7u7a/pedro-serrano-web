import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import TestBox from "../components/testBox";
import TestImport from "../components/testImport";
import TestBoxScroll from "../components/testBoxScroll";
import TransformScene from "../components/tranformScene";

const TestScene: NextPage = () => {
  return (
    <div>
        <div className="absolute inset-x-0 top-0 h-16 bg-green-100 z-10" > header </div>
    <div className="absolute bg-gray-200 h-screen w-screen">
      <TransformScene />
    </div>
    </div>
  );
};

export default TestScene;
