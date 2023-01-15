import React from "react";
import style from "./Hero.module.scss";
import { motion } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from "../../utils/motion";
import { AiOutlineSafety } from "react-icons/ai";
const Hero = () => {
  return (
    <section className={`paddings ${style.wrapper}`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.25 }}
        className={`innerWidth ${style.container}`}
      >
        <div className={style.upperElements}>
          <motion.span
            variants={fadeIn("right", "tween", 0.2, 1)}
            className="primaryText"
          >
            Welcome to <br /> Influrance
          </motion.span>

          <motion.span
            variants={fadeIn("left", "tween", 0.4, 1)}
            className="secondaryText"
          >
            Elevate your influence <br /> with protection from Influrance
          </motion.span>
        </div>

        <motion.div
          variants={fadeIn("up", "tween", 0.3, 1)}
          className={style.heroPerson}
        >
          <motion.img
            variants={slideIn("up", "tween", 0.5, 1.3)}
            src="./hero_person.png"
            alt="person"
          />
        </motion.div>
        <div className={style.lowerElements}>
          <motion.div
            variants={fadeIn("right", "tween", 0.3, 1)}
            className={style.experience}
          >
            <div className="primaryText">6</div>
            <div className="secondaryText">
              <div>Years</div>
              <div>Experience</div>
            </div>
          </motion.div>
          <motion.div
            variants={fadeIn("left", "tween", 0.5, 1)}
            className={style.certificate}
          >
            <AiOutlineSafety size={"50px"} />
            <span>Industry Compliance Standard</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
