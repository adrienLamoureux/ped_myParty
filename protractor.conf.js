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

  //After each instance
  onCleanUp: function(exitCode) {

  },
  //After all instance
  afterLaunch: function() {

  },

  resultJsonOutputFile: './outputTest.txt'
};

