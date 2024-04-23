const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").user;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("正在接收auth...");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("成功連結...");
});

router.post("/register", async (req, res) => {
  //確認合乎規範
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //確認名稱重複
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) return res.status(400).send("此帳號名稱已存在");

  //製作新用戶
  let { username, email, name, password, contact, sex, role } = req.body;
  let newUser = new User({
    username,
    email,
    name,
    contact,
    password,
    sex,
    role,
  });

  try {
    let savedUser = await newUser.save();
    return res.send({
      msg: "儲存成功",
      savedUser,
    });
  } catch (e) {
    console.error("Error during user save:", e);
    return res.status(500).send("儲存失敗");
  }
});

router.post("/login", async (req, res) => {
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const foundUser = await User.findOne({ username: req.body.username });
  if (!foundUser) return res.status(401).send("找不到用戶");

  foundUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) return res.status(500).send(err);

    if (isMatch) {
      //製作jwt
      const tokenObject = { _id: foundUser._id, username: foundUser.username };
      console.log("Token Object:", tokenObject); // 加入這行 log
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);

      return res.send({
        message: "成功登入",
        token: "JWT " + token,
        user: foundUser,
      });
    } else {
      return res.status(401).send("密碼錯誤");
    }
  });
});

module.exports = router;
