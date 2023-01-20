const express = require("express");
const Influencer = require("../models/Influencer");
const router = express.Router();
const User = require("../models/Influencer");
const Policy = require("../models/Policy");
const Purchase = require("../models/Purchase");
const bcrypt = require("bcrypt");
require("dotenv").config();

const jwt = require("jsonwebtoken");

// Get all
router.get("/", (req, res, next) => {
  Purchase.find((err, purchases) => {
    if (err) return next(err);
    res.json(purchases);
  });
});
// Get one using findOne for experimenting
router.get("/:id", (req, res, next) => {
  Purchase.findOne({ _id: req.params.id })
    .populate("influencer")
    .populate("policy")
    .exec((err, purchase) => {
      if (err) return next(err);
      res.status(200).json(purchase);
    });
});
//

router.post("/purchase", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPwd = await bcrypt.hash(req.body.password, salt);
    const newInfluencer = new Influencer({
      fullname: req.body.fullname,
      username: req.body.username,
      password: hashedPwd,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      social_media_handle: req.body.social_media_handle,
      platform: req.body.platform,
      income: req.body.income,
    });
    const savedInfluencer = await newInfluencer.save();
    const token = jwt.sign(
      {
        username: savedInfluencer.username,
        _id: savedInfluencer._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30 days",
      }
    );

    const policy = await Policy.findOne({ tier: req.body.tier });

    const newPurchase = new Purchase({
      influencer: savedInfluencer._id,
      policy: policy._id,
      coverage_amount: req.body.coverage_amount,
    });
    const savedPurchase = await newPurchase.save();

    res.cookie("jwt", token);
    res.json({ message: "Purchased and Influencer successfully created" });
    // res.status(201).json({
    //   message: "Purchase successfully created.",
    //   purchase: savedPurchase,
    // });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Update purchase
router.put("/:id", (req, res, next) => {
  Purchase.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, purchase) => {
      if (err) return next(err);
      res.status(200).json(purchase);
    }
  );
});

//Delete purchase
router.delete("/:id", (req, res, next) => {
  Purchase.findOneAndRemove({ _id: req.params.id }, (err, purchase) => {
    if (err) return next(err);
    res.status(200).json(purchase);
  });
});
module.exports = router;
