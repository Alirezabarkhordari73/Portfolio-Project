import Head from "next/head";
import { useContext } from "react";

import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Experiense from "../components/Experiense";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import { ThemeContext } from "../Context/ContextProvider";

export default function Home() {
  const { theme, openColorPallete } = useContext(ThemeContext);

  return (
    <div className={`${theme === "dark" ? "dark" : "light"}`}>
      <div className="dark:bg-[#131318] bg-[#f3f3f3] snap-y snap-mandatory h-screen overflow-y-scroll lg:p-8 scroll-smooth overflow-x-hidden">
        <Head>
          <title>Alireza Portfolio</title>
          <meta name="description" content="Generated by Alireza Barkhordari" />
        </Head>
        {/* {Header} */}
        <Header />
        {/* {Hero Section} */}
        <section className="snap-start">
          <Hero />
        </section>
        {/* {About Section} */}
        <section className="snap-center">
          <About />
        </section>
        {/* {Experiences Section} */}
        <section className="snap-center">
          <Experiense />
        </section>
        {/* {Skills Section} */}
        <section className="snap-center">
          <Skills />
        </section>
        {/* {Contact Section} */}
        <section className="snap-center">
          <Contact />
        </section>
      </div>
    </div>
  );
}
