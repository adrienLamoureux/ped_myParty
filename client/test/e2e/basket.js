var addOneTicket = function(){
	var eventN = browser.findElement(by.xpath("id('page')/div/event-list/div/div[2]/event-miniature/div/a/img"));
	expect(eventN.isDisplayed()).toBe(true); //When img uploading will work
	eventN.click();
	var addPaner = browser.findElement(by.buttonText("Ajouter au panier"));
	expect(addPaner.isDisplayed()).toBe(true);
	addPaner.click();
	browser.sleep(500);
};

describe('basket view' , function () {

	beforeEach(function(){
		browser.get('http://localhost:4711/#/');
	});

	it('should access to the basket view', function(){
		var myBasket = browser.findElement(by.id("bt_basket"));
		expect(myBasket.isDisplayed()).toBe(true);
		myBasket.click();
	});

	it('should add one ticket to the basket', function(){
		addOneTicket();
		var myBasket = browser.findElement(by.id("bt_basket"));
		expect(myBasket.isDisplayed()).toBe(true);
		myBasket.click();
		var basketCurrentTickets1 = browser.findElement(by.id("basketCurrentTickets1"));
		expect(basketCurrentTickets1.isDisplayed()).toBe(true);
		expect(basketCurrentTickets1.getAttribute('value')).toBeGreaterThan(0);
	});

	it('should add another ticket to the basket', function(){
		addOneTicket();
		var myBasket = browser.findElement(by.id("bt_basket"));
		expect(myBasket.isDisplayed()).toBe(true);
		myBasket.click();
		var basketCurrentTickets1 = browser.findElement(by.id("basketCurrentTickets1"));
		var value1 = basketCurrentTickets1.getAttribute('value');
		var btn_basketPlus1 = browser.findElement(by.id("btn_basketPlus1"));
		expect(btn_basketPlus1.isDisplayed()).toBe(true);
		btn_basketPlus1.click();
		expect(basketCurrentTickets1.getAttribute('value')).toBeGreaterThan(value1);
	});

	it('should remove an ticket to the basket', function(){
		addOneTicket();
		var myBasket = browser.findElement(by.id("bt_basket"));
		expect(myBasket.isDisplayed()).toBe(true);
		myBasket.click();
		var basketCurrentTickets1 = browser.findElement(by.id("basketCurrentTickets1"));
		var value1 = basketCurrentTickets1.getAttribute('value');
		var btn_basketMinus1 = browser.findElement(by.id("btn_basketMinus1"));
		expect(btn_basketMinus1.isDisplayed()).toBe(true);
		btn_basketMinus1.click();
		expect(basketCurrentTickets1.getAttribute('value')).toBeLessThan(value1);
	});

	it('should check that the total price is printed correctly', function(){
		addOneTicket();
		/*browser.get('http://localhost:4711/#/');
		var eventN = browser.findElement(by.xpath("id('page')/div/event-list/div/div[4]/event-miniature/div/a/img"));
		expect(eventN.isDisplayed()).toBe(true); //When img uploading will work
		eventN.click();
		var addPaner = browser.findElement(by.buttonText("Ajouter au panier"));
		expect(addPaner.isDisplayed()).toBe(true);
		addPaner.click();
		browser.sleep(500);
		browser.get('http://localhost:4711/#/');*/
		var myBasket = browser.findElement(by.id("bt_basket"));
		expect(myBasket.isDisplayed()).toBe(true);
		myBasket.click();
		browser.sleep(200);
		var basketCurrentTickets1 = browser.findElement(by.id("basketCurrentTickets1"));
		//var basketCurrentTickets2 = browser.findElement(by.id("basketCurrentTickets2"));
		expect(basketCurrentTickets1.isDisplayed()).toBe(true);
		//expect(basketCurrentTickets2.isDisplayed()).toBe(true);
		var basketSingleTicketPrice1 = browser.findElement(by.id("basketSingleTicketPrice1"));
		//var basketSingleTicketPrice2 = browser.findElement(by.id("basketSingleTicketPrice2"));
		expect(basketSingleTicketPrice1.isDisplayed()).toBe(true);
		//expect(basketSingleTicketPrice2.isDisplayed()).toBe(true);
		var basketSetTicketsPrice1 = browser.findElement(by.id("basketSetTicketsPrice1"));
		//var basketSetTicketsPrice2 = browser.findElement(by.id("basketSetTicketsPrice2"));
		expect(basketSetTicketsPrice1.isDisplayed()).toBe(true);
		//expect(basketSetTicketsPrice2.isDisplayed()).toBe(true);
		var basketTotal = browser.findElement(by.id("basketTotal"));
		expect(basketTotal.isDisplayed()).toBe(true);

		basketCurrentTickets1.getAttribute('value').then(function(nbTicket){
			basketSingleTicketPrice1.getText().then(function(ticketPrice){
				basketSetTicketsPrice1.getText().then(function(setTicketPrice){
					basketTotal.getText().then(function(totalPrice){
						ticketPrice = ticketPrice.match(/\d+.?\d*/)[0].replace(/ +?/g, '');
						setTicketPrice = setTicketPrice.match(/\d+.?\d*/)[0].replace(/ +?/g, '');
						totalPrice = totalPrice.match(/\d+.?\d*/)[0].replace(/ +?/g, '');
						expect((nbTicket*ticketPrice).toString()).toEqual(setTicketPrice);
						expect(setTicketPrice).toEqual(totalPrice);
					});
				});
			});
		});
	});

	it('should validate a basket', function(){

	});

});