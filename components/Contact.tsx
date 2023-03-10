import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephoneInbound } from "react-icons/bs";
import { GoLocation } from "react-icons/go";

type Props = {};

const Contact = (props: Props) => {
  return (
    <div className="h-screen relative flex flex-col items-center justify-center">
      <h3 className="uppercase text-[#7b5f2b] tracking-[15px] text-2xl absolute top-28">
        Contact
      </h3>
      <h2 className="text-stone-100 absolute top-48 text-lg lg:text-2xl tracking-[1px]">
        If you consider About my resume please{" "}
        <span className="text-[#da1b64] uppercase">contact to me</span>
      </h2>
      <ul className="flex absolute top-64 flex-col justify-start items-center text-left w-full space-y-3">
        <li>
          <span className="flex space-x-5">
            <AiOutlineMail className="text-base md:text-xl text-[#da1b64] animate-pulse" />
            <p className="text-[#ff3f7c] text-lg tracking-[1px]">
              <span className="text-white uppercase text-lg mr-2">Email :</span>{" "}
              aliirezaa.barkhordarii@gmail.com
            </p>
          </span>
        </li>
        <li>
          <span className="flex space-x-5">
            <BsTelephoneInbound className="text-base md:text-xl text-[#da1b64] animate-pulse" />
            <p className="text-[#ff3f7c] text-lg tracking-[1px]">
              <span className="text-white uppercase text-lg mr-2">Phone :</span>{" "}
              09337756404
            </p>
          </span>
        </li>
        <li>
          <span className="flex space-x-5">
            <GoLocation className="text-base md:text-xl text-[#da1b64] animate-pulse" />
            <p className="text-[#ff3f7c] text-lg tracking-[1px]">
              <span className="text-white uppercase text-lg mr-2">
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
        <button className="py-5 px-4 bg-[#c41659] rounded-md text-black text-xl font-bold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
