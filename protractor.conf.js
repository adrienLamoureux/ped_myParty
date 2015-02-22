exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'server/test/unit/mongo/testMongo.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:4711/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
