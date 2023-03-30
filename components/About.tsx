import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { AiOutlineMail, AiFillGithub } from "react-icons/ai";
import { BsTelephoneInbound } from "react-icons/bs";
import { ThemeContext } from "../Context/ContextProvider";

import Avatar1 from "../assets/images/Avatar1.jpg";

type Props = {};

export default function About({}: Props) {
  const { setColor, currentColor } = useContext(ThemeContext);
  const [text, count] = useTypewriter({
    words: ["Here is little about me !"],
    loop: true,
    delaySpeed: 10000,
  });
  return (
    <div className="h-screen relative flex justify-evenly items-center text-center md:flex-row p-3">
      <h3 className="uppercase text-[#886930] tracking-[15px] text-2xl absolute top-28">
        About Me
      </h3>
      <div className="flex-col flex items-center justify-center lg:flex-row gap-16">
        <motion.img
          src={Avatar1.src}
          alt="my-image"
          initial={{ x: -300, opacity: 0 }}
          transition={{ duration: 1.2 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="w-[150px] h-[150px] rounded-full object-cover lg:w-[400px] lg:h-[500px] lg:rounded-md"
        />
        <div className="flex flex-col items-center space-y-8 dark:text-[#fff] text-[#1f1f1f] lg:items-start">
          <div className="text-lg md:text-xl font-semibold tracking-[5px] mt-10">
            {text}
            <Cursor cursorColor={`${currentColor}`} />
          </div>
          <p className="dark:text-[#fff] text-[#1f1f1f] text-base md:text-lg text-center lg:text-left">
            Hello! I’m Alireza Barkhordari. Web Developer with over 1 years of
            experience. Experienced with all stages of the development cycle for
            dynamic web projects. Having an in-depth knowledge including
            advanced HTML5, CSS3, JavaScript, React js, Next JS. Strong
            background in management and leadership.
          </p>
          <ul className="flex flex-col justify-start items-center text-left lg:text-center lg:items-start w-full space-y-3">
            <li>
              <span className="flex space-x-5">
                <AiOutlineMail
                  className="text-lg animate-pulse md:text-xl"
                  style={{ color: `${currentColor}` }}
                />
                <p
                  className="tracking-[1px]"
                  style={{ color: `${currentColor}` }}
                >
                  <span className="dark:text-[#fff] text-[#1f1f1f] uppercase">
                    Email :
                  </span>{" "}
                  aliirezaa.barkhordarii@gmail.com
                </p>
              </span>
            </li>
            <li>
              <span className="flex space-x-5">
                <BsTelephoneInbound
                  className="text-lg animate-pulse md:text-xl"
                  style={{ color: `${currentColor}` }}
                />
                <p
                  className="tracking-[1px]"
                  style={{ color: `${currentColor}` }}
                >
                  <span className="dark:text-[#fff] text-[#1f1f1f] uppercase">
                    Phone :
                  </span>{" "}
                  09337756404
                </p>
              </span>
            </li>
            <li>
              <span className="flex space-x-5">
                <AiFillGithub
                  className="text-lg animate-pulse md:text-xl"
                  style={{ color: `${currentColor}` }}
                />
                <p
                  className="tracking-[1px]"
                  style={{ color: `${currentColor}` }}
                >
                  <span className="dark:text-[#fff] text-[#1f1f1f] uppercase">
                    Github :
                  </span>{" "}
                  <a
                    href="https://github.com/Alirezabarkhordari73"
                    className="cursor-pointer"
                  >
                    https://github.com/Alirezabarkhordari73
                  </a>
                </p>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
