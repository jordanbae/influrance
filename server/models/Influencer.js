const mongoose = require("mongoose");
const InfluencerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  social_media_handle: {
    type: String,
    unique: true,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Influencer", InfluencerSchema);
