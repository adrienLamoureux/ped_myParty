describe('Home view' , function () {

	it('look for route title', function(){ // Verify route redirection
		browser.get('http://localhost:4711/#/');
		expect(browser.getTitle()).toEqual('MyParty');
	});

	it('look for bar menu as connected', function(){
		var navBand = browser.findElement(by.className("navbar-brand"));
		expect(navBand.isDisplayed()).toBe(true);
		var menu = browser.findElement(by.id("menu"));
		expect(menu.isDisplayed()).toBe(true);
		var accueil = browser.findElement(by.linkText("Accueil"));
		expect(accueil.isDisplayed()).toBe(true);
		var myAccount = browser.findElement(by.linkText("Mon Compte"));
		expect(myAccount.isDisplayed()).toBe(true);
		var myEvents = browser.findElement(by.linkText("Mes Evenements"));
		expect(myEvents.isDisplayed()).toBe(true);
		var myCommands = browser.findElement(by.linkText("Mes Commandes"));
		expect(myCommands.isDisplayed()).toBe(true);
		var organiseEvent = browser.findElement(by.linkText("Organiser un Evenement"));
		expect(organiseEvent.isDisplayed()).toBe(true);
		var myBasket = browser.findElement(by.linkText("Mon Panier"));
		expect(myBasket.isDisplayed()).toBe(true);
	});

	it('look for events elements sample', function(){
		var eventN = browser.findElement(by.xpath("id('page')/div/event-list/div/div[2]/event-miniature/div/a/img"));
		expect(eventN.isDisplayed()).toBe(true);
	});
});