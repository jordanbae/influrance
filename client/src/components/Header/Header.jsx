import React, { useState } from "react";
import style from "./Header.module.scss";
import { BiMenuAltRight, BiPhoneCall } from "react-icons/bi";
import { motion } from "framer-motion";
import { headerVariants } from "../../utils/motion";
import { getMenuStyles } from "../../utils/motion";
import useHeaderShadow from "../../hooks/useHeaderShadow";
const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerShadow = useHeaderShadow();
  return (
    <motion.div
      initial="hidden"
      whileInView={"show"}
      variants={headerVariants}
      viewport={{ once: false, amount: 0.25 }}
      className={`paddings ${style.wrapper}`}
      style={{ boxShadow: headerShadow }}
    >
      <div className={`flexCenter innerWidth ${style.container}`}>
        {/* <div className={style.name}>Influrance</div> */}
        <img src="./snl.png" alt="logo" style={{ height: "60px" }} />

        <ul
          style={getMenuStyles(menuOpened)}
          className={`flexCenter ${style.menu}`}
        >
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#packages">Packages</a>
          </li>
          <li>
            <a href="#reviews">Reviews</a>
          </li>
          <li className={`flexCenter ${style.phone}`}>
            <p>+123 456 789</p>
            <BiPhoneCall size={"40px"} />
          </li>
          <li>
            <a href="/login" style={{ textTransform: "capitalize" }}>
              Login
            </a>
          </li>
        </ul>
        {/* sm - md screen */}
        <div
          className={style.menuIcon}
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
