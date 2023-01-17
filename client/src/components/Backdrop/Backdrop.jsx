import React from "react";
import { motion } from "framer-motion";
import style from "./Backdrop.module.scss";
const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      className={style.backdrop}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opaicty: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
