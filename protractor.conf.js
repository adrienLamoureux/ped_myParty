var nbTest = 0;
var success = 0;

exports.config = {
  allScriptsTimeout: 110000,

  specs: [
    'server/test/unit/mongo/testMongo.js',
    'client/test/e2e/**/manager.js'
  ],

  capabilities: {
    'browserName': 'chrome',
    'count': 5
  },

  baseUrl: 'http://localhost:4711/',

  frameworks: ['mocha', 'jasmine'],

  jasmineNodeOpts: {
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 10000
  },

  resultJsonOutputFile: './outputTest.txt'
};

