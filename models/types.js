// Module dependencies.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema definition of Type collection

const type = new Schema({
    ename: String,
    jname: String,
    cname: String,
});

// Define model 

let Type = mongoose.model('Type', type);

module.exports = Type;