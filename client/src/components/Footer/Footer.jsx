import React from "react";
import { footerVariants, staggerChildren } from "../../utils/motion";
import style from "./Footer.module.scss";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`paddings ${style.wrapper}`}
    >
      <motion.div
        variants={footerVariants}
        className={`innerWidth yPaddings flexCenter ${style.container}`}
      >
        <div className={style.left}>
          <span className="primaryText">
            Start your protection <br />
            with Influrance.
          </span>
        </div>

        <div className={style.right}>
          <div className={style.info}>
            <span className="primaryText">
              CALL <span className={style.callCenter}>1888</span>
            </span>
          </div>
          <div className={style.detail}>
            <span className="secondaryText">Influrance Co., Ltd.</span>
            <p>101 Bangkok, Phra Khanong 722, Thailand</p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Footer;
