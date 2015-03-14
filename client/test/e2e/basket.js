var addOneTicket = function(){
	var eventN = browser.findElement(by.xpath("id('page')/div/event-list/div/div[2]/event-miniature/div/a/img"));
	expect(eventN.isDisplayed()).toBe(true); //When img uploading will work
	eventN.click();
	var addPaner = browser.findElement(by.buttonText("Ajouter au panier"));
	expect(addPaner.isDisplayed()).toBe(true);
	addPaner.click();
	browser.sleep(1000);
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
		
	});

	it('should validate a basket', function(){

	});

});