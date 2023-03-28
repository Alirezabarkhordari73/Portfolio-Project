import Image from "next/image";
import React, { useContext } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

import Avatar2 from "../assets/images/Avatar2.jpg";

type Props = {};

export default function Hero({}: Props) {
  const [text, count] = useTypewriter({
    words: ["Hi, I am Alireza Barkhordari . . .", "Wellcome To My Portfolio"],
    loop: true,
    delaySpeed: 2500,
  });
  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-5">
      <Image
        className="rounded-full object-cover w-[150px] h-[150px]"
        src={Avatar2}
        alt="coding-image"
        width={100}
        height={100}
        priority={true}
      />
      <p className="dark:text-[#fff] text-[#1d1d1d] text-sm md:text-lg uppercase tracking-[15px] md:tracking-[10px] text-center">
        software enginier
      </p>
      <h1 className="dark:text-[#fff] text-[#1d1d1d] text-xl md:text-3xl lg:text-6xl drop-shadow-sm">
        <span className="font-bold tracking-widest">{text}</span>
        <Cursor cursorColor="#696bff" />
      </h1>
    </div>
  );
}
