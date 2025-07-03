const defaultLang = 'en';
const defaultSettingsConfig = [{ id: 'disabledSections', isActive: true }];

const defaultSettings = {
  lang: defaultLang,
  configs: defaultSettingsConfig,
};

const defaultSignup = {
  verification: true,
  setUsername: false,
  selectGame: false,
};

const createUser = user => {
  return {
    ...user,
    signup: defaultSignup,
    settings: defaultSettings,
  };
};

module.exports = createUser;
