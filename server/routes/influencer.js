const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Influencer = require("../models/Influencer");

// Get all
router.get("/", (req, res, next) => {
  Influencer.find((err, influencers) => {
    if (err) return next(err);
    res.json(influencers);
  });
});

//Get by id
router.get("/:id", (req, res, next) => {
  Influencer.findById(req.params.id, (err, influencer) => {
    if (err) return next(err);
    res.json(influencer);
  });
});

//Add Post method, using '/' since I'm not intended to create '/new' route
router.post("/", (req, res, next) => {
  Influencer.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

//Update influencer
router.put("/:id", (req, res, next) => {
  Influencer.findByIdAndUpdate(req.params.id, req.body, (err, influencer) => {
    if (err) return next(err);
    res.json(influencer);
  });
});

//Delete influencer
router.delete("/:id", (req, res, next) => {
  Influencer.findByIdAndDelete(req.params.id, (err, influencer) => {
    if (err) return next(err);
    res.json(influencer);
  });
});
module.exports = router;
