const postmodel = require("../model/posts.model");
const likemodel = require("../model/like.model");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const ImageKit = require("@imagekit/nodejs");

const { toFile } = require("@imagekit/nodejs");
const { post } = require("../routes/posts.routes");
const { promises } = require("dns");

const upload = multer({ storage: multer.memoryStorage() });

const client = new ImageKit({
  privateKey: process.env.PRIVATE_KEY,
});

const postController = async (req, res) => {
  if (!req.file) {
    return res.status(404).josn({
      message: "image required",
    });
  }

  if (!req.body.caption) {
    return res.status(404).josn({
      message: "caption required",
    });
  }

  const file = await client.files.upload({
    file: await toFile(req.file.buffer, "file"),
    fileName: "test",
    folder: "user-post-image",
  });

  const post = await postmodel.create({
    caption: req.body.caption,
    user: decoded.id,
    ImageUrl: file.url,
  });

  res.status(201).json({
    message: "post created sucessfully",
    post: post,
  });
};

const getPostsController = async (req, res) => {
  const userId = req.user.id;

  const posts = await postmodel.find({
    user: userId,
  });

  res.status(200).json({
    message: "all posts",
    posts: posts,
  });
};

const getPostDetailsController = async (req, res) => {
  const userId = req.user.id;

  const postId = req.params.id;

  const post = await postmodel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }
  const authorizedPost = post.user.toString() === userId;
  if (!authorizedPost) {
    res.status(404).json({
      messsage: "unauthorized user!",
    });
  }

  res.status(200).json({
    message: "post details",
    post: post,
  });
};

const postLikeController = async (req, res) => {
  const username = req.user.username;
  const postId = req.params.postId;

  const isPostExist = postmodel.findById(postId);

  if (!isPostExist) {
    return res.status(409).json({
      message: "post does not exist",
    });
  }

  const isAlreadyLiked = await likemodel.findOne({
    post: postId,
    user: username,
  });

  if (isAlreadyLiked) {
    return res.status(409).json({
      message: "you already liked this post",
    });
  }

  const likerecode = await likemodel.create({
    post: postId,
    user: username,
  });
  res.status(200).json({
    message: "you like this post",
    like: likerecode,
  });
};

const getfeedController=async(req,res)=>{
  const user=req.user
  const posts=await Promise.all((await postmodel.find({}).populate("user").lean())
  .map(async(post)=>{
    const isLiked=await likemodel.findOne({
      user:user.username,
      post:post._id
    })
    post.isLiked=Boolean(isLiked)
    return post
  })
)
res.status(200).json({
  posts
})
}

module.exports = {
  postController,
  getPostsController,
  getPostDetailsController,
  postLikeController,
  getfeedController
};
