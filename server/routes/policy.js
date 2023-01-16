const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Policy = require("../models/Policy");

// Get all
router.get("/", (req, res, next) => {
  Policy.find((err, policies) => {
    if (err) return next(err);
    res.json(policies);
  });
});

//Get by id
router.get("/:id", (req, res, next) => {
  Policy.findById(req.params.id, (err, policy) => {
    if (err) return next(err);
    res.json(policy);
  });
});

//Add Post method, using '/' since I'm not intended to create '/new' route
router.post("/", (req, res, next) => {
  Policy.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

//Update
router.put("/:id", (req, res, next) => {
  Policy.findByIdAndUpdate(req.params.id, req.body, (err, policy) => {
    if (err) return next(err);
    res.json(policy);
  });
});

//Delete
router.delete("/:id", (req, res, next) => {
  Policy.findByIdAndDelete(req.params.id, (err, policy) => {
    if (err) return next(err);
    res.json(policy);
  });
});
module.exports = router;
