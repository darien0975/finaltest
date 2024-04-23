const router = require("express").Router();
const LarpEvent = require("../models/larpevent-model");
const larpEventValidation = require("../validation").larpEventValidation;

router.use((req, res, next) => {
  console.log("正在接受一個req");
  next();
});

//查詢開團
router.get("/", async (req, res) => {
  try {
    let larpFound = await LarpEvent.find({})
      .populate("gamemaster", ["name"])
      .exec();
    return res.send(larpFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//用主持人ID查詢開團
router.get("/gamemaster/:_gamemaster_id", async (req, res) => {
  let { _gamemaster_id } = req.params;
  let larpFound = await LarpEvent.find({ gamemaster: _gamemaster_id })
    .populate("gamemaster", ["name"])
    .exec();
  return res.send(larpFound);
});

//用玩家ID找尋參加的團
router.get("/player/:_player_id", async (req, res) => {
  let { _player_id } = req.params;
  if (req.user.sex == "男性") {
    let larpFound = await LarpEvent.find({ maleplayer: _player_id })
      .populate("gamemaster", ["name"])
      .exec();
    return res.send(larpFound);
  } else if (req.user.sex == "女性") {
    let larpFound = await LarpEvent.find({ femaleplayer: _player_id })
      .populate("gamemaster", ["name"])
      .exec();
    return res.send(larpFound);
  }
});

// 用劇本名稱查詢開團
router.get("/findByName/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let regex = new RegExp(name, "i");
    let larpFound = await LarpEvent.find({ name: { $regex: regex } })
      .populate("gamemaster", ["name"])
      .exec();
    return res.send(larpFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//用劇本ID查詢開團
router.get("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let larpFound = await LarpEvent.findOne({ _id })
      .populate("gamemaster", ["name"])
      .exec();
    return res.send(larpFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//新增開團
router.post("/", async (req, res) => {
  let { error } = larpEventValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.user.isPlayer()) {
    return res.status(400).send("只有主持人才能發布開團資訊");
  }

  let { name, type, time, place, price, male, female, contact, note } =
    req.body;
  try {
    let newLarpEvent = new LarpEvent({
      name,
      type,
      time,
      place,
      price,
      gamemaster: req.user._id,
      male,
      female,
      contact,
      note,
    });
    let savedLarpEvent = await newLarpEvent.save();
    return res.send({
      msg: "開團資訊已發布成功",
      savedLarpEvent,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法開團");
  }
});

//透過ID參團
router.post("/join/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let larp = await LarpEvent.findOne({ _id }).exec();
    if (req.user.sex == "男性") {
      larp.maleplayer.push(req.user._id);
    } else if (req.user.sex == "女性") {
      larp.femaleplayer.push(req.user._id);
    }
    await larp.save();
    return res.send("報名成功");
  } catch (e) {
    return res.send(e);
  }
});

//更改開團
router.patch("/:_id", async (req, res) => {
  let { error } = larpEventValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  try {
    let larpFound = await LarpEvent.findOne({ _id });
    if (!larpFound) {
      return res.status(400).send("開團資訊不存在");
    }

    if (larpFound.gamemaster.equals(req.user._id)) {
      let updateLarp = await LarpEvent.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      return res.send({
        message: "劇本團已被更新成功",
        updateLarp,
      });
    } else {
      return res.status(403).send("您無權編輯此開團資訊");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

//刪除開團
router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;

  try {
    let larpFound = await LarpEvent.findOne({ _id });
    if (!larpFound) {
      return res.status(400).send("開團資訊不存在");
    }
    if (larpFound.gamemaster.equals(req.user._id)) {
      await LarpEvent.deleteOne({ _id });
      return res.send("此團已被刪除");
    } else {
      return res.status(403).send("您無權刪除此開團資訊");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
