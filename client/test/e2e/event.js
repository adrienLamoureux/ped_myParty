var connect = require('./connect.js');

var completeCreateEvent = function(){
	var eventForm = browser.findElement(by.id("eventForm"));
	expect(eventForm.isDisplayed()).toBe(true);
	
	var txtEventTitle = browser.findElement(by.id("txtEventTitle"));
	expect(txtEventTitle.isDisplayed()).toBe(true);
	txtEventTitle.clear();
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
	txtEventDescription.clear();
	txtEventDescription.sendKeys("eventDescription");
	expect(txtEventDescription.getAttribute('value')).toBe('eventDescription');

	var txtEventStreet = browser.findElement(by.id("txtEventStreet"));
	expect(txtEventStreet.isDisplayed()).toBe(true);
	txtEventStreet.clear();
	txtEventStreet.sendKeys("eventStreet");
	expect(txtEventStreet.getAttribute('value')).toBe('eventStreet');

	var txtEventZipCode = browser.findElement(by.id("txtEventZipCode"));
	expect(txtEventZipCode.isDisplayed()).toBe(true);
	txtEventZipCode.clear();
	txtEventZipCode.sendKeys("33000");
	expect(txtEventZipCode.getAttribute('value')).toBe('33000');

	var txtEventCity = browser.findElement(by.id("txtEventCity"));
	expect(txtEventCity.isDisplayed()).toBe(true);
	txtEventCity.clear();
	txtEventCity.sendKeys("Bordeaux");
	expect(txtEventCity.getAttribute('value')).toBe('Bordeaux');

	var txtEventCounty = browser.findElement(by.id("txtEventCounty"));
	expect(txtEventCounty.isDisplayed()).toBe(true);
	txtEventCounty.clear();
	txtEventCounty.sendKeys("Aquitaine");
	expect(txtEventCounty.getAttribute('value')).toBe('Aquitaine');

	var txtEventCountry = browser.findElement(by.id("txtEventCountry"));
	expect(txtEventCountry.isDisplayed()).toBe(true);
	txtEventCountry.clear();
	txtEventCountry.sendKeys("France");
	expect(txtEventCountry.getAttribute('value')).toBe('France');

	var fileEventImage = browser.findElement(by.id("eventImage"));
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
	txtEventType1.clear();
	txtEventType1.sendKeys("Standard");
	expect(txtEventType1.getAttribute('value')).toBe('Standard');

	var txtEventDescription1 = browser.findElement(by.id("txtEventDescription1"));
	expect(txtEventDescription1.isDisplayed()).toBe(true);
	txtEventDescription1.clear();
	txtEventDescription1.sendKeys("Basic ticket for event");
	expect(txtEventDescription1.getAttribute('value')).toBe('Basic ticket for event');

	var txtTicketExpirationDate = browser.findElement(by.id("txtTicketExpirationDate"));
	expect(txtTicketExpirationDate.isDisplayed()).toBe(true);
	txtTicketExpirationDate.sendKeys("21-05-2015");
	expect(txtTicketExpirationDate.getAttribute('value')).toBe("2015-05-21");

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

	var fileTicketTypeImage1 = browser.findElement(by.id("ticketImage"));
	expect(fileTicketTypeImage1.isDisplayed()).toBe(true);
	
	var bt_add_ticket = browser.findElement(by.id("bt_add_ticket"));
	expect(bt_add_ticket.isDisplayed()).toBe(true);
};

describe('Event view' , function () {

	it('Access to an event information', function(){
		// TODO : Use img when it will work
		var eventN = browser.findElement(by.xpath("id('page')/div/event-list/div/div[2]/event-miniature/div/a/img"));
		expect(eventN.isDisplayed()).toBe(true); //When img uploading will work
		eventN.click();

		var eventPage = browser.findElement(by.id("eventPage"));
		expect(eventPage.isDisplayed()).toBe(true);

		var info = browser.findElement(by.id("info"));
		expect(info.isDisplayed()).toBe(true);

		var tickets = browser.findElement(by.id("tickets"));
		expect(tickets.isDisplayed()).toBe(true);

		var ticket = browser.findElement(by.id("ticket"));
		expect(ticket.isDisplayed()).toBe(true);

		var addPaner = browser.findElement(by.buttonText("Ajouter au panier"));
		expect(addPaner.isDisplayed()).toBe(true);	
	});

	it('Create an event without publication', function(){
		var organiseEvent = browser.findElement(by.linkText("Organiser un Evenement"));
		expect(organiseEvent.isDisplayed()).toBe(true);
		organiseEvent.click();
		completeCreateEvent();
		var bt_restore = browser.findElement(by.id("bt_restore"));
		expect(bt_restore.isDisplayed()).toBe(true);
		var bt_submit =  browser.findElement(by.id("bt_submit"));
		expect(bt_submit.isDisplayed()).toBe(true);
		var bt_save =  browser.findElement(by.id("bt_submit"));
		expect(bt_save.isDisplayed()).toBe(true);
		browser.actions().mouseMove(bt_save).click();
	});

	it('Create an event with publication', function(){
		var organiseEvent = browser.findElement(by.linkText("Organiser un Evenement"));
		expect(organiseEvent.isDisplayed()).toBe(true);
		organiseEvent.click();
		completeCreateEvent();
		var bt_restore = browser.findElement(by.id("bt_restore"));
		expect(bt_restore.isDisplayed()).toBe(true);
		var bt_submit =  browser.findElement(by.id("bt_submit"));
		expect(bt_submit.isDisplayed()).toBe(true);
		var bt_save =  browser.findElement(by.id("bt_submit"));
		expect(bt_save.isDisplayed()).toBe(true);
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
});