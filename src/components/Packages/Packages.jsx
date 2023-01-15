import { motion } from "framer-motion";
import React from "react";
import style from "./Packages.module.scss";
import { fadeIn, staggerChildren } from "../../utils/motion";
const Packages = () => {
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.25 }}
      className={`paddings ${style.wrapper}`}
    >
      <div className={`innerWidth flexCenter ${style.container}`}>
        <div className={`flexCenter ${style.heading}`}>
          <div>
            <span className="primaryText">Influrance's Packages</span>
            <p className="secondaryText" style={{ marginTop: "10px" }}>
              Find the influrance package that fits you best
            </p>
          </div>
          <span className="secondaryText">Explore more</span>
        </div>
        <div className={`flexCenter ${style.packages}`}>
          <motion.img
            variants={fadeIn("up", "tween", 0.5, 0.6)}
            src="./tier1.png"
            alt="package"
          />
          <motion.img
            variants={fadeIn("up", "tween", 0.7, 0.6)}
            src="./tier2.png"
            alt="package"
          />
          <motion.img
            variants={fadeIn("up", "tween", 0.9, 0.6)}
            src="./tier3.png"
            alt="package"
          />
          <motion.img
            variants={fadeIn("up", "tween", 1.1, 0.6)}
            src="./tier4.png"
            alt="package"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Packages;
