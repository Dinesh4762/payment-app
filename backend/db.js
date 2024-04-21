const mongoose = require("mongoose");
  mongoose.connect(
  "mongodb+srv://dineshkumar62:HtFyOeTx7mp1OCBc@cluster0.jxvmey7.mongodb.net/Paytm"
);

const User = mongoose.model("Users", {
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const Account = mongoose.model("Account", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required:true
  }
});

module.exports = { User,Account}