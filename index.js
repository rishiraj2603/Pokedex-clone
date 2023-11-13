require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const app = express();
const MONGO_DB_URL= process.env.MONGO_DB_URL || 'mongodb://localhost/pokedex'
const PORT = process.env.port || 3000;


app.engine('ejs',ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, "/Pokedex-Data/images/img")));



app.use(bodyParser.json());
app.use(bodyParser.text());

const router = require('./routes/router');
app.use(router);
mongoose.connect(MONGO_DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true   });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log(`Database connected!`);
});

app.listen(PORT, function () {
  console.log('App listening at port ', PORT);
});