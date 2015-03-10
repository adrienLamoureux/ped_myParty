describe('Inscription' , function () {

	beforeEach(function(){
		browser.get('http://localhost:4711/#/home');
	});

	it('inscription of a new user', function(){ // Verify route redirection
		browser.get('http://localhost:4711/#/signup');
		var first_name = browser.findElement(by.name('first_name'));
		expect(first_name.isDisplayed()).toBe(true);
		var login = browser.findElement(by.name('login'));
		expect(login.isDisplayed()).toBe(true);
		var password = browser.findElement(by.name('password'));
		expect(password.isDisplayed()).toBe(true);
		//var create = 

	});
});