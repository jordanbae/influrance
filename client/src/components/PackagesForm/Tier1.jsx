import React from "react";
import style from "./Forms.module.scss";
import Backdrop from "../Backdrop/Backdrop";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Tier1 = ({ chosenPackage }) => {
  const [packageData, setPackageData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [coverageAmount, setCoverageAmount] = useState(null);
  const [coveragePrice, setCoveragePrice] = useState(null);
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
  useEffect(() => {
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
    try {
      // new purchase
      await axios.post("http://localhost:3001/api/purchases/purchase", {
        fullname: formData.fullname,
        username: formData.username,
        password: formData.password,
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
    return null;
  }
  const mapPackage = packageData.map((item) => {
    return (
      <form className={style.form} onSubmit={handleNewPurchase}>
        <label style={{ color: "white" }}>Package</label>
        <select name="selectPackage" id="selectPackage" disabled>
          <option value={item.tier}>
            {item.tier === "tier1" ? "Starter Pack - Tier 1" : null}
          </option>
        </select>
        <label style={{ color: "white" }}>Coverage Amount</label>
        <input
          className={style.formInput}
          type="text"
          name="coverage_amount"
          value={coverageAmount}
          placeholder={`${item.coverage_amount.$numberDecimal} Baht`}
          readOnly={true}
        ></input>
        <label style={{ color: "white" }}>Price</label>
        <input
          className={style.formInput}
          type="text"
          name="price"
          value={coveragePrice}
          placeholder={`${coveragePrice} Baht / Year`}
          readOnly={true}
        ></input>
        <label style={{ color: "white" }}>Fullname</label>
        <input
          className={style.formInput}
          type="text"
          name="fullname"
          value={formData.fullname}
          placeholder={`Fullname`}
          onChange={handleChange}
        ></input>
        <label style={{ color: "white" }}>Username</label>
        <input
          className={style.formInput}
          type="text"
          name="username"
          value={formData.username}
          placeholder={`Username`}
          onChange={handleChange}
        ></input>
        <label style={{ color: "white" }}>Password</label>
        <input
          className={style.formInput}
          type="password"
          name="password"
          value={formData.password}
          placeholder={`Password`}
          onChange={handleChange}
        ></input>
        <label style={{ color: "white" }}>Phone</label>
        <input
          className={style.formInput}
          type="text"
          name="phone"
          value={formData.phone}
          placeholder={`Phone`}
          onChange={handleChange}
        ></input>
        <label style={{ color: "white" }}>Email</label>
        <input
          className={style.formInput}
          type="text"
          name="email"
          value={formData.email}
          placeholder={`email`}
          onChange={handleChange}
        ></input>
        <label style={{ color: "white" }}>Address</label>
        <input
          className={style.formInput}
          type="text"
          name="address"
          value={formData.address}
          placeholder={`address`}
          onChange={handleChange}
        ></input>
        <label style={{ color: "white" }}>Social Media Handle</label>
        <input
          className={style.formInput}
          type="text"
          name="social_media_handle"
          value={formData.social_media_handle}
          placeholder={`Social Media Handle`}
          onChange={handleChange}
        ></input>
        <label style={{ color: "white" }}>Platform</label>
        <input
          className={style.formInput}
          type="text"
          name="platform"
          value={formData.platform}
          placeholder={`Platform`}
          onChange={handleChange}
        ></input>
        <label style={{ color: "white" }}>Income</label>
        <input
          className={style.formInput}
          type="text"
          name="income"
          value={formData.income}
          placeholder={`income`}
          onChange={handleChange}
        ></input>
        <button type="submit">Submit</button>
      </form>
    );
  });
  return (
    <Backdrop>
      <div className={style.container}>{mapPackage}</div>
    </Backdrop>
  );
};

export default Tier1;
