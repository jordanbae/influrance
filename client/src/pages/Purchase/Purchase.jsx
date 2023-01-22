import axios from "axios";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Purchase.module.scss";
import { HiUser } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from "../../utils/motion";
import { FiPackage } from "react-icons/fi";
import { TbCalendarTime } from "react-icons/tb";
import checkmark from "../../assets/checkmark.json";
import {
  MdOutlineAccountBalanceWallet,
  MdEmail,
  MdDriveFileRenameOutline,
  MdPassword,
} from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { IoShareSocial, IoApps } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaAddressCard, FaMoneyBillAlt } from "react-icons/fa";
import { AiFillCreditCard } from "react-icons/ai";
import lottie from "lottie-web";
import { useLocation } from "react-router-dom";
import cryptoRandomString from "crypto-random-string";
import emailjs from "@emailjs/browser";
const Purchase = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  //From old purchase
  const [isVisible, setVisible] = useState(false);
  const [formStep, setFormStep] = useState(1);
  //handling form data and api call
  const [packageData, setPackageData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [coverageAmount, setCoverageAmount] = useState(null);
  const [coveragePrice, setCoveragePrice] = useState(null);
  const [randPassword, setRandPassword] = useState(null);

  const location = useLocation();
  const chosenPackage = location.state;
  const [formData, setFormData] = useState({
    //Policies
    tier: null,
    coverage_amount: null,
    price: null,
    //Influencers
    fullname: null,
    user_name: null,
    password: null,
    phone: null,
    email: null,
    address: null,
    social_media_handle: null,
    platform: null,
    income: null,
  });

  //EmailJs params
  const [packageName, setPackageName] = useState("");
  const current = new Date();
  const startDate = `${current.getDate() + 1}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const endDate = `${current.getDate()}/${current.getMonth() + 1}/${
    current.getFullYear() + 1
  }`;
  const packageNameChecker = (packageid) => {
    if (packageid === "tier1") {
      setPackageName("Starter Pack - Tier 1");
    } else if (packageid === "tier2") {
      setPackageName("Basic Pack - Tier 2");
    } else if (packageid === "tier3") {
      setPackageName("Pro Pack - Tier 3");
    } else {
      setPackageName("Premium Pack - Tier 4");
    }
  };
  //Password generator
  const passwordGenerator = () => {
    const password = cryptoRandomString({
      length: 8,
      characters:
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#%^&*",
    }).toString();

    return { password };
  };
  const container = useRef(null);
  //Form steps handler
  const nextFormStep = () => {
    setFormStep((step) => step + 1);
  };
  const backFormStep = () => {
    setFormStep((step) => step - 1);
  };
  const randpwd = passwordGenerator();
  useEffect(() => {
    setVisible(true);
    setRandPassword(randpwd);
    axios
      .get(`http://localhost:3001/api/policies/tier/${chosenPackage}`)
      .then((res) => {
        const covAmount = res.data[0].coverage_amount.$numberDecimal;
        const covPrice = res.data[0].price.$numberDecimal;
        setCoveragePrice(covPrice);
        setCoverageAmount(covAmount);
        setFormData(() => ({
          ...formData,
          tier: chosenPackage,
          coverage_amount: coverageAmount,
          price: coveragePrice,
        }));
        packageNameChecker(chosenPackage);
        setPackageData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (formStep === 6) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: checkmark,
      });
    }
  }, [formStep]);
  const handleNewPurchase = async () => {
    try {
      await emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            to_name: formData.fullname,
            user_name: formData.user_name,
            user_password: randPassword.password,
            package_name: packageName,
            package_coverage: coverageAmount,
            package_startdate: startDate,
            package_expdate: endDate,
            package_price: coveragePrice,
            user_email: formData.email,
            reply_to: "influrancethailand@gmail.com",
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log("Email JS >>> ", result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      // new purchase
      await axios.post("http://localhost:3001/api/purchases/purchase", {
        fullname: formData.fullname,
        username: formData.user_name,
        password: randPassword.password,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        social_media_handle: formData.social_media_handle,
        platform: formData.platform,
        income: formData.income,
        tier: formData.tier,
        price: coveragePrice,
        coverage_amount: coverageAmount,
      });

      e.target.reset();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) {
    return null;
  }

  const mapPackage = packageData.map((item, i) => {
    return (
      <motion.div
        key={i}
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
            src="./purchase.png"
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
              <p className={"primaryText"} style={{ fontSize: "36px" }}>
                Registration and Purchase
              </p>
              <div className={style.textSeparator}></div>
              <p className={"secondaryText"} id={style.welcomeMsg}>
                Please fill out the form and carefully check your information
              </p>
            </motion.div>
            <motion.div
              variants={fadeIn("up", "tween", 0.5, 1)}
              className={style.loginForm}
            >
              <form onSubmit={handleNewPurchase}>
                {/* package details */}
                {formStep === 1 && (
                  <motion.section
                    initial={{ opacity: 0, y: "50%" }}
                    animate={{
                      opacity: 1,
                      y: "0",
                      transition: {
                        duration: 0.5,
                        type: "tween",
                      },
                    }}
                  >
                    <div className={style.userDiv}>
                      <FiPackage size={"25px"} className={style.userIcon} />
                      <input
                        type="text"
                        name="selectPackage"
                        value={
                          item.tier === "tier1"
                            ? "Starter Pack - Tier 1"
                            : item.tier === "tier2"
                            ? "Basic Pack - Tier 2"
                            : item.tier === "tier3"
                            ? "Pro Pack - Tier 3"
                            : item.tier === "tier4"
                            ? "Premium Pack - Tier 4"
                            : null
                        }
                        readOnly={true}
                        placeholder={``}
                      ></input>
                    </div>
                    <div className={style.userDiv}>
                      <MdOutlineAccountBalanceWallet
                        size={"25px"}
                        className={style.userIcon}
                      />
                      <input
                        type="text"
                        name="coverage_amount"
                        value={coverageAmount}
                        placeholder=""
                        readOnly={true}
                      ></input>
                    </div>
                    <div className={style.passDiv}>
                      <IoMdPricetag
                        size={"25px"}
                        className={style.passwordIcon}
                      />
                      <input
                        type="text"
                        name="price"
                        value={coveragePrice}
                        placeholder=""
                        readOnly={true}
                      ></input>
                    </div>
                    <button
                      type="button"
                      className={style.loginSubmit}
                      onClick={nextFormStep}
                    >
                      Next
                    </button>
                  </motion.section>
                )}

                {/* fullname username password */}
                {formStep === 2 && (
                  <motion.section
                    initial={{ opacity: 0, y: "50%" }}
                    animate={{
                      opacity: 1,
                      y: "0",
                      transition: {
                        duration: 0.5,
                        type: "tween",
                      },
                    }}
                  >
                    <div className={style.userDiv}>
                      <MdDriveFileRenameOutline
                        size={"25px"}
                        className={style.userIcon}
                      />
                      <input
                        type="text"
                        className={style.inputForm}
                        name="fullname"
                        placeholder={`Fullname`}
                        value={formData.fullname}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className={style.passDiv}>
                      <HiUser size={"25px"} className={style.passwordIcon} />
                      <input
                        type="text"
                        name="user_name"
                        placeholder={`Username`}
                        value={formData.user_name}
                        onChange={handleChange}
                      ></input>
                      {/* hidden password fields  */}
                      <input
                        type="text"
                        hidden={true}
                        readOnly={true}
                        name="user_password"
                        value={randPassword.password}
                      />
                    </div>
                    <div className={style.btnContainer}>
                      <button
                        type="button"
                        onClick={backFormStep}
                        style={{ backgroundColor: "#FF788D" }}
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={nextFormStep}
                        style={{ backgroundColor: "#FFDA88" }}
                      >
                        Next
                      </button>
                    </div>
                  </motion.section>
                )}
                {formStep === 3 && (
                  <motion.section
                    initial={{ opacity: 0, y: "50%" }}
                    animate={{
                      opacity: 1,
                      y: "0",
                      transition: {
                        duration: 0.5,
                        type: "tween",
                      },
                    }}
                  >
                    <div className={style.userDiv}>
                      <BsFillTelephoneFill
                        size={"18px"}
                        className={style.userIcon}
                      />
                      <input
                        type="text"
                        name="phone"
                        placeholder={`0123456789`}
                        value={formData.phone}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className={style.userDiv}>
                      <MdEmail size={"25px"} className={style.userIcon} />
                      <input
                        type="text"
                        name="email"
                        placeholder={`example@gmail.com`}
                        value={formData.email}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className={style.passDiv}>
                      <FaAddressCard
                        size={"25px"}
                        className={style.passwordIcon}
                      />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="101/1 Bangjak Phra Khanong, 10260 Bangkok Thailand"
                      ></input>
                    </div>
                    <div className={style.btnContainer}>
                      <button
                        type="button"
                        onClick={backFormStep}
                        style={{ backgroundColor: "#FF788D" }}
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={nextFormStep}
                        style={{ backgroundColor: "#FFDA88" }}
                      >
                        Next
                      </button>
                    </div>
                  </motion.section>
                )}
                {formStep === 4 && (
                  <motion.section
                    initial={{ opacity: 0, y: "50%" }}
                    animate={{
                      opacity: 1,
                      y: "0",
                      transition: {
                        duration: 0.5,
                        type: "tween",
                      },
                    }}
                  >
                    <div className={style.userDiv}>
                      <IoShareSocial size={"25px"} className={style.userIcon} />
                      <input
                        type="text"
                        name="social_media_handle"
                        value={formData.social_media_handle}
                        onChange={handleChange}
                        placeholder="e.g. @example"
                      ></input>
                    </div>
                    <div className={style.userDiv}>
                      <IoApps size={"25px"} className={style.userIcon} />
                      <input
                        type="text"
                        name="platform"
                        placeholder={`eg. Instagram, Facebook, TikTok, etc.`}
                        value={formData.platform}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className={style.passDiv}>
                      <FaMoneyBillAlt
                        size={"25px"}
                        className={style.passwordIcon}
                      />
                      <input
                        type="text"
                        name="income"
                        placeholder={`eg. 15000`}
                        value={formData.income}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className={style.btnContainer}>
                      <button
                        type="button"
                        onClick={backFormStep}
                        style={{ backgroundColor: "#FF788D" }}
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={nextFormStep}
                        style={{ backgroundColor: "#FFDA88" }}
                      >
                        Next
                      </button>
                    </div>
                  </motion.section>
                )}
                {formStep === 5 && (
                  <motion.section
                    initial={{ opacity: 0, y: "50%" }}
                    animate={{
                      opacity: 1,
                      y: "0",
                      transition: {
                        duration: 0.5,
                        type: "tween",
                      },
                    }}
                  >
                    <div className={style.userDiv}>
                      <AiFillCreditCard
                        size={"25px"}
                        className={style.userIcon}
                      />
                      <input
                        type="text"
                        name="cardnumber"
                        placeholder="0000 0000 0000 0000"
                      ></input>
                    </div>
                    <div className={style.userDiv}>
                      <TbCalendarTime
                        size={"25px"}
                        className={style.userIcon}
                      />
                      <input
                        type="text"
                        name="card_exp"
                        placeholder="MM / YY"
                      ></input>
                    </div>
                    <div className={style.passDiv}>
                      <MdPassword
                        size={"25px"}
                        className={style.passwordIcon}
                      />
                      <input
                        type="password"
                        name="cvc"
                        placeholder="CVC"
                      ></input>
                    </div>
                    <div className={style.btnContainer}>
                      <button
                        type="button"
                        onClick={backFormStep}
                        style={{ backgroundColor: "#FF788D" }}
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        className={style.loginSubmit}
                        onClick={(e) => {
                          e.preventDefault();
                          nextFormStep();
                          handleNewPurchase();
                        }}
                      >
                        Confirm
                      </button>
                    </div>

                    {/* <button type="submit" className={style.loginSubmit}>
                    Login
                  </button> */}
                  </motion.section>
                )}
                {formStep === 6 && (
                  <motion.section
                    initial={{ opacity: 0, y: "50%" }}
                    animate={{
                      opacity: 1,
                      y: "0",
                      transition: {
                        duration: 0.5,
                        type: "tween",
                      },
                    }}
                  >
                    <div className={style.userDiv}>
                      <div className={style.lottieCont} ref={container}></div>
                      <p>Thank you for your purchase</p>
                    </div>
                    <div className={style.userDiv}>
                      <p>An email has been sent to {formData.email}</p>
                    </div>

                    <button
                      type="button"
                      className={style.loginSubmit}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/login");
                      }}
                    >
                      Login
                    </button>
                    {/* <button type="submit" className={style.loginSubmit}>
                    Login
                  </button> */}
                  </motion.section>
                )}
              </form>
            </motion.div>
          </div>
        </section>
      </motion.div>
    );
  });
  return <>{mapPackage}</>;
};

export default Purchase;
