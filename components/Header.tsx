import React, { useContext } from "react";
import { SocialIcon } from "react-social-icons";
import Image from "next/image";
import { motion } from "framer-motion";
import { BsSun, BsMoonStars } from "react-icons/bs";

import myAvatarPic from "../assets/images/Avatar1.jpg";
import { ThemeContext } from "../Context/ContextProvider";

type Props = {};

const Header = (props: Props) => {
  const { toggleTheme, theme, setColor, currentColor } =
    useContext(ThemeContext);

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
          className="w-7 h-7 rounded-full"
          style={{ backgroundColor: `${currentColor}` }}
        ></div>
      </motion.div>
    </div>
  );
};

export default Header;
