// Module dependencies.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema definition of Type collection

const skill = new Schema({
  accuracy: Number,
  category: String,
  cname: String,
  ename: String,
  id: Number,
  jname: String,
  power: Number,
  pp: Number,
  type: String,
});

// Define model

let Skill = mongoose.model("Skill", skill);

module.exports = Skill;
