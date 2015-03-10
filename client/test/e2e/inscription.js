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
		var createBtn = browser.findElement(by.buttonText('Créer'));
		expect(createBtn.isDisplayed()).toBe(true);
		first_name.sendKeys("toto");
		login.sendKeys("testLogin");
		password.sendKeys("password");
		expect(first_name.getAttribute('value')).toBe('toto');
		expect(login.getAttribute('value')).toBe('testLogin');
		expect(password.getAttribute('value')).toBe('password');
		createBtn.click();
	});
});