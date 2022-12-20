import React from "react";
import { SocialIcon } from "react-social-icons";
import Image from "next/image";
import { motion } from "framer-motion";

import myAvatarPic from "../assets/images/Avatar1.jpg";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="top-0 sticky flex items-start justify-between mx-auto max-w-7xl z-50 p-5">
      <motion.div
        initial={{ x: -500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}>
        <SocialIcon
          url="https://www.instagram.com/aliiiii_reza73/"
          bgColor="#0f0408"
          fgColor="#EEEEEE"
          style={{ height: 43, width: 43 }}
        />
        <SocialIcon
          url="https://www.facebook.com/alireza.barkhordari.16/"
          bgColor="#0f0408"
          fgColor="#EEEEEE"
          style={{ height: 43, width: 43 }}
        />
        <SocialIcon
          url="https://www.youtube.com/"
          bgColor="#0f0408"
          fgColor="#EEEEEE"
          style={{ height: 43, width: 43 }}
        />
        <SocialIcon
          url="https://twitter.com/"
          bgColor="#0f0408"
          fgColor="#EEEEEE"
          style={{ height: 43, width: 43 }}
        />
        <SocialIcon
          url="https://www.linkedin.com/"
          bgColor="#0f0408"
          fgColor="#EEEEEE"
          style={{ height: 43, width: 43 }}
        />
        <SocialIcon
          url="https://github.com/Alirezabarkhordari73"
          bgColor="#0f0408"
          fgColor="#EEEEEE"
          style={{ height: 43, width: 43 }}
        />
      </motion.div>

      <motion.div
        className="flex items-center gap-3 text-white"
        initial={{ x: 500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}>
        <Image
          src={myAvatarPic}
          alt="user-avatar-pic"
          className="rounded-full cursor-pointer#EEEEEE w-[35px] h-[35px] md:w-[50px] md:h-[50px]"
        />
        <h3 className="text-md text-stone-300 md:text-lg">
          Alireza Barkhordari
        </h3>
      </motion.div>
    </div>
  );
};

export default Header;
