var addOneTicket = function(){
	browser.get('http://localhost:5000/#/');
	browser.sleep(500);
	var eventN = browser.findElement(by.id("eventMinID"));	
	expect(eventN.isDisplayed()).toBe(true);
	eventN.click();
	browser.sleep(500);
	var addPaner = browser.findElement(by.buttonText("Ajouter au panier"));
	expect(addPaner.isDisplayed()).toBe(true);
	addPaner.click();
	browser.sleep(500);
};

var validateBasket = function(){
	addOneTicket();
	var myBasket = browser.findElement(by.id("bt_basket"));
	expect(myBasket.isDisplayed()).toBe(true);
	myBasket.click();
	var basketTotal = browser.findElement(by.id("basketTotal"));
	var basketAmount = basketTotal.getText();
	var btn_basketValidation = browser.findElement(by.id("btn_basketValidation"));
	expect(myBasket.isDisplayed()).toBe(true);
	btn_basketValidation.click();
	browser.sleep(1000);
	
	var card_number = browser.findElement(by.id("card_number"));
	expect(card_number.isDisplayed()).toBe(true);
	card_number.clear();
	card_number.sendKeys("4242424242424242");
	expect(card_number.getAttribute('value')).toBe("4242424242424242");
	var expiration_month = browser.findElement(by.id("expiration_month"));
	expect(expiration_month.isDisplayed()).toBe(true);
	expiration_month.clear();
	expiration_month.sendKeys("08");
	expect(expiration_month.getAttribute('value')).toBe("08");
	var expiration_year = browser.findElement(by.id("expiration_year"));
	expect(expiration_year.isDisplayed()).toBe(true);
	expiration_year.clear();
	expiration_year.sendKeys("18");
	expect(expiration_year.getAttribute('value')).toBe("18");
	var cvc = browser.findElement(by.id("cvc"));
	expect(cvc.isDisplayed()).toBe(true);
	cvc.clear();
	cvc.sendKeys("111");
	expect(cvc.getAttribute('value')).toBe("111");
	
	var commandAmount = browser.findElement(by.id("commandAmount"));
	expect(commandAmount.isDisplayed()).toBe(true);
	commandAmount.getText().then(function(text){
		basketAmount.then(function(basket){
			basket = basket.match(/\d+.?\d*/)[0].replace(/ +?/g, '');
			text = text.match(/\d+.?\d*/)[0].replace(/ +?/g, '');
			expect(text.toString()).toEqual(basket);
		});
	});
	
	var paiement = browser.findElement(by.id("pay"));
	expect(paiement.isDisplayed()).toBe(true);
	paiement.click();
	browser.sleep(3000);
	var notif = browser.findElement(by.className("message"));
	expect(notif.isDisplayed()).toBe(true);
};

describe('basket view' , function () {

	beforeEach(function(){
		browser.get('http://localhost:5000/#/');
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
		var myBasket = browser.findElement(by.id("bt_basket"));
		expect(myBasket.isDisplayed()).toBe(true);
		myBasket.click();
		browser.sleep(200);
		var basketCurrentTickets1 = browser.findElement(by.id("basketCurrentTickets1"));
		expect(basketCurrentTickets1.isDisplayed()).toBe(true);
		var basketSingleTicketPrice1 = browser.findElement(by.id("basketSingleTicketPrice1"));
		expect(basketSingleTicketPrice1.isDisplayed()).toBe(true);
		var basketSetTicketsPrice1 = browser.findElement(by.id("basketSetTicketsPrice1"));
		expect(basketSetTicketsPrice1.isDisplayed()).toBe(true);
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

	it('should validate a panner, release the paiement and look for the notification', function(){
		validateBasket();
		browser.sleep(200);
		browser.get('http://localhost:5000/#/');
		browser.sleep(200);
		validateBasket();
	});
});