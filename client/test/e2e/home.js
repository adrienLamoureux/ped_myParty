describe('Home view' , function () {

	it('look for route title', function(){ // Verify route redirection
		browser.get('http://localhost:5000/#/');
		expect(browser.getTitle()).toEqual('MyParty');
	});

	it('look for bar menu as connected', function(){
		var navBand = browser.findElement(by.className("navbar-brand"));
		expect(navBand.isDisplayed()).toBe(true);
		var menu = browser.findElement(by.id("menu"));
		expect(menu.isDisplayed()).toBe(true);
		var accueil = browser.findElement(by.id("bt_home"));
		expect(accueil.isDisplayed()).toBe(true);
		var bt_account = browser.findElement(by.id("bt_account"));
		expect(bt_account.isDisplayed()).toBe(true);
		bt_account.click();
		var bt_profil = browser.findElement(by.id("bt_profil"));
		expect(bt_profil.isDisplayed()).toBe(true);
		var myEvents = browser.findElement(by.id("bt_mineEvents"));
		expect(myEvents.isDisplayed()).toBe(true);
		var myCommands = browser.findElement(by.id("bt_mineOrders"));
		expect(myCommands.isDisplayed()).toBe(true);
		var organiseEvent = browser.findElement(by.id("bt_createEvent"));
		expect(organiseEvent.isDisplayed()).toBe(true);
		var myBasket = browser.findElement(by.id("bt_basket"));
		expect(myBasket.isDisplayed()).toBe(true);
	});

	it('look for events elements sample', function(){
		var eventN = browser.findElement(by.id("eventMin1"));
		expect(eventN.isDisplayed()).toBe(true);
		eventN.click();
	});
});