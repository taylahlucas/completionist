const Joi = require('joi');

const activeGamesSchema = Joi.object().keys({
  id: Joi.string().required(),
  isActive: Joi.boolean().required()
});

const generalSettingsSchema = Joi.object().keys({
  section: Joi.array().items(activeGamesSchema).required(),
  categories: Joi.array().items(activeGamesSchema).required(),
  dlc: Joi.array().items(activeGamesSchema).required(),
});

const gameSchema = () => Joi.object().keys({
  appId: Joi.number().required(),
  quests: Joi.array().items(activeGamesSchema).required(),
  collectables: Joi.array().items(activeGamesSchema).required(),
  miscellaneous: Joi.array().items(activeGamesSchema).required(),
  locations: Joi.array().items(activeGamesSchema).required(),
  settingsConfig: Joi.object().keys({
		general: Joi.array().items(generalSettingsSchema).required(),
		dlc: Joi.array().items(activeGamesSchema).required()
	}).required()
});

const dataSchema = Joi.object().keys({
	fallout3: gameSchema,
	fallout4: gameSchema,
	skyrim: gameSchema,
	witcher3: gameSchema,
});

const userSchema = Joi.object().keys({
  userId: Joi.string().required(),
  steamId: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
	googleId: Joi.string(),
  password: Joi.string(),
  signup: Joi.object().keys({
    verification: Joi.boolean().required(),
    setUsername: Joi.boolean().required(),
    selectGame: Joi.boolean().required()
  }).required(),
  activeGames: Joi.array().items(activeGamesSchema).required(),
  settings: Joi.object().keys({
    lang: Joi.string().default('en').required(),
    configs: Joi.array().items(activeGamesSchema).required()
  }).required(),
  data: dataSchema
});

module.exports = userSchema;
