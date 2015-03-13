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

	it('should connect and disconnect as a user', function(){
		var login = browser.findElement(by.name('login'));
		expect(login.isDisplayed()).toBe(true);
		var password = browser.findElement(by.name('password'));
		expect(login.isDisplayed()).toBe(true);
		login.sendKeys("vergil1534@gmail.com");
		password.sendKeys("password");
		var loginBtn = browser.findElement(by.buttonText('Login'));
		expect(loginBtn.isDisplayed()).toBe(true);
		loginBtn.click();
		browser.sleep(3000);
		browser.get('http://localhost:4711/#/home');
		browser.sleep(1000);
		var disconnect = browser.findElement(by.linkText("Se Déconnecter"));
		expect(disconnect.isDisplayed()).toBe(true);
		disconnect.click();
		browser.get('http://localhost:4711/#/login');
	});
});