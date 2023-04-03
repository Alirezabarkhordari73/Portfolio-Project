import Image from "next/image";
import React, { useContext } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { ThemeContext } from "../Context/ContextProvider";

import Avatar2 from "../assets/images/Avatar2.jpg";

type Props = {};

export default function Hero({}: Props) {
  const { setColor, currentColor } = useContext(ThemeContext);
  const [text, count] = useTypewriter({
    words: ["Hi, I am Alireza Barkhordari . . .", "Wellcome To My Portfolio"],
    loop: true,
    delaySpeed: 2500,
  });
  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-5">
      <Image
        className="rounded-full object-cover w-[170px] h-[170px] border-[3px]"
        src={Avatar2}
        alt="coding-image"
        width={120}
        height={120}
        priority={true}
        style={{
          borderInlineColor: `${currentColor}`,
          borderBlockColor: `${currentColor}`,
        }}
      />
      <p className="dark:text-[#fff] text-[#1d1d1d] text-sm md:text-lg uppercase tracking-[15px] md:tracking-[10px] text-center">
        software enginier
      </p>
      <h1 className="dark:text-[#fff] text-[#1d1d1d] text-xl md:text-3xl lg:text-6xl drop-shadow-sm">
        <span className="font-bold tracking-widest">{text}</span>
        <Cursor cursorColor={`${currentColor}`} />
      </h1>
    </div>
  );
}
