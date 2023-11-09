
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skill = new Schema({
    accuracy:String ,
    category:String,
    cname: String, 
    ename: String, 
    id: Number, 
    jname: String, 
    power: Number, 
    pp: Number, 
    type: String
});

const Skill = mongoose.model('Skill',skill);

module.exports = Skill ;