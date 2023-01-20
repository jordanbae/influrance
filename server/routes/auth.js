const Influencer = require("../models/Influencer");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", function (req, res, next) {
  Influencer.findOne({
    username: req.body.username,
  }).then((foundUser) => {
    if (foundUser) {
      bcrypt.compare(req.body.password, foundUser.password, (err, match) => {
        if (match) {
          const token = jwt.sign(
            {
              username: foundUser.username,
              _id: foundUser._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "30 days",
            }
          );

          res.status(201).json({
            message: token,
          });
        } else {
          return res.sendStatus(400);
        }
      });
    }
  });
});

module.exports = router;
