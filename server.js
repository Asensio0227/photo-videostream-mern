require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const fileUploader = require('express-fileupload');
const cors = require('cors');
const xss = require('xss-clean');
const morgan = require('morgan');
const helmet = require('helmet');
//db
const connectDB = require('./db/connect');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandleMiddleware = require('./middleware/error-handle');

// routes
const fileRoute = require('./routes/fileRoute.js.js');

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}


const videoFileMap = {
  "james": "videos/james.mp4",
  "nf": "videos/nf.mp4",
  "sasha": "videos/sasha.mp4",
  "lukas": "videos/lukas.mp4",
  "shady45":"videos/mockingbird.mp4"
};

app.get('/videos/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = videoFileMap[fileName];

  if (!filePath) {
    return res.status(404).send(`NO file path matches this ${filePath} path...`);
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": 'bytes',
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    }
    res.writeHead(200, head);
    fs.createReadStream(fileSize).pipe(res);
  }
})

app.use(express.static(path.join(__dirname, "/public")));

app.set('trust-proxy', 1);
app.use("/video",express.static(path.join(__dirname, './public/video')))
app.use("/images",express.static(path.join(__dirname, './public/images')))
app.use(express.json());
app.use(fileUploader({
  useTempFiles:true
}));
// app.use(fileUploader());
app.use(helmet());
app.use(xss());
app.use(cors());

// route
app.use('/api/v1/uploads', fileRoute);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname,"./public","index.html"))
})
// middleware
app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

const port = process.env.PORT || 5000;


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    })
  } catch (error) {
    console.log(error);
  }
}

start();