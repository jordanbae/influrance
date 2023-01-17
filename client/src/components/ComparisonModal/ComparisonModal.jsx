import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import style from "./ComparisonModal.module.scss";
import Backdrop from "../Backdrop/Backdrop";
import { fadeIn, staggerChildren } from "../../utils/motion";
const ComparisonModal = ({ handleClose, openModalFrame }) => {
  const [animationTrigger, setTrigger] = useState(false);
  useEffect(() => {
    if (openModalFrame) {
      setTrigger(true);
    }
  }, [openModalFrame]);
  return (
    <Backdrop>
      <div className={style.container}>
        <motion.img
          className={style.compImage}
          initial={"hidden"}
          animate={animationTrigger && "show"}
          variants={fadeIn("up", "tween", 0.5, 0.6)}
          src="./comp_1.png"
          alt="comparison"
        />
        <motion.img
          className={style.compImage}
          initial={"hidden"}
          animate={animationTrigger && "show"}
          variants={fadeIn("up", "tween", 0.7, 0.6)}
          src="./comp_2.png"
          alt="comparison"
        />
        <motion.img
          className={style.compImage}
          id={style.childImage}
          initial={"hidden"}
          animate={animationTrigger && "show"}
          variants={fadeIn("up", "tween", 0.9, 0.6)}
          src="./comp_3.png"
          alt="comparison"
        />
        <motion.img
          className={style.compImage}
          id={style.childImage}
          initial={"hidden"}
          animate={animationTrigger && "show"}
          variants={fadeIn("up", "tween", 1.1, 0.6)}
          src="./comp_4.png"
          alt="comparison"
        />
        <motion.img
          className={style.compImage}
          id={style.childImage}
          initial={"hidden"}
          animate={animationTrigger && "show"}
          variants={fadeIn("up", "tween", 1.3, 0.6)}
          src="./comp_5.png"
          alt="comparison"
        />
        <motion.img
          className={style.compImage}
          id={style.childImage}
          style={{}}
          initial={"hidden"}
          animate={animationTrigger && "show"}
          variants={fadeIn("up", "tween", 1.5, 0.6)}
          src="./comp_6.png"
          alt="comparison"
        />
        <motion.button
          onClick={handleClose}
          id={style.childImage}
          initial={"hidden"}
          animate={animationTrigger && "show"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          variants={fadeIn("up", "tween", 1.7, 0.6)}
          className={style.closeBtn}
          style={{
            border: "none",
            position: "relative",
            float: "left",
            width: "30%",
            height: "50px",
            borderRadius: "12px",
            marginBottom: "1.5rem",
            cursor: "pointer",
            backgroundColor: "#f7f7f7",
            outline: "none",
            fontSize: "20px",
          }}
        >
          Close
        </motion.button>
      </div>
    </Backdrop>
  );
};

export default ComparisonModal;
