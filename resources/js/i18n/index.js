import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const languages = {
    pt: require('./locale/pt.json'),
    en: require('./locale/en.json')
  };
  
const options = {
  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  debug: true,
  initImmediate: false,

  resources: {
    pt: {
        common: languages.pt
    },
    en: {
        common: languages.en,
    },
  },

  fallbackLng: 'en',

  ns: ['common'],

  defaultNS: 'common',

  backend: {
    loadPath: './locale',
  },
  react: {
    wait: true,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default'
  },
};

cookies.set('lang', window.localStorage.i18nextLng, { path: '/' });

i18n
.use(LanguageDetector)
.init(options)

export default i18n;