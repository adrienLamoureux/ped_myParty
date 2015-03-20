var connect = require('./connect.js');

describe('Manager test', function(){

	beforeEach(function(){
		browser.get('http://localhost:5000/#/');
	});

	it('inscription tests', function(){
		//browser.sleep(500);
		//require('./inscription.js');
	});

	it('others tests', function(){
		browser.sleep(500);
		connect.connect();
		//browser.sleep(500);
		//require('./home.js');
		//browser.sleep(500);
		//require('./event.js');
		//browser.sleep(500);
		//require('./basket.js');
		//browser.sleep(500);
		//require('./user.js');
		//browser.sleep(500);
		//require('./commands.js');
	});

	afterEach(function(){
		browser.get('http://localhost:5000/#/');
	});
});