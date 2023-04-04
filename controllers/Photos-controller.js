const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Product = require('../models/Photos');

const createData = async (req, res) => { 
  const posts = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ posts });
};

const getAllData = async (req, res) => {
  const posts = await Product.find({});
  res.status(StatusCodes.OK).send({ posts, numOfPhoto: posts.length });
};

const deleteImages = async (req, res) => {
  const { id: postId } = req.params;
  const post = await Product.findOneAndDelete({ _id: postId });
  
  if (!post) {
    throw new CustomError.BadRequestError('No post with this id');
  }

  res.status(StatusCodes.OK).json({ msg: 'You have removed image from your list' })
};

module.exports = {
  createData,
  getAllData,
  deleteImages
};