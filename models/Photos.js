const mongoose = require('mongoose');

const PhotosSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  images: {
    type: String,
  }
},
  {
    timestamps: true
  });


module.exports = mongoose.model('Photos', PhotosSchema)