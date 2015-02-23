exports.config = {
  allScriptsTimeout: 110000,

  specs: [
    'server/test/unit/mongo/testMongo.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:4711/',

  framework: 'mocha'
};
