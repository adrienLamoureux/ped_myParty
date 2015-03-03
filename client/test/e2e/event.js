var completeCreateEvent = function(){
	var eventForm = browser.findElement(by.id("eventForm"));
	expect(eventForm.isDisplayed()).toBe(true);
	
	var txtEventTitle = browser.findElement(by.id("txtEventTitle"));
	expect(txtEventTitle.isDisplayed()).toBe(true);
	txtEventTitle.sendKeys("eventTitle");
	expect(txtEventTitle.getAttribute('value')).toBe('eventTitle');

	var txtEventDateStarting = browser.findElement(by.id("txtEventDateStarting"));
	expect(txtEventDateStarting.isDisplayed()).toBe(true);
	txtEventDateStarting.sendKeys("20-05-2015");
	expect(txtEventDateStarting.getAttribute('value')).toBe('2015-05-20');

	var txtEventDateEnding = browser.findElement(by.id("txtEventDateEnding"));
	expect(txtEventDateEnding.isDisplayed()).toBe(true);
	txtEventDateEnding.sendKeys("30-05-2041");
	expect(txtEventDateEnding.getAttribute('value')).toBe('2041-05-30');

	var txtEventDescription = browser.findElement(by.id("txtEventDescription"));
	expect(txtEventDescription.isDisplayed()).toBe(true);
	txtEventDescription.sendKeys("eventDescription");
	expect(txtEventDescription.getAttribute('value')).toBe('eventDescription');

	var txtEventStreet = browser.findElement(by.id("txtEventStreet"));
	expect(txtEventStreet.isDisplayed()).toBe(true);
	txtEventStreet.sendKeys("eventStreet");
	expect(txtEventStreet.getAttribute('value')).toBe('eventStreet');

	var txtEventZipCode = browser.findElement(by.id("txtEventZipCode"));
	expect(txtEventZipCode.isDisplayed()).toBe(true);
	txtEventZipCode.sendKeys("33000");
	expect(txtEventZipCode.getAttribute('value')).toBe('33000');

	var txtEventCity = browser.findElement(by.id("txtEventCity"));
	expect(txtEventCity.isDisplayed()).toBe(true);
	txtEventCity.sendKeys("Bordeaux");
	expect(txtEventCity.getAttribute('value')).toBe('Bordeaux');

	var txtEventCounty = browser.findElement(by.id("txtEventCounty"));
	expect(txtEventCounty.isDisplayed()).toBe(true);
	txtEventCounty.sendKeys("Aquitaine");
	expect(txtEventCounty.getAttribute('value')).toBe('Aquitaine');

	var txtEventCountry = browser.findElement(by.id("txtEventCountry"));
	expect(txtEventCountry.isDisplayed()).toBe(true);
	txtEventCountry.sendKeys("France");
	expect(txtEventCountry.getAttribute('value')).toBe('France');

	var fileEventImage = browser.findElement(by.id("fileEventImage"));
	expect(fileEventImage.isDisplayed()).toBe(true);

	// Billetterie
	// ng-repeat
	/*element.all(by.repeater('t in eventFormData.ticketsType')).get(0).then(function(args){
		console.log('args')
		console.log(args);
		console.log()
	});*/
/*
	var bt_rem_ticketType1 = browser.findElement(by.id("bt_rem_ticketType1"));
	expect(bt_rem_ticketType1.isDisplayed()).toBe(true);
*/
	var txtEventType1 = browser.findElement(by.id("txtEventType1"));
	expect(txtEventType1.isDisplayed()).toBe(true);
	txtEventType1.sendKeys("Standard");
	expect(txtEventType1.getAttribute('value')).toBe('Standard');

	var txtEventDescription1 = browser.findElement(by.id("txtEventDescription1"));
	expect(txtEventDescription1.isDisplayed()).toBe(true);
	txtEventDescription1.sendKeys("Basic ticket for event");
	expect(txtEventDescription1.getAttribute('value')).toBe('Basic ticket for event');

	var txtEventTicketLeft1 = browser.findElement(by.id("txtEventTicketLeft1"));
	expect(txtEventTicketLeft1.isDisplayed()).toBe(true);
	txtEventTicketLeft1.clear();
	txtEventTicketLeft1.sendKeys('1');
	expect(txtEventTicketLeft1.getAttribute('value')).toBe('1');

	var txtEventPrice1 = browser.findElement(by.id("txtEventPrice1"));
	expect(txtEventPrice1.isDisplayed()).toBe(true);
	txtEventPrice1.clear();
	txtEventPrice1.sendKeys('10');
	expect(txtEventPrice1.getAttribute('value')).toBe('10');

	var fileTicketTypeImage1 = browser.findElement(by.id("fileTicketTypeImage1"));
	expect(fileTicketTypeImage1.isDisplayed()).toBe(true);
	
	var bt_add_ticket = browser.findElement(by.id("bt_add_ticket"));
	expect(bt_add_ticket.isDisplayed()).toBe(true);
};

describe('Event view' , function () {

	beforeEach(function(){
		browser.get('http://localhost:4711/#/home');

		

		// Connect
		var connect = browser.findElement(by.linkText("Se Connecter"));
		connect.click();

	});

	it('Access to an event information', function(){
		// Take a sample event
	});

	it('Create an event', function(){
		var organiseEvent = browser.findElement(by.linkText("Organiser un Evenement"));
		expect(organiseEvent.isDisplayed()).toBe(true);
		organiseEvent.click();
		completeCreateEvent();
		var bt_restore = browser.findElement(by.id("bt_restore"));
		expect(bt_restore.isDisplayed()).toBe(true);
		var bt_submit =  browser.findElement(by.id("bt_submit"));
		expect(bt_submit.isDisplayed()).toBe(true);
		browser.actions().mouseMove(bt_submit).click();
	});

	it('Cancel a no validated event', function(){
		var organiseEvent = browser.findElement(by.linkText("Organiser un Evenement"));
		expect(organiseEvent.isDisplayed()).toBe(true);
		organiseEvent.click();
		completeCreateEvent();
		var bt_restore = browser.findElement(by.id("bt_restore"));
		expect(bt_restore.isDisplayed()).toBe(true);
		var bt_submit =  browser.findElement(by.id("bt_submit"));
		expect(bt_submit.isDisplayed()).toBe(true);
		browser.actions().mouseMove(bt_restore).click();
	});

	it('Edit an event', function(){
		
	});

	afterEach(function(){
		browser.get('http://localhost:4711/#/home');
		/*// Disconnect
		var disconnect = browser.findElement(by.linkText("Se Déconnecter"));
		disconnect.click();*/
	});
});