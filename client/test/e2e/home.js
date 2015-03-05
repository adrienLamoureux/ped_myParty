describe('Home view' , function () {

	beforeEach(function(){
		browser.get('http://localhost:4711/#/home');
	});

	it('look for route title', function(){ // Verify route redirection
		browser.get('http://localhost:4711/#/');
		expect(browser.getTitle()).toEqual('MyParty');
	});

	it('look for bar menu as disconnected', function(){
		var navBand = browser.findElement(by.className("navbar-brand"));
		expect(navBand.isDisplayed()).toBe(true);
		var menu = browser.findElement(by.id("menu"));
		expect(menu.isDisplayed()).toBe(true);
		var accueil = browser.findElement(by.linkText("Accueil"));
		expect(accueil.isDisplayed()).toBe(true);
		var connect = browser.findElement(by.linkText("Se Connecter"));
		expect(connect.isDisplayed()).toBe(true);	
	});

	it('look for bar menu as connected', function(){
		// routine to be connected. 
		// TODO : Fix it
		var connect = browser.findElement(by.linkText("Se Connecter"));
		expect(connect.isDisplayed()).toBe(true);
		connect.click();
		expect(connect.isDisplayed()).toBe(false);

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
		var disconnect = browser.findElement(by.linkText("Se Déconnecter"));
		expect(disconnect.isDisplayed()).toBe(true);

		disconnect.click();
		expect(disconnect.isDisplayed()).toBe(false);
	});

	it('look for events elements sample', function(){
		// TODO when image will be imported
		var eventN = browser.findElement(by.xpath("id('page')/div/event-list/div/div[2]/event-miniature/div/a/img"));
		expect(eventN.isDisplayed()).toBe(true); //When img uploading will work
	});
});