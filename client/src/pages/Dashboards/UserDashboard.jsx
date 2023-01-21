import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./UserDashboard.module.scss";
import { Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from "../../utils/motion";
import { useNavigate } from "react-router-dom";
const UserDashboard = () => {
  const location = useLocation();
  const currentUser = location.state;
  const [userData, setUserData] = useState(null);
  const [userPolData, setUserPolData] = useState(null);
  const [userPurData, setUserPurData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
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
  // const mapUserData = userData.map((item, i) => {
  //   return (
  //     <>
  //       <h3>{item.username}</h3>
  //       <h3>{item.fullname}</h3>
  //       <h3>{item.email}</h3>
  //       <h3>{item.social_media_handle}</h3>
  //     </>
  //   );
  // });
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
              <div className={style.amountCont}>
                <div className={style.amountUpper}>
                  <p className={style.covLabel}>Coverage Limit</p>
                </div>
                <div className={style.amountLower}>
                  <p className={style.covData}>
                    ฿ {userPolData.coverage_limit}
                  </p>
                </div>
              </div>
              <div className={style.spentCont}>
                <div className={style.spentUpper}>
                  <p className={style.covLabel}>Coverage Spent</p>
                </div>
                <div className={style.spentLower}>
                  <p className={style.covData}>
                    ฿ {userPolData.coverage_spent}
                  </p>
                </div>
              </div>
              <div className={style.leftCont}>
                <div className={style.leftUpper}>
                  <p className={style.covLabel}>Coverage Left</p>
                </div>
                <div className={style.leftLower}>
                  <p className={style.covData}>฿ {userPolData.coverage_left}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={style.lowerElement}>
            <div className={style.innerUpperElement}>
              <h1>Package Owned</h1>
            </div>
            <div className={style.innerLowerElement}></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
