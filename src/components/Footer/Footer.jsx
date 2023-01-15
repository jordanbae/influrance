import React from "react";
import { footerVariants, staggerChildren } from "../../utils/motion";
import css from "./Footer.module.scss";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`paddings ${css.wrapper}`}
    >
      <motion.div
        variants={footerVariants}
        className={`innerWidth yPaddings flexCenter ${css.container}`}
      >
        <div className={css.left}>
          <span className="primaryText">
            Start your protection <br />
            with Influrance.
          </span>
          {/* <span className="primaryText">
            Start by <a href="mailto:zainkeepscode@gmail.com">saying hi</a>
          </span> */}
        </div>

        <div className={css.right}>
          <div className={css.info}>
            <span className="primaryText">
              CALL <span className={css.callCenter}>1888</span>
            </span>
          </div>
          <div className={css.detail}>
            <span className="secondaryText">Influrance Co., Ltd.</span>
            <p>101 Bangkok, Phra Khanong 722, Thailand</p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Footer;
