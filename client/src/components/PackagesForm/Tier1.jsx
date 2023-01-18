import React from "react";
import style from "./Forms.module.scss";
import Backdrop from "../Backdrop/Backdrop";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Tier1 = ({ chosenPackage }) => {
  const [packageData, setPackageData] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/policies/tier/${chosenPackage}`)
      .then((res) => {
        console.log(res);
        setPackageData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Backdrop>
      <div className={style.container}>
        <form className={style.form}>
          <label style={{ color: "white" }}>Package</label>
          <select name="selectPackage" id="selectPackage">
            <option value="tier1">Starter Pack - Tier 1</option>
            <option value="tier2">Basic Pack - Tier 2</option>
            <option value="tier3">Pro Pack - Tier 3</option>
            <option value="tier4">Premium Pack - Tier 4</option>
          </select>
          <label style={{ color: "white" }}>Coverage Amount</label>
          <input
            type="text"
            className={style.formInput}
            placeholder={"Coverage Amount"}
          ></input>
          <label style={{ color: "white" }}>Price</label>
          <input
            type="text"
            className={style.formInput}
            placeholder={"Price"}
          ></input>
          <label style={{ color: "white" }}>Social Media Handle</label>
          <input
            type="text"
            className={style.formInput}
            placeholder={"Social Media Handle"}
          ></input>
          <label style={{ color: "white" }}>Fullname</label>
          <input
            type="text"
            className={style.formInput}
            placeholder={"Fullname"}
          ></input>
          <label style={{ color: "white" }}>Username</label>
          <input
            type="text"
            className={style.formInput}
            placeholder={"Username"}
          ></input>
          <label style={{ color: "white" }}>Password</label>
          <input
            type="text"
            className={style.formInput}
            placeholder={"Password"}
          ></input>
          <label style={{ color: "white" }}>Phone</label>
          <input
            type="text"
            className={style.formInput}
            placeholder={"Phone"}
          ></input>
          <label style={{ color: "white" }}>Email</label>
          <input
            type="text"
            className={style.formInput}
            placeholder={"Email"}
          ></input>
          <label style={{ color: "white" }}>Address</label>
          <input
            type="text"
            className={style.formInput}
            placeholder={"Address"}
          ></input>
        </form>
      </div>
    </Backdrop>
  );
};

export default Tier1;
