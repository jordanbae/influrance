import { motion } from "framer-motion";
import React, { useState } from "react";
import style from "./Packages.module.scss";
import { fadeIn, staggerChildren } from "../../utils/motion";
import ComparisonModal from "../ComparisonModal/ComparisonModal";
import Tier1 from "../PackagesForm/Tier1";
const Packages = () => {
  const [openModalFrame, setOpenModalFrame] = useState(false);
  const [chosenPackage, setChosenPackage] = useState("");
  const handleOpenForm = (e) => {
    e.preventDefault();
    const value = e.target.dataset.value;
    setChosenPackage(value);
    alert(value);
  };

  const handleModal = () => {
    setOpenModalFrame(!openModalFrame);
  };
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.25 }}
      className={`paddings ${style.wrapper}`}
    >
      <a className="anchor" id="packages"></a>
      <div className={`innerWidth flexCenter ${style.container}`}>
        <div className={`flexCenter ${style.heading}`}>
          <div>
            <span className="primaryText">Influrance's Packages</span>
            <p className="secondaryText" style={{ marginTop: "10px" }}>
              Find the influrance package that fits you best
            </p>
          </div>

          <span
            className="secondaryText"
            style={{ textDecoration: "none" }}
            onClick={() => {
              handleModal();
            }}
          >
            Compare Packages
          </span>
          {/* OpenModal */}
          {openModalFrame ? (
            <ComparisonModal
              openModalFrame={openModalFrame}
              handleClose={handleModal}
            />
          ) : null}
        </div>
        <div className={`flexCenter ${style.packages}`}>
          <motion.img
            variants={fadeIn("up", "tween", 0.5, 0.6)}
            src="./tier1.png"
            alt="package"
            data-value="tier1"
            onClick={(e) => {
              handleOpenForm(e);
            }}
          />
          <motion.img
            variants={fadeIn("up", "tween", 0.7, 0.6)}
            src="./tier2.png"
            alt="package"
            data-value="tier2"
            onClick={(e) => {
              handleOpenForm(e);
            }}
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
