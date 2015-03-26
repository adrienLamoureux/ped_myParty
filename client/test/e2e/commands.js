describe('commands view' , function () {

	beforeEach(function(){
		browser.get('http://localhost:5000/#/');
	});

	it('should access to the commands page', function(){
		var bt_account = browser.findElement(by.id("bt_account"));
		expect(bt_account.isDisplayed()).toBe(true);
		bt_account.click();
		var myCommands = browser.findElement(by.id("bt_mineOrders"));
		expect(myCommands.isDisplayed()).toBe(true);
		myCommands.click();
		var cmdsTable = browser.findElement(by.id("cmdsTable"));
		expect(cmdsTable.isDisplayed()).toBe(true);
		var cmd1 = browser.findElement(by.id("cmd1"));
		expect(cmd1.isDisplayed()).toBe(true);
	});

	it('should view the ticket details to print', function(){
		browser.get('http://localhost:5000/#/');
		var bt_account = browser.findElement(by.id("bt_account"));
		expect(bt_account.isDisplayed()).toBe(true);
		bt_account.click();
		var myCommands = browser.findElement(by.id("bt_mineOrders"));
		expect(myCommands.isDisplayed()).toBe(true);
		myCommands.click();
		browser.sleep(200);
		var cmdsTable = browser.findElement(by.id("cmdsTable"));
		expect(cmdsTable.isDisplayed()).toBe(true);
		var cmd1 = browser.findElement(by.id("cmd2"));
		expect(cmd1.isDisplayed()).toBe(true);
		cmd1.click();
		var typeToTicket1_1 = browser.findElement(by.id("typeToTicket1_1"));
		expect(typeToTicket1_1.isDisplayed()).toBe(true);
		var priceToTicket1_1 = browser.findElement(by.id("priceToTicket1_1"));
		expect(priceToTicket1_1.isDisplayed()).toBe(true);
		var expToTicket1_1 = browser.findElement(by.id("expToTicket1_1"));
		expect(expToTicket1_1.isDisplayed()).toBe(true);
		var usedToTicket1_1 = browser.findElement(by.id("usedToTicket1_1"));
		expect(usedToTicket1_1.isDisplayed()).toBe(true);
		typeToTicket1_1.click();
		var printable = browser.findElement(by.id("printable"));
		expect(printable.isDisplayed()).toBe(true);
		var eventTitle = browser.findElement(by.id("eventTitle"));
		expect(eventTitle.isDisplayed()).toBe(true);
		var eventDescription = browser.findElement(by.id("eventDescription"));
		expect(eventDescription.isDisplayed()).toBe(true);
		var eventStreet = browser.findElement(by.id("eventStreet"));
		expect(eventStreet.isDisplayed()).toBe(true);
		var eventZipCode = browser.findElement(by.id("eventZipCode"));
		expect(eventZipCode.isDisplayed()).toBe(true);
		var eventCounty = browser.findElement(by.id("eventCounty"));
		expect(eventCounty.isDisplayed()).toBe(true);
		var eventCountry = browser.findElement(by.id("eventCountry"));
		expect(eventCountry.isDisplayed()).toBe(true);
		var eventCity = browser.findElement(by.id("eventCity"));
		expect(eventCity.isDisplayed()).toBe(true);
		var ticket = browser.findElement(by.id("ticket"));
		expect(ticket.isDisplayed()).toBe(true);
		var ticketType = browser.findElement(by.id("ticketType"));
		expect(ticketType.isDisplayed()).toBe(true);
		var ticketDescription = browser.findElement(by.id("ticketDescription"));
		expect(ticketDescription.isDisplayed()).toBe(true);
		var ticketPrice = browser.findElement(by.id("ticketPrice"));
		expect(ticketPrice.isDisplayed()).toBe(true);
		var ticketExp = browser.findElement(by.id("ticketExp"));
		expect(ticketExp.isDisplayed()).toBe(true);
		var bt_print = browser.findElement(by.id("bt_print"));
		expect(bt_print.isDisplayed()).toBe(true);
	});

	it('should cancel a command and view a notification', function(){
		var bt_account = browser.findElement(by.id("bt_account"));
		expect(bt_account.isDisplayed()).toBe(true);
		bt_account.click();
		var myCommands = browser.findElement(by.id("bt_mineOrders"));
		expect(myCommands.isDisplayed()).toBe(true);
		myCommands.click();
		var cmd1 = browser.findElement(by.id("cmd2"));
		expect(cmd1.isDisplayed()).toBe(true);
		cmd1.click();
		var cancel = browser.findElement(by.id("cancel"));
		expect(cancel.isDisplayed()).toBe(true);
		cancel.click();
		var alertDialog = browser.switchTo().alert();
		alertDialog.accept();
		browser.sleep(3000);
		var notif = browser.findElement(by.className("message"));
		expect(notif.isDisplayed()).toBe(true);
		//var cmdC1 = browser.findElement(by.id("cmdC1"));
		//expect(cmdC1.isDisplayed()).toBe(true);
		//cmdC1.getText().then(function(text){
		//	expect(text == "Valide").toBe(true); //Because date has been passed
		//});
	});
});
