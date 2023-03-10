import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.scss";
import { HiUser } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from "../../utils/motion";
const Login = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    if (success) {
      navigate("/udashboard", { state: user });
    }
    setSuccess(false);
  }, [success]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://long-ruby-hedgehog-gear.cyclic.app/api/auth/login", {
        username: user,
        password: pwd,
      })
      .then((res) => {
        console.log(res.data);
        let token = res.data;
        localStorage.setItem("jwt", token);
        setSuccess(true);
      });
  };
  return (
    <motion.div
      className={`${style.wrapper}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.25 }}
    >
      <motion.section
        className={style.sideContainer}
        initial={{ opacity: 0, x: "-100%" }}
        animate={{
          opacity: 1,
          x: "0",
          transition: {
            duration: 0.5,
            type: "tween",
            ease: "easeOut",
          },
        }}
      >
        <motion.img
          initial={{ opacity: 0, y: "100%" }}
          animate={{
            opacity: 1,
            y: "0",
            transition: {
              delay: 0.3,
              duration: 0.5,
              type: "tween",
              ease: "easeOut",
            },
          }}
          src="./loginchar.png"
        />
      </motion.section>
      <section className={style.mainContainner}>
        <div className={style.loginContainer}>
          <motion.div
            variants={fadeIn("down", "tween", 0.5, 1)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p className={"primaryText"}>Welcome Back</p>
            <div className={style.textSeparator}></div>
            <p className={"secondaryText"} id={style.welcomeMsg}>
              Please login with your credentials sent to your email.
            </p>
          </motion.div>
          <motion.div
            variants={fadeIn("up", "tween", 0.5, 1)}
            className={style.loginForm}
          >
            <form onSubmit={handleSubmit}>
              <div className={style.userDiv}>
                <HiUser size={"25px"} className={style.userIcon} />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => setUser(e.target.value)}
                ></input>
              </div>
              <div>
                <RiLockPasswordLine
                  size={"25px"}
                  className={style.passwordIcon}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPwd(e.target.value)}
                ></input>
              </div>
              <button type="submit" className={style.loginSubmit}>
                Login
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Login;
