const express = require("express");
const z = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware");
const router = express.Router();

router.get("/me", authMiddleware, async(req, res) => {
  const user = await User.findOne({ _id: req.userId })
  res.status(200).json({
    firstName: user.firstName,
    authenticated: true,
  });
});
router.post("/signup", async (req, res) => {
  const inputSchema = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
  });
  console.log(req.body);
  const response = inputSchema.safeParse(req.body);
  if (!response.success) {
    return res.status(411).json({ msg: "invalid Inputs" });
  }
  // finding user
  const userExists = await User.findOne({
    username: req.body.username,
  });
  if (userExists) {
    return res.status(411).json({
      msg: "username exists",
    });
  }
  try {
    const user = await User.create({
      username: req.body.username,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      password: req.body.password,
    });

    await Account.create({
      userId: user._id,
      balance: 1 + Math.floor(Math.random() * 10000),
    });
    // console.log(user)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      msg: "user created successfully!",
      token: token,
    });
  } catch (error) {
    res.status(411).json({
      msg: error,
    });
  }
});
router.post("/signin", async (req, res) => {
  // inputs check
  const inputSchema = z.object({
    username: z.string().email(),
    password: z.string(),
  });
  const { success } = inputSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ msg: "invalid inputs buddy!" });
  }
  //  username check
  const userCheck = await User.findOne({
    username: req.body.username,
  });
  if (!userCheck) {
    return res.status(411).json({ msg: "signup first!" });
  }
  // if username is correct but password is incorrect!
  const passwordCheck = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (!passwordCheck) {
    return res.status(411).json({ msg: "check your password!" });
  }
  console.log(passwordCheck);

  const token = jwt.sign({ userId: passwordCheck._id }, process.env.JWT_SECRET);
  res.status(200).json({ token});
});
router.put("/", authMiddleware, async (req, res) => {
  const inputSchema = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  });
  const { success } = inputSchema.safeParse(req.body);
  if (!{ success }) {
    return res.status(411).json({ msg: "Invalid Inputs!" });
  }
   const updated = await User.updateOne(
    {
      _id: req.userId,
    },
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ msg: "profile updated!",updated });
});
router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  // console.log(filter);
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  const filteredUsers = users.filter((user) => user._id != req.userId);

  res.json({
    length: filteredUsers.length,
    user: filteredUsers.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});
module.exports = router;
