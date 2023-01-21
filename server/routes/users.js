var express = require("express");
var router = express.Router();
const Influencer = require("../models/Influencer");
const Purchase = require("../models/Purchase");
const Policy = require("../models/Policy");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:username", async (req, res, next) => {
  try {
    let userData = [];
    const influencer = await Influencer.findOne({
      username: req.params.username,
    });
    userData.push(influencer);
    const purchase = await Purchase.findOne({ influencer: influencer._id });
    userData.push(purchase);
    const policy_details = await Policy.findOne({ _id: purchase.policy });
    userData.push(policy_details);
    res.send({
      userData: userData,
    });
  } catch {}
});
module.exports = router;
