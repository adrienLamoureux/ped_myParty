var addOneTicket = function(){
	var eventN = browser.findElement(by.xpath("id('page')/div/event-list/div/div[2]/event-miniature/div/a/img"));
	expect(eventN.isDisplayed()).toBe(true); //When img uploading will work
	eventN.click();
	var addPaner = browser.findElement(by.buttonText("Ajouter au panier"));
	expect(addPaner.isDisplayed()).toBe(true);
	addPaner.click();	
};

describe('basket view' , function () {

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
		
	});

	it('should add another ticket to the basket', function(){

	})

	it('should remove an ticket to the basket', function(){

	});

	it('should check that the total price is printed correctly', function(){

	});

	it('should validate a basket', function(){

	});
});