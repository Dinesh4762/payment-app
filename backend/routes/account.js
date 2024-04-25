const express = require("express");
const mongoose = require("mongoose")
const z = require("zod");
const { Account } = require("../db");
const authMiddleware = require("../middleware");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    res.status(200).json({ balance: account.balance });
  } catch (error) {
    res.status(400).json({ msg: "error fetching balance!" });
  }
});
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  // Fetch the accounts within the transaction
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount || amount <= 0) {
    await session.abortTransaction();
    return res.status(400).json({
      success: false,
      msg: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      success: false,
      msg: "Invalid account",
    });
  }

  // Perform the transfer
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction();
  res.json({
    success: true,
    msg: "Transfer successful",
  });

});
module.exports = router;
