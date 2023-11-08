require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const path = require('path')
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const imagePath = path.join(__dirname + "Pokemon-Data/images/img")

  imagePath.map(item=> {
    
  })