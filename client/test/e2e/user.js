describe('user view' , function () {

	it('should access to the profil information', function(){
		var bt_account = browser.findElement(by.id("bt_account"));
		expect(bt_account.isDisplayed()).toBe(true);
		bt_account.click();
		var bt_profil = browser.findElement(by.id("bt_profil"));
		expect(bt_profil.isDisplayed()).toBe(true);
		bt_profil.click();
		var userEmail = browser.findElement(by.id("userEmail"));
		expect(userEmail.isDisplayed()).toBe(true);
		var userFirstName = browser.findElement(by.id("userFirstName"));
		expect(userFirstName.isDisplayed()).toBe(true);
		//var userLastName = browser.findElement(by.id("userLastName"));
		//expect(userLastName.isDisplayed()).toBe(true);
		var userDateCreate = browser.findElement(by.id("userDateCreate"));
		expect(userDateCreate.isDisplayed()).toBe(true);
		var userDateLastLogin = browser.findElement(by.id("userDateLastLogin"));
		expect(userDateLastLogin.isDisplayed()).toBe(true);
		var userDateUpdate = browser.findElement(by.id("userDateUpdate"));
		expect(userDateUpdate.isDisplayed()).toBe(true);
		var userGetImage = browser.findElement(by.id("userGetImage"));
		expect(userDateUpdate.isDisplayed()).toBe(true);
		var bt_submit = browser.findElement(by.id("bt_submit"));
		expect(bt_submit.isDisplayed()).toBe(true);
		var btn_disableAccount = browser.findElement(by.id("btn_disableAccount"));
		expect(btn_disableAccount.isDisplayed()).toBe(true);
	});

	it('should modify the user profil', function(){
		var bt_account = browser.findElement(by.id("bt_account"));
		expect(bt_account.isDisplayed()).toBe(true);
		bt_account.click();
		var bt_profil = browser.findElement(by.id("bt_profil"));
		expect(bt_profil.isDisplayed()).toBe(true);
		bt_profil.click();
		var userFirstName = browser.findElement(by.id("userFirstName"));
		expect(userFirstName.isDisplayed()).toBe(true);
		var userClickOnFirstName = browser.findElement(by.id("userClickOnFirstName"));
		expect(userClickOnFirstName.isDisplayed()).toBe(true);
		userClickOnFirstName.click();
		browser.driver.switchTo().activeElement();
		browser.sleep(500);
		var userNewFirstName = browser.findElement(by.id("userNewFirstName"));
		expect(userNewFirstName.isDisplayed()).toBe(true);
		userNewFirstName.clear();
		userNewFirstName.sendKeys('totoX');
		browser.sleep(500);
		expect(userNewFirstName.getAttribute('value')).toBe('totoX');
		btn_userFirstNameClose = browser.findElement(by.id("btn_userFirstNameClose"));
		expect(userFirstName.isDisplayed()).toBe(true);
		btn_userFirstNameSave = browser.findElement(by.id("btn_userFirstNameSave"));
		expect(userFirstName.isDisplayed()).toBe(true);
		btn_userFirstNameSave.click();
		browser.sleep(500);
		browser.driver.switchTo().activeElement();
		browser.get('http://localhost:5000/#/');
	});
});