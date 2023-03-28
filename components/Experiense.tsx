import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import img from "../assets/images/Avatar2.jpg";
import AmytisLogo from "../assets/images/LOGO-Amytis.webp";

type Props = {};

const Experiense = (props: Props) => {
  return (
    <article className="h-screen relative flex flex-col items-center justify-center">
      <h3 className="uppercase text-[#7b5f2b] tracking-[15px] text-2xl absolute top-28">
        Experience
      </h3>
      <motion.div
        className="w-full absolute top-48"
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Swiper
          pagination={{ clickable: true }}
          navigation
          freeMode={true}
          slidesPerView="auto"
          modules={[FreeMode, Pagination, Navigation]}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            480: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 10 },
            1280: { slidesPerView: 3, spaceBetween: 15 },
          }}
        >
          <SwiperSlide className="flex justify-center items-center">
            <div className="dark:bg-[#1b1b33] w-[410px] h-[610px] dark:text-[#fff] text-[#1f1f1f] rounded-md dark:hover:bg-[#22223d] hover:bg-[#c4c4dd] transition duration-200 opacity-60 hover:opacity-100 flex flex-col items-center justify-start p-10 border-[1px] border-[#696bff]">
              <Image
                src={img.src}
                alt="company-img"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div className="flex flex-col items-start justify-center text-left w-full space-y-7">
                <h3 className="text-xl mt-5 tracking-[2px]">
                  Frontend Web Developer in{" "}
                  <p className="font-semibold">Freelancer</p>
                </h3>
                <ul className="list-disc ml-5 space-y-3">
                  <li>
                    <p className="font-semibold text-lg text-[#696bff] tracking-[2px]">
                      JUNIOR WEB DEVELOPER
                    </p>{" "}
                    Bring to the table win-win survival strategies to ensure
                    proactive domination. At the end of the day, going forward,
                    a new normal that has evolved from generation X is on the
                    runway heading towards a streamlined cloud solution. User
                    generated content in real-time will have multiple
                    touchpoints for offshoring.
                  </li>
                  <li>December 2011 - March 2013</li>
                </ul>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center">
            <div className="dark:bg-[#1b1b33] w-[410px] h-[610px] dark:text-[#fff] text-[#1f1f1f]rounded-md dark:hover:bg-[#22223d] hover:bg-[#c4c4dd] transition duration-200 opacity-60 hover:opacity-100 flex flex-col items-center justify-start p-10 border-[1px] border-[#696bff]">
              <Image
                src={AmytisLogo.src}
                alt="company-img"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div className="flex flex-col items-start justify-center text-left w-full space-y-7">
                <h3 className="text-xl mt-5 tracking-[2px]">
                  Game Programmer & level desighner at{" "}
                  <p className="font-semibold">Amytis Games</p>
                </h3>
                <ul className="list-disc ml-5 space-y-3">
                  <li>
                    <p className="font-semibold text-lg text-[#696bff] tracking-[2px]">
                      Junior Game Programmer
                    </p>{" "}
                    Bring to the table win-win survival strategies to ensure
                    proactive domination. At the end of the day, going forward,
                    a new normal that has evolved from generation X is on the
                    runway heading towards a streamlined cloud solution. User
                    generated content in real-time will have multiple
                    touchpoints for offshoring.
                  </li>
                  <li>December 2020 - March 2021</li>
                </ul>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center">
            <div className="dark:bg-[#1b1b33] w-[410px] h-[610px] dark:text-[#fff] text-[#1f1f1f] rounded-md dark:hover:bg-[#22223d] hover:bg-[#c4c4dd] transition duration-200 opacity-60 hover:opacity-100 flex flex-col items-center justify-start p-10 border-[1px] border-[#696bff]">
              <Image
                src={img.src}
                alt="company-img"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div className="flex flex-col items-start justify-center text-left w-full space-y-7">
                <h3 className="text-xl mt-5 tracking-[2px]">
                  Frontend Web Developer in{" "}
                  <p className="font-semibold">Freelancer</p>
                </h3>
                <ul className="list-disc ml-5 space-y-3">
                  <li>
                    <p className="font-semibold text-lg text-[#696bff] tracking-[2px]">
                      JUNIOR WEB DEVELOPER
                    </p>{" "}
                    Bring to the table win-win survival strategies to ensure
                    proactive domination. At the end of the day, going forward,
                    a new normal that has evolved from generation X is on the
                    runway heading towards a streamlined cloud solution. User
                    generated content in real-time will have multiple
                    touchpoints for offshoring.
                  </li>
                  <li>December 2011 - March 2013</li>
                </ul>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </article>
  );
};

export default Experiense;
