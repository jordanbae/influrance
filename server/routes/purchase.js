const express = require("express");
const router = express.Router();
const User = require("../models/Influencer");
const Policy = require("../models/Policy");
const Purchase = require("../models/Purchase");

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
// Create purchase
router.post("/", (req, res, next) => {
  const newPurchase = new Purchase({
    influencer: req.body.influencer,
    policy: req.body.policy,
    purchase_date: req.body.purchase_date,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    coverage_limit: req.body.coverage_limit,
    coverage_spent: req.body.coverage_spent,
    coverage_left: req.body.coverage_left,
  });
  newPurchase.save((err, purchase) => {
    if (err) return next(err);
    res.status(200).json(purchase);
  });
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
