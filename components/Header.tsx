import React, { useContext, useState } from "react";
import { SocialIcon } from "react-social-icons";
import Image from "next/image";
import { motion } from "framer-motion";
import { BsSun, BsMoonStars } from "react-icons/bs";

import myAvatarPic from "../assets/images/Avatar1.jpg";
import { ThemeContext } from "../Context/ContextProvider";

type Props = {};

const Header = (props: Props) => {
  const [openColorPalleteState, SetOpenColorPalleteState] = useState(false);
  const { toggleTheme, theme, setColor, currentColor } =
    useContext(ThemeContext);

  const openColorPallete = () => {
    SetOpenColorPalleteState(!openColorPalleteState);
  };

  return (
    <div className="top-0 sticky flex items-start justify-between mx-auto max-w-7xl z-50 px-5 py-1">
      <motion.div
        initial={{ x: -500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <SocialIcon
          url="https://www.instagram.com/aliiiii_reza73/"
          bgColor="transparent"
          fgColor={`${theme === "dark" ? "#fff" : "#000"}`}
          style={{ height: 43, width: 43 }}
        />
        <SocialIcon
          url="https://www.facebook.com/alireza.barkhordari.16/"
          bgColor="transparent"
          fgColor={`${theme === "dark" ? "#fff" : "#000"}`}
          style={{ height: 43, width: 43 }}
        />
        <SocialIcon
          url="https://www.youtube.com/"
          bgColor="transparent"
          fgColor={`${theme === "dark" ? "#fff" : "#000"}`}
          style={{ height: 43, width: 43 }}
        />
        <SocialIcon
          url="https://twitter.com/"
          bgColor="transparent"
          fgColor={`${theme === "dark" ? "#fff" : "#000"}`}
          style={{ height: 43, width: 43 }}
        />
        <SocialIcon
          url="https://www.linkedin.com/"
          bgColor="transparent"
          fgColor={`${theme === "dark" ? "#fff" : "#000"}`}
          style={{ height: 43, width: 43 }}
        />
        <SocialIcon
          url="https://github.com/Alirezabarkhordari73"
          bgColor="transparent"
          fgColor={`${theme === "dark" ? "#fff" : "#000"}`}
          style={{ height: 43, width: 43 }}
        />
      </motion.div>

      <motion.div
        className="flex items-center gap-4 text-white"
        initial={{ x: 500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={myAvatarPic}
          alt="user-avatar-pic"
          className="rounded-full cursor-pointer#EEEEEE w-[35px] h-[35px] md:w-[50px] md:h-[50px]"
        />
        <h3 className="text-md dark:text-[#fff] text-[#000] md:text-lg tracking-[1px]">
          Alireza Barkhordari
        </h3>
        {theme === "dark" && (
          <BsSun
            className="dark:text-[#ffda38] text-[#000] text-[1.7rem] cursor-pointer"
            onClick={() => toggleTheme()}
          />
        )}

        {theme === "light" && (
          <BsMoonStars
            className="dark:text-[#fff] text-[#1b3eaf] text-[1.6rem] cursor-pointer"
            onClick={() => toggleTheme()}
          />
        )}
        <div
          className="w-7 h-7 rounded-full cursor-pointer"
          style={{ backgroundColor: `${currentColor}` }}
          onClick={() => openColorPallete()}
        ></div>
        {openColorPalleteState && (
          <div className="w-[60px] absolute top-[4rem] right-[0.4rem] dark:bg-[#202031] rounded-md flex-col flex justify-between items-center gap-4 py-4 ">
            <div
              className="w-7 h-7 rounded-full bg-[#ff5b5b] cursor-pointer"
              onClick={() => setColor("#ff5b5b")}
            ></div>
            <div
              className="w-7 h-7 rounded-full bg-[#d0e41b] cursor-pointer"
              onClick={() => setColor("#d3ff5b")}
            ></div>
            <div
              className="w-7 h-7 rounded-full bg-[#ff5bc0] cursor-pointer"
              onClick={() => setColor("#ff5bc0")}
            ></div>
            <div
              className="w-7 h-7 rounded-full bg-[#5bd1ff] cursor-pointer"
              onClick={() => setColor("#5bd1ff")}
            ></div>
            <div
              className="w-7 h-7 rounded-full bg-[#795bff] cursor-pointer"
              onClick={() => setColor("#795bff")}
            ></div>
            <div
              className="w-7 h-7 rounded-full bg-[#5bff7f] cursor-pointer"
              onClick={() => setColor("#5bff7f")}
            ></div>
            <div
              className="w-7 h-7 rounded-full bg-[#ff7c5b] cursor-pointer"
              onClick={() => setColor("#ff7c5b")}
            ></div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Header;
