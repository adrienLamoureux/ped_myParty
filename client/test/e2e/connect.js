var connect = function(){
	browser.get('http://localhost:4711/#/login');
	var login = browser.findElement(by.name('login'));
	var password = browser.findElement(by.name('password'));
	login.sendKeys("vergil1534@gmail.com");
	password.sendKeys("password");
	var loginBtn = browser.findElement(by.buttonText('Login'));
	loginBtn.click();
	browser.sleep(3000);
	browser.get('http://localhost:4711/#/home');
	browser.sleep(500);
};

module.exports.connect = connect;