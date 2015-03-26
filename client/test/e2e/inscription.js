describe('Inscription' , function () {

	beforeEach(function(){
		browser.get('http://localhost:5000/#/home');
	});

	it('inscription of a new user', function(){ // Verify route redirection
		browser.get('http://localhost:5000/#/signup');
		var first_name = browser.findElement(by.name('first_name'));
		expect(first_name.isDisplayed()).toBe(true);
		var login = browser.findElement(by.name('login'));
		expect(login.isDisplayed()).toBe(true);
		var password = browser.findElement(by.name('password'));
		expect(password.isDisplayed()).toBe(true);
		var password2 = browser.findElement(by.name('password2'));
		expect(password.isDisplayed()).toBe(true);
		var createBtn = browser.findElement(by.buttonText('Créer'));
		expect(createBtn.isDisplayed()).toBe(true);
		first_name.sendKeys("toto");
		login.sendKeys("testLogin");
		password.sendKeys("password");
		password2.sendKeys("password");
		expect(first_name.getAttribute('value')).toBe('toto');
		expect(login.getAttribute('value')).toBe('testLogin');
		expect(password.getAttribute('value')).toBe('password');
		expect(password2.getAttribute('value')).toBe('password');	
		createBtn.click();
	});

	it('should connect and disconnect as a user', function(){
		browser.get('http://localhost:5000/#/login');
		var login = browser.findElement(by.name('login'));
		expect(login.isDisplayed()).toBe(true);
		var password = browser.findElement(by.name('password'));
		expect(login.isDisplayed()).toBe(true);
		login.sendKeys("vergil1534@gmail.com");
		password.sendKeys("password");
		var loginBtn = browser.findElement(by.buttonText('Connecter'));
		expect(loginBtn.isDisplayed()).toBe(true);
		loginBtn.click();
		browser.sleep(3000);
		browser.get('http://localhost:5000/#/');
		browser.sleep(1000);
		var disconnect = browser.findElement(by.id("bt_disconnect"));
		expect(disconnect.isDisplayed()).toBe(true);
		disconnect.click();
		browser.get('http://localhost:5000/#/login');
	});

	it('should disable and restore the user profil', function(){
		browser.get('http://localhost:5000/#/login');
		var login = browser.findElement(by.name('login'));
		expect(login.isDisplayed()).toBe(true);
		var password = browser.findElement(by.name('password'));
		expect(login.isDisplayed()).toBe(true);
		login.sendKeys("satoshi1534@gmail.com");
		password.sendKeys("password");
		var loginBtn = browser.findElement(by.buttonText('Connecter'));
		expect(loginBtn.isDisplayed()).toBe(true);
		loginBtn.click();
		browser.sleep(3000);
		var bt_account = browser.findElement(by.id("bt_account"));
		expect(bt_account.isDisplayed()).toBe(true);
		bt_account.click();
		var bt_profil = browser.findElement(by.id("bt_profil"));
		expect(bt_profil.isDisplayed()).toBe(true);
		bt_profil.click();
		var btn_disableAccount = browser.findElement(by.id("btn_disableAccount"));
		expect(btn_disableAccount.isDisplayed()).toBe(true);
		btn_disableAccount.click();
		var alertDialog = browser.switchTo().alert();
		alertDialog.accept();
		browser.sleep(1000);
		browser.get('http://localhost:5000/#/login');
		login = browser.findElement(by.name('login'));
		expect(login.isDisplayed()).toBe(true);
		password = browser.findElement(by.name('password'));
		expect(login.isDisplayed()).toBe(true);
		login.sendKeys("satoshi1534@gmail.com");
		password.sendKeys("password");
		loginBtn = browser.findElement(by.buttonText('Connecter'));
		expect(loginBtn.isDisplayed()).toBe(true);
		loginBtn.click();
		browser.sleep(1000);
		var reactivationAccount = browser.findElement(by.buttonText("Réactiver Mon Compte"));
		expect(reactivationAccount.isDisplayed()).toBe(true);
		reactivationAccount.click();
		alertDialog = browser.switchTo().alert();
		alertDialog.accept();
		browser.sleep(1000);
		browser.get('http://localhost:5000/#/login');
	});
});