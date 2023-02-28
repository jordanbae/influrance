import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import style from "./Packages.module.scss";
import { fadeIn, staggerChildren } from "../../utils/motion";
import ComparisonModal from "../ComparisonModal/ComparisonModal";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";
import axios from "axios";

const Packages = () => {
  const navigate = useNavigate();
  const [openModalFrame, setOpenModalFrame] = useState(false);
  const [chosenPackage, setChosenPackage] = useState("");
  const [authenticated, setAuthenticated] = React.useState(false);
  const [prefix, setPrefix] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [citizenid, setCitizenid] = React.useState("");
  const [uid, setUid] = React.useState("");
  const [nextId, setNextId] = React.useState("");
  const [orderId, setOrderId] = React.useState("");

  const handleModal = () => {
    setOpenModalFrame(!openModalFrame);
  };
  const handleChosenPackage = (e) => {
    e.preventDefault();
    const val = e.target.dataset.value;
    setChosenPackage(val);
  };
  React.useEffect(() => {
    axios
      .post(`http://influrance-api.test/api/v1/order/getnextorder`)
      .then((res) => {
        console.log(res);
        setOrderId(res.data.nextOrder);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authenticated]);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (authenticated) {
      console.log(token);
      axios
        .post(`http://influrance-api.test/api/v1/auth/getname`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          const uData = res.data;
          setPrefix(uData.prefix);
          setFirstname(uData.firstname);
          setLastname(uData.lastname);
          setCitizenid(uData.citizen_id);
          setUid(uData.id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [authenticated]);
  // for navigate to purcahse
  useEffect(() => {
    setAuthenticated(isLoggedIn());
    if (chosenPackage) {
      navigate("/buy", {
        state: {
          uid: uid,
          package: chosenPackage,
          prefix: prefix,
          firstname: firstname,
          lastname: lastname,
          citizenid: citizenid,
          nextId: nextId,
          orderId: orderId,
        },
      });
    }
  }, [chosenPackage, navigate]);
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
            data-value="1"
            onClick={handleChosenPackage}
          />
          <motion.img
            variants={fadeIn("up", "tween", 0.7, 0.6)}
            src="./tier2.png"
            alt="package"
            data-value="2"
            onClick={handleChosenPackage}
          />
          <motion.img
            variants={fadeIn("up", "tween", 0.9, 0.6)}
            src="./tier3.png"
            alt="package"
            data-value="3"
            onClick={handleChosenPackage}
          />
          <motion.img
            variants={fadeIn("up", "tween", 1.1, 0.6)}
            src="./tier4.png"
            alt="package"
            data-value="4"
            onClick={handleChosenPackage}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Packages;
