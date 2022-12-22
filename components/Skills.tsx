import React, { useState } from "react";
import Image from "next/image";

import CssLogo from "../assets/images/LogoCSS.png";
import HtmlLogo from "../assets/images/LogoHTML.png";
import TsLogo from "../assets/images/typescript.svg";
import JsLogo from "../assets/images/LogoJavascript.svg";
import ReactLogo from "../assets/images/LogoReact.svg";
import tailwindLogo from "../assets/images/tailwindcss.svg";
import nextLogo from "../assets/images/NextJS.png";
import ProgressBar from "./ProgressBar";
import GitLogo from "../assets/images/GitLogo.png";
import MuiLogo from "../assets/images/MuiLogo.png";
import SassLogo from "../assets/images/SassLogo.png";
import ReduxLogo from "../assets/images/ReduxLogo.png";

type Props = {};

const Skills = (props: Props) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progressBarValue, setProgressBarValue] = useState<string | string[]>(
    "0%"
  );

  const showProgressHandler = (progressVal: string | string[]): void => {
    setIsRunning(true);
    setProgressBarValue(progressVal);
  };

  const hideProgressHandler = (progressVal: string | string[]): void => {
    setProgressBarValue(progressVal);
    setIsRunning(false);
  };

  return (
    <div className="h-screen relative flex flex-col items-center justify-center">
      <h3 className="uppercase text-[#7b5f2b] tracking-[15px] text-2xl absolute top-28">
        Skills
      </h3>
      <p className="text-stone-400 absolute top-40 tracking-[1px] text-lg uppercase">
        Hover Over Skills To Show Skill Ranges ...
      </p>
      <div className="absolute top-48 w-[90%] h-[500px] p-5 flex flex-col items-center">
        <div className=" w-[95%] mt-16 md:w-[50%] flex justify-center items-center">
          <div className="grid grid-cols-4 gap-10">
            <Image
              src={HtmlLogo.src}
              width={60}
              height={60}
              alt="skills-img"
              className="h-[60px] w-[60px] cursor-pointer"
              onMouseEnter={() => showProgressHandler("85")}
              onMouseLeave={() => hideProgressHandler("0")}
            />
            <Image
              src={CssLogo.src}
              width={60}
              height={60}
              alt="skills-img"
              className="h-[60px] w-[60px] cursor-pointer"
              onMouseEnter={() => showProgressHandler("80")}
              onMouseLeave={() => hideProgressHandler("0")}
            />
            <Image
              src={SassLogo.src}
              width={60}
              height={60}
              alt="skills-img"
              className="h-[60px] w-[60px] cursor-pointer p-1"
              onMouseEnter={() => showProgressHandler("40")}
              onMouseLeave={() => hideProgressHandler("0")}
            />
            <Image
              src={tailwindLogo.src}
              width={60}
              height={60}
              alt="skills-img"
              className="h-[60px] w-[60px] cursor-pointer"
              onMouseEnter={() => showProgressHandler("100")}
              onMouseLeave={() => hideProgressHandler("0")}
            />
            <Image
              src={JsLogo.src}
              width={60}
              height={60}
              alt="skills-img"
              className="h-[60px] w-[60px] cursor-pointer"
              onMouseEnter={() => showProgressHandler("70")}
              onMouseLeave={() => hideProgressHandler("0")}
            />
            <Image
              src={ReactLogo.src}
              width={60}
              height={60}
              alt="skills-img"
              className="h-[60px] w-[60px] cursor-pointer"
              onMouseEnter={() => showProgressHandler("75")}
              onMouseLeave={() => hideProgressHandler("0")}
            />
            <Image
              src={TsLogo.src}
              width={60}
              height={60}
              alt="skills-img"
              className="h-[60px] w-[60px] cursor-pointer"
              onMouseEnter={() => showProgressHandler("60")}
              onMouseLeave={() => hideProgressHandler("0")}
            />
            <Image
              src={nextLogo.src}
              width={200}
              height={200}
              alt="skills-img"
              className="bg-white h-[60px] w-[60px] object-contain px-[0.4rem] cursor-pointer"
              onMouseEnter={() => showProgressHandler("70")}
              onMouseLeave={() => hideProgressHandler("0")}
            />
            <Image
              src={GitLogo.src}
              width={60}
              height={60}
              alt="skills-img"
              className="h-[60px] w-[60px] cursor-pointer"
              onMouseEnter={() => showProgressHandler("60")}
              onMouseLeave={() => hideProgressHandler("0")}
            />
            <Image
              src={MuiLogo.src}
              width={60}
              height={70}
              alt="skills-img"
              className="h-[60px] w-[60px] cursor-pointer"
              onMouseEnter={() => showProgressHandler("65")}
              onMouseLeave={() => hideProgressHandler("0")}
            />
            <Image
              src={ReduxLogo.src}
              width={60}
              height={70}
              alt="skills-img"
              className="h-[60px] w-[60px] cursor-pointer"
              onMouseEnter={() => showProgressHandler("75")}
              onMouseLeave={() => hideProgressHandler("0")}
            />
          </div>
        </div>
        <div className="flex items-center w-[95%] md:w-[40%] mt-16">
          <ProgressBar progress={progressBarValue} isRunning={isRunning} />
        </div>
      </div>
    </div>
  );
};

export default Skills;
