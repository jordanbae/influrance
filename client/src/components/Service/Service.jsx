import React from "react";
import style from "./Service.module.scss";
import { WhatWeDo } from "../../utils/data";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, textVariant } from "../../utils/motion";
const Service = () => {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.25 }}
      className={style.wrapper}
    >
      <a className="anchor" id="services"></a>
      <div
        className={`paddings yPaddings flexCenter innerWidth ${style.container}`}
      >
        <motion.div variants={textVariant(0.5)} className={style.centerSide}>
          <span className="primaryText">What We Do</span>
          {WhatWeDo.map((text, i) => {
            return (
              <span className="secondaryText" key={i}>
                {text}
              </span>
            );
          })}
          <div className={style.records}>
            <div className={style.record}>
              <span className="primaryText">220+</span>
              <span className="secondaryText">Registered Clients</span>
            </div>
            <div className={style.record}>
              <span className="primaryText"> ฿1,670,000</span>
              <span className="secondaryText">Covered</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Service;
