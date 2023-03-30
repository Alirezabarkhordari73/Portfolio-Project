import React, { useContext } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephoneInbound } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { ThemeContext } from "../Context/ContextProvider";

type Props = {};

const Contact = (props: Props) => {
  const { setColor, currentColor } = useContext(ThemeContext);
  return (
    <div className="h-screen relative flex flex-col items-center justify-center">
      <h3 className="uppercase text-[#8b6c31] tracking-[15px] text-2xl absolute top-28">
        Contact
      </h3>
      <h2 className="dark:text-[#fff] text-[#1f1f1f] absolute top-48 text-lg lg:text-2xl tracking-[1px]">
        If you consider About my resume please{" "}
        <span className="uppercase" style={{ color: `${currentColor}` }}>
          contact to me
        </span>
      </h2>
      <ul className="flex absolute top-64 flex-col justify-start items-center text-left w-full space-y-3">
        <li>
          <span className="flex space-x-5">
            <AiOutlineMail
              className="text-base md:text-xl animate-pulse"
              style={{ color: `${currentColor}` }}
            />
            <p
              className="text-lg tracking-[1px]"
              style={{ color: `${currentColor}` }}
            >
              <span className="dark:text-[#fff] text-[#1f1f1f] uppercase text-lg mr-2">
                Email :
              </span>{" "}
              aliirezaa.barkhordarii@gmail.com
            </p>
          </span>
        </li>
        <li>
          <span className="flex space-x-5">
            <BsTelephoneInbound
              className="text-base md:text-xl animate-pulse"
              style={{ color: `${currentColor}` }}
            />
            <p
              className="text-lg tracking-[1px]"
              style={{ color: `${currentColor}` }}
            >
              <span className="dark:text-[#fff] text-[#1f1f1f] uppercase text-lg mr-2">
                Phone :
              </span>{" "}
              09337756404
            </p>
          </span>
        </li>
        <li>
          <span className="flex space-x-5">
            <GoLocation
              className="text-base md:text-xl animate-pulse"
              style={{ color: `${currentColor}` }}
            />
            <p
              className="text-lg tracking-[1px]"
              style={{ color: `${currentColor}` }}
            >
              <span className="dark:text-[#fff] text-[#1f1f1f] uppercase text-lg mr-2">
                Location :
              </span>{" "}
              Iran-Tehran
            </p>
          </span>
        </li>
      </ul>
      <form className="flex flex-col mx-auto absolute w-fit space-y-4 top-[26rem]">
        <div className="flex space-x-2">
          <input placeholder="Name" className="contactInput" />
          <input placeholder="Email" className="contactInput" />
        </div>
        <input placeholder="Subject" className="contactInput" />
        <textarea placeholder="Message" className="contactInput" />
        <button
          style={{ backgroundColor: `${currentColor}` }}
          className="py-5 px-4 g-[#696bff] rounded-md dark:text-[#fff] text-black text-xl font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
