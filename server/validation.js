const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    //    email:Joi.string().min(5).max(50).required(),
    password: Joi.string().min(6).max(255).required(),
    name: Joi.string().min(1).max(50).required(),
    contact: Joi.string().min(1).max(50).required(),
    sex: Joi.string().required().valid("男性", "女性"),
    role: Joi.string().required().valid("玩家", "主持人"),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

const larpEventValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    type: Joi.string().min(0).max(50),
    time: Joi.string().min(1).max(50).required(),
    place: Joi.string().min(1).max(50).required(),
    price: Joi.number().min(0).max(9999),
    //  gamemaster: Joi.any(),
    //  player:Joi.any(),
    male: Joi.number().min(0).max(50),
    female: Joi.number().min(0).max(50),
    contact: Joi.string().min(1).max(50).required(),
    note: Joi.string().min(0).max(9999),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.larpEventValidation = larpEventValidation;
