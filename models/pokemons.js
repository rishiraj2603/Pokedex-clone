// Module dependencies.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemon = new Schema({
  base: {
    Attack: Number,
    Defense: Number,
    HP: Number,
    SpAtk: Number,
    SpDef: Number,
    Speed: Number,
  },
  cname: String,
  ename: String,
  id: Number,
  jname: String,
  image: String,
  skills: {
    egg: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
    level_up: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
    tm: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
    transfer: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
    tutor: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  },
  type: [{ type: Schema.Types.ObjectId, ref: "Type" }],
});

let Pokemon = mongoose.model("Pokemon", pokemon);

module.exports = Pokemon;
