const usermodel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const register = async (req, res) => {
  const { username, email, password, bio, profile_image } = req.body;

  const existingUser = await usermodel.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (existingUser) {
    return res.status(409).json({
      message:
        "user is already exist" + existingUser.email == email
          ? "email already exist"
          : "usernae already exist",
    });
  }
  const hashedpassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const user = await usermodel.create({
    username: username,
    email: email,
    password: hashedpassword,
    bio: bio,
    profile_image: profile_image,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "user registered sucessfully",
    data: {
      username: username,
      email: email,
      bio: bio,
      profile_image: profile_image,
    },
  });
};

const login = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await usermodel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (!existingUser) {
    return res.status(401).json({
      message: "invalid email or password",
    });
  }
  const hashedpassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  if (hashedpassword != existingUser.password) {
    return res.status(401).json({
      messsage: "password is incorrect",
    });
  }

  const token = jwt.sign(
    {
      id: existingUser._id,
      username: existingUser.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user login sucessfully",
    data: {
      username: username,
      email: email,
    },
  });
};

module.exports = { register, login };
