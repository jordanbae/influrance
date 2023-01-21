import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./UserDashboard.module.scss";
import { Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from "../../utils/motion";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle, MdOutlineEmail, MdPhone } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import {
  BsFillCalendarPlusFill,
  BsFillCalendarXFill,
  BsFillCalendarCheckFill,
} from "react-icons/bs";
import moment from "moment";
// import window.Cookies from "js-cookie";
const UserDashboard = () => {
  const location = useLocation();
  const currentUser = location.state;
  const [userData, setUserData] = useState(null);
  const [userPolData, setUserPolData] = useState(null);
  const [userPurData, setUserPurData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log("Console Loggin localstorage", localStorage.getItem("jwt"));
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        setUserData(res.data.userData[0]);
        setUserPolData(res.data.userData[1]);
        setUserPurData(res.data.userData[2]);
        setLoading(false);
        console.log("array 0 ", userData);
        console.log("array 1 ", userPolData);
        console.log("array 2 ", userPurData);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [isLoading]);

  const handleLogout = (e) => {
    e.preventDefault();
    setUserData(null);
    setUserPolData(null);
    setUserPurData(null);
    setLoading(true);
    navigate("/");
  };

  if (isLoading) {
    return null;
  }
  const userDataItem = () => {
    return (
      <div>
        this is user data item
        <p>{userData.fullname}</p>
      </div>
    );
  };
  return (
    <div className={style.wrapper}>
      <motion.div
        className={`${style.container}`}
        variants={staggerContainer}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.25 }}
      >
        <div className={style.leftContainer}>
          <motion.div variants={slideIn("up", "tween", 0.3, 1)}>
            {/* <img src="./site_logo.png" alt="logo" /> */}
            <motion.p
              className="primaryText"
              variants={fadeIn("up", "tween", 0.5, 1)}
            >
              Welcome
            </motion.p>
            <motion.p
              className="secondaryText"
              variants={fadeIn("up", "tween", 0.5, 1)}
            >
              {userData.fullname}
            </motion.p>
            <motion.p
              style={{ color: "#0d2f3f", fontSize: "1rem", cursor: "pointer" }}
              onClick={handleLogout}
              variants={fadeIn("up", "tween", 0.5, 1)}
            >
              Logout
            </motion.p>
          </motion.div>
        </div>
        <div className={style.rightContainer}>
          <div className={`${style.upperElement}`}>
            <div className={`${style.dataWrapper}`}>
              <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                animate={{
                  opacity: 1,
                  y: "0",
                  transition: {
                    delay: 0.2,
                    duration: 0.5,
                    type: "tween",
                    ease: "easeOut",
                  },
                }}
                className={style.amountCont}
              >
                <p className={style.covData}>฿ {userPolData.coverage_limit}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                animate={{
                  opacity: 1,
                  y: "0",
                  transition: {
                    delay: 0.4,
                    duration: 0.5,
                    type: "tween",
                    ease: "easeOut",
                  },
                }}
                className={style.spentCont}
              >
                <p className={style.covData}>฿ {userPolData.coverage_spent}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                animate={{
                  opacity: 1,
                  y: "0",
                  transition: {
                    delay: 0.6,
                    duration: 0.5,
                    type: "tween",
                    ease: "easeOut",
                  },
                }}
                className={style.leftCont}
              >
                <p className={style.covData}>฿ {userPolData.coverage_left}</p>
              </motion.div>
            </div>
          </div>
          <div className={style.lowerElement}>
            <div className={style.innerUpperElement}>
              <h1>Package Owned</h1>
            </div>
            <div className={style.innerLowerElement}>
              <div className={style.leftElement}>
                {userPurData === "tier1" ? (
                  <motion.img
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={{
                      opacity: 1,
                      y: "0",
                      transition: {
                        // delay: 0.2,
                        duration: 0.5,
                        type: "tween",
                        ease: "easeOut",
                      },
                    }}
                    src="./tier1.png"
                    alt="package"
                    data-value="tier1"
                  />
                ) : userPurData.tier === "tier2" ? (
                  <motion.img
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={{
                      opacity: 1,
                      y: "0",
                      transition: {
                        // delay: 0.2,
                        duration: 0.5,
                        type: "tween",
                        ease: "easeOut",
                      },
                    }}
                    src="./tier2.png"
                    alt="package"
                    data-value="tier2"
                  />
                ) : userPurData.tier === "tier3" ? (
                  <motion.img
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={{
                      opacity: 1,
                      y: "0",
                      transition: {
                        // delay: 0.2,
                        duration: 0.5,
                        type: "tween",
                        ease: "easeOut",
                      },
                    }}
                    src="./tier3.png"
                    alt="package"
                    data-value="tier3"
                  />
                ) : userPurData.tier === "tier4" ? (
                  <motion.img
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={{
                      opacity: 1,
                      y: "0",
                      transition: {
                        // delay: 0.2,
                        duration: 0.5,
                        type: "tween",
                        ease: "easeOut",
                      },
                    }}
                    src="./tier4.png"
                    alt="package"
                    data-value="tier4"
                  />
                ) : null}
              </div>
              <div className={style.rightElement}>
                <motion.div
                  className={style.packageDetail}
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{
                    opacity: 1,
                    x: "0",
                    transition: {
                      // delay: 0.2,
                      duration: 0.5,
                      type: "tween",
                      ease: "easeOut",
                    },
                  }}
                >
                  <div className={style.currentUserDetail}>
                    <p>
                      <span>
                        <MdAccountCircle />
                      </span>
                      {userData.username}
                    </p>
                    <p>
                      <span>
                        <MdOutlineEmail />
                      </span>
                      {userData.email}
                    </p>

                    <p>
                      <span>
                        <MdPhone />
                      </span>
                      {userData.phone}
                    </p>
                  </div>

                  <div className={style.userPackageDetail}>
                    {userPurData.tier === "tier1" ? (
                      <p>
                        <span>
                          <FiPackage />
                        </span>
                        Package: Starter Pack - Tier 1
                      </p>
                    ) : userPurData.tier === "tier2" ? (
                      <p>
                        <span>
                          <FiPackage />
                        </span>
                        Package: Basic Pack - Tier 2
                      </p>
                    ) : userPurData.tier === "tier3" ? (
                      <p>
                        <span>
                          <FiPackage />
                        </span>
                        Package: Pro Pack - Tier 3
                      </p>
                    ) : userPurData.tier === "tier4" ? (
                      <p>
                        <span>
                          <FiPackage />
                        </span>
                        Package: Premium Pack - Tier 4
                      </p>
                    ) : null}
                    <p>
                      <span>
                        <BsFillCalendarPlusFill />
                      </span>
                      Purchase Date:{" "}
                      {moment(userPolData.purchase_date).format("DD MMM YYYY")}
                    </p>
                    <p>
                      <span>
                        <BsFillCalendarCheckFill />
                      </span>
                      Start Date:{" "}
                      {moment(userPolData.start_date).format("DD MMM YYYY")}
                    </p>
                    <p>
                      <span>
                        <BsFillCalendarXFill />
                      </span>
                      Expire Date:{" "}
                      {moment(userPolData.expire_date).format("DD MMM YYYY")}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
