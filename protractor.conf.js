var serverPort = require('./config.js').serverPort;
var url = 'http://localhost:'+serverPort+'/';

exports.config = {
	allScriptsTimeout: 110000,

	specs: [
		'server/test/unit/mongo/testMongo.js',
		'client/test/e2e/**/manager.js'
	],

	capabilities: {
		'browserName': 'chrome',
		'count': 1
	},

	baseUrl: url,

	frameworks: ['mocha', 'jasmine'],

	jasmineNodeOpts: {
		isVerbose: true,
		showColors: true,
		includeStackTrace: true,
		defaultTimeoutInterval: 60000
	},
	resultJsonOutputFile: './outputTest.txt'
};

