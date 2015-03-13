var connect = require('./connect.js');

describe('Manager test', function(){

	beforeEach(function(){
		browser.get('http://localhost:4711/#/home');
	});

	it('inscription tests', function(){
		//browser.sleep(1000);
		//require('./inscription.js');
		//browser.sleep(1000);
	});

	it('others tests', function(){
		connect.connect();
		//browser.sleep(500);
		//require('./home.js');
		browser.sleep(500);
		require('./event.js');
	});
});