import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./Purchase.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from "../utils/motion";
import axios from "axios";
import cryptoRandomString from "crypto-random-string";
const Purchase = () => {
  axios.defaults.withCredentials = true;
  const [isVisible, setVisible] = useState(false);
  const [formStep, setFormStep] = useState(1);
  //handling form data and api call
  const [packageData, setPackageData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [coverageAmount, setCoverageAmount] = useState(null);
  const [coveragePrice, setCoveragePrice] = useState(null);
  const [randPassword, setRandPassword] = useState("");

  const location = useLocation();
  console.log("location >>>", location);
  const chosenPackage = location.state;
  console.log("chosenPackage >>>", chosenPackage);
  const [formData, setFormData] = useState({
    //Policies
    tier: null,
    coverage_amount: null,
    price: null,
    //Influencers
    fullname: null,
    username: null,
    password: null,
    phone: null,
    email: null,
    address: null,
    social_media_handle: null,
    platform: null,
    income: null,
  });
  const passwordGenerator = () => {
    const password = cryptoRandomString({
      length: 8,
      characters:
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#%^&*",
    }).toString();

    return { password };
  };
  //handling steps
  const nextFormStep = () => {
    setFormStep((step) => step + 1);
  };
  const backFormStep = () => {
    setFormStep((step) => step - 1);
  };
  useEffect(() => {
    setVisible(true);
    axios
      .get(`http://localhost:3001/api/policies/tier/${chosenPackage}`)
      .then((res) => {
        // console.log(res);
        console.log(res.data[0]);
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
        setPackageData(res.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleNewPurchase = async (e) => {
    e.preventDefault();
    // const randpwd = passwordGenerator();
    // setRandPassword(randpwd.password);
    try {
      const randpwd = passwordGenerator();
      console.log("randpassword in handle new purchase >>> ", randpwd);
      // new purchase
      await axios.post("http://localhost:3001/api/purchases/purchase", {
        fullname: formData.fullname,
        username: formData.username,
        password: randpwd.password,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        social_media_handle: formData.social_media_handle,
        platform: formData.platform,
        income: formData.income,
        tier: formData.tier,
        coverage_amount: formData.coverage_amount,
      });
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
    console.log("package data during loading >>> ", packageData);
    return null;
  }
  console.log("package data after loading >>> ", packageData);

  const mapPackage = packageData.map((item) => {
    return (
      // <div>
      //   <h1>{item.tier}</h1>
      // </div>
      <div className={style.wrapper}>
        <motion.div
          className={`${style.container}`}
          variants={staggerContainer}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.25 }}
        >
          <div className={style.leftContainer}>
            <motion.div
              classname={style.greetCont}
              variants={slideIn("up", "tween", 0.3, 1)}
            >
              {/* <img src="./site_logo.png" alt="logo" /> */}
              <motion.p
                className="primaryText"
                variants={fadeIn("up", "tween", 0.5, 1)}
              >
                Influrance
              </motion.p>
              <motion.p
                className="secondaryText"
                variants={fadeIn("up", "tween", 0.5, 1)}
              >
                Registration and Purchase
              </motion.p>
            </motion.div>
          </div>
          <div className={style.rightContainer}>
            <div className={`innerWidth ${style.formContainer}`}>
              {/* Upper element (header) */}
              <div className={style.upperElement}>
                <motion.div className="primaryText" id="formHeader">
                  Payment and Registration Form {item.tier}
                </motion.div>
              </div>

              {/* Lower element (form inputs) */}
              <div className={style.lowerElement}>
                {/* Package info section */}
                {/* <form onSubmit={handleNewPurchase}> */}
                <form onSubmit={handleNewPurchase}>
                  {formStep === 0 && (
                    <section>
                      <div className={style.inputContainer}>
                        <label className={style.formLabels}>Package</label>
                        <input
                          type="text"
                          className={style.inputForm}
                          name="selectPackage"
                          data-value={item.tier}
                          readOnly={true}
                          placeholder={``}
                        />
                      </div>
                      <div className={style.inputContainer}>
                        <label className={style.formLabels}>
                          Coverage Amount
                        </label>
                        <input
                          type="text"
                          className={style.inputForm}
                          name="coverage_amount"
                          value={coverageAmount}
                          readOnly={true}
                          placeholder={``}
                        />
                      </div>
                      <div className={style.inputContainer}>
                        <label className={style.formLabels}>Price</label>
                        <input
                          type="text"
                          className={style.inputForm}
                          name="price"
                          value={coveragePrice}
                          readOnly={true}
                          placeholder={``}
                        />
                      </div>
                      <button type="button" onClick={backFormStep}>
                        Back
                      </button>
                      <button type="button" onClick={nextFormStep}>
                        Next
                      </button>
                    </section>
                  )}
                  {/* Fullname / Username section */}
                  {formStep === 1 && (
                    <section>
                      <div className={style.inputContainer}>
                        <label className={style.formLabels}>Fullname</label>
                        <input
                          type="text"
                          className={style.inputForm}
                          name="fullname"
                          placeholder={`Jane Doe`}
                          value={formData.fullname}
                          onChange={handleChange}
                        />
                      </div>
                      <div className={style.inputContainer}>
                        <label className={style.formLabels}>Username</label>
                        <input
                          type="text"
                          className={style.inputForm}
                          name="username"
                          placeholder={`janedoe`}
                          value={formData.username}
                          onChange={handleChange}
                        />
                      </div>
                      <button type="button" onClick={backFormStep}>
                        Back
                      </button>
                      <button type="button" onClick={nextFormStep}>
                        Next
                      </button>
                    </section>
                  )}

                  {/* Phone / Email / Address section  */}
                  {formStep === 2 && (
                    <section>
                      <div className={style.inputContainer}>
                        <label className={style.formLabels}>Phone</label>
                        <input
                          type="text"
                          className={style.inputForm}
                          name="phone"
                          placeholder={`0123456789`}
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className={style.inputContainer}>
                        <label className={style.formLabels}>Email</label>
                        <input
                          type="text"
                          className={style.inputForm}
                          name="email"
                          placeholder={`example@gmail.com`}
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className={style.inputContainer}>
                        <label className={style.formLabels}>Address</label>
                        <input
                          type="text"
                          className={style.inputForm}
                          name="address"
                          placeholder={`Address`}
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>
                      <button type="button" onClick={backFormStep}>
                        Back
                      </button>
                      <button type="button" onClick={nextFormStep}>
                        Next
                      </button>
                    </section>
                  )}
                  {/* Social Media / Income section */}
                  {formStep === 3 && (
                    <section>
                      <div className={style.inputContainer}>
                        <label className={style.formLabels}>
                          Social Media Handle
                        </label>
                        <input
                          type="text"
                          className={style.inputForm}
                          name="social_media_handle"
                          placeholder={`eg. @janedoe`}
                          value={formData.social_media_handle}
                          onChange={handleChange}
                        />
                      </div>
                      <div className={style.inputContainer}>
                        <label className={style.formLabels}>Platform</label>
                        <input
                          type="text"
                          className={style.inputForm}
                          name="platform"
                          placeholder={`eg. Instagram, Facebook, TikTok, etc.`}
                          value={formData.platform}
                          onChange={handleChange}
                        />
                      </div>
                      <div className={style.inputContainer}>
                        <label className={style.formLabels}>Income</label>
                        <input
                          type="text"
                          className={style.inputForm}
                          name="income"
                          placeholder={`eg. 15000`}
                          value={formData.income}
                          onChange={handleChange}
                        />
                      </div>
                      <button type="button" onClick={backFormStep}>
                        Back
                      </button>
                      <button type="submit">Confirm</button>
                    </section>
                  )}
                </form>
                {/* </form> */}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  });

  return <>{mapPackage}</>;
};

export default Purchase;
