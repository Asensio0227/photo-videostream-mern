const mongoose = require('mongoose');

const VideosSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  videos: {
    type: String,
  }
},
  {
    timestamps: true
  });


module.exports = mongoose.model('STREAM', VideosSchema)