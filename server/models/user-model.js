const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 50,
  },
  // email:{
  //     type:String,
  // },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  contact: {
    type: String,
    require: true,
  },
  sex: {
    type: String,
    enum: ["男性", "女性"],
  },
  role: {
    type: String,
    enum: ["玩家", "主持人"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.isPlayer = function () {
  return this.role == "玩家";
};

userSchema.methods.isGamemaster = function () {
  return this.role == "主持人";
};

userSchema.methods.isMale = function () {
  return this.sex === "男性";
};

userSchema.methods.isFemale = function () {
  return this.sex === "女性";
};

userSchema.methods.comparePassword = async function (password, cb) {
  console.log("Stored password:", this.password);
  console.log("Provided password:", password);
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    console.log("Password comparison result:", result);
    return cb(null, result);
  } catch (e) {
    return cb(e, result);
  }
};

//若是新用戶或更改密碼,則將密碼雜湊處理
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    try {
      const hashValue = await bcrypt.hash(this.password, 10);
      console.log("Provided password:", this.password);
      console.log("Hashed password:", hashValue);
      this.password = hashValue; // 將雜湊後的密碼存回 this.password
      console.log("Updated password:", this.password);
    } catch (error) {
      console.error("Error during password hashing:", error);
      throw error;
    }
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
