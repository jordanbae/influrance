const mongoose = require("mongoose");
const PolicySchema = new mongoose.Schema({
  tier: String,
  coverage_amount: mongoose.Schema.Types.Decimal128,
  price: mongoose.Schema.Types.Decimal128,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Policy", PolicySchema);
