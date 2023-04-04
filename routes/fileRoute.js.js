const express = require('express');
const router = express.Router();

const {
  photosUploader,
  videoUploader,
} = require('../controllers/file-uploader');

const {
  createData,
  getAllData,
  deleteImages
} = require('../controllers/Photos-controller');


const  {
  createVideo,
  getAllVideos,
  deleteVideo
} = require('../controllers/Videos-controller');

router.get('/posts', getAllData);
router.post('/posts', createData);
router.post('/photo', photosUploader);
router.delete('/posts/:id', deleteImages);

router.post('/video', videoUploader);
router.post('/timeline', createVideo);
router.get('/timeline', getAllVideos);
router.delete('/timeline/:id', deleteVideo);


module.exports = router;

