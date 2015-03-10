var connect = require('./connect.js');

describe('Manager test', function(){

	beforeEach(function(){
		browser.get('http://localhost:4711/#/home');
	});

	it('inscription tests', function(){
		require('./inscription.js');
	});

	it('others tests', function(){
		connect.connect();
		require('./home.js');
		require('./event.js');
	});
});