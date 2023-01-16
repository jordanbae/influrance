const mongoose = require("mongoose");
const InfluencerSchema = new mongoose.Schema({
  fullname: String,
  username: String,
  password: String,
  phone: String,
  email: String,
  address: String,
  social_media_handle: String,
  platform: String,
  income: Number,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Influencer", InfluencerSchema);
