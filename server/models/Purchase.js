const mongoose = require("mongoose");
const moment = require("moment");

const PurchaseSchema = new mongoose.Schema({
  influencer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Influencer",
    required: true,
  },
  policy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Policy",
    required: true,
  },
  purchase_date: {
    type: Date,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  coverage_limit: {
    type: Number,
  },
  coverage_spent: {
    type: Number,
  },
  coverage_left: {
    type: Number,
  },
});

PurchaseSchema.pre("save", function (next) {
  this.purchase_date = new Date();
  this.start_date = new Date(this.purchase_date);
  this.start_date.setDate(this.start_date.getDate() + 1);
  this.end_date = new Date(this.start_date);
  this.end_date.setFullYear(this.end_date.getFullYear() + 1);
  next();
});
module.exports = mongoose.model("Purchase", PurchaseSchema);
