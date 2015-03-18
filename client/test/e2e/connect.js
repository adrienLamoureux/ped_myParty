var connect = function(){
	browser.get('http://localhost:5000/#/login');
	var login = browser.findElement(by.name('login'));
	var password = browser.findElement(by.name('password'));
	login.sendKeys("satoshi1534@gmail.com");
	password.sendKeys("password");
	var loginBtn = browser.findElement(by.buttonText('Connecter'));
	loginBtn.click();
	browser.sleep(3000);
	browser.get('http://localhost:5000/#/home');
	browser.sleep(500);
};

module.exports.connect = connect;