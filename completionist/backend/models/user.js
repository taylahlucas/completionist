const Joi = require('joi');

const isActiveSchema = Joi.object().keys({
  id: Joi.string().required(),
  isActive: Joi.boolean().required()
});

const generalSettingsSchema = Joi.object().keys({
  section: Joi.array().items(isActiveSchema).required(),
  categories: Joi.array().items(isActiveSchema).required(),
  dlc: Joi.array().items(isActiveSchema).required(),
});

const gameSchema = () => Joi.object().keys({
  appId: Joi.number().required(),
  isActive: Joi.boolean().required(),
  quests: Joi.array().items(isActiveSchema).required(),
  collectables: Joi.array().items(isActiveSchema).required(),
  miscellaneous: Joi.array().items(isActiveSchema).required(),
  locations: Joi.array().items(isActiveSchema).required(),
  settingsConfig: Joi.object().keys({
		general: Joi.array().items(generalSettingsSchema).required(),
		dlc: Joi.array().items(isActiveSchema).required()
	}).required()
});

const userSchema = Joi.object().keys({
  userId: Joi.string().required(),
  steamId: Joi.string(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
	googleId: Joi.string(),
  pw: Joi.string(),
  signup: Joi.object().keys({
    verification: Joi.boolean().required(),
    setUsername: Joi.boolean().required(),
    selectGame: Joi.boolean().required()
  }).required(),
  settings: Joi.object().keys({
    lang: Joi.string().default('en').required(),
    configs: Joi.array().items(isActiveSchema).required()
  }).required(),
  gameData: Joi.array().items(
    Joi.object().keys({
      value: gameSchema().required()
    })
  ).required()
});

module.exports = userSchema;
