import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import TestBox from "../components/testBox";
import TestImport from "../components/testImport";
import TestBoxScroll from "../components/testBoxScroll";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Pedro Serrano, Spatial designer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold underline decoration-wavy">
          Hello World Pedro Serrano Web!
        </h1>

        <TestBox />
        <TestImport />
        <TestBoxScroll />
      </main>
    </div>
  );
};

export default Home;
