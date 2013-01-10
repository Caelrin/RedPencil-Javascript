describe("The red pencil promotion", function() {
	it("should be deactive as a base", function() {
		item = new Item(10.00);
		
		expect(item.currentPrice).toEqual(10.00);
		expect(item.isRedPencilPromo()).toEqual(false);
	});
	
	it("should be active with a 10% drop", function() {
		item = new Item(10.00);
		
		item.changePrice(-1);
		
		expect(item.currentPrice).toEqual(9.00);
		expect(item.isRedPencilPromo()).toEqual(true);
		expect(item.priceBeforePromo).toEqual(10.0);
	});
	
	it("should not be active with a 4% drop", function() {
		item = new Item(10.00);
		
		item.changePrice(-.4);
		
		expect(item.currentPrice).toEqual(9.60);
		expect(item.isRedPencilPromo()).toEqual(false);
	});
	
	it("should not be active with a 31% drop", function() {
		item = new Item(10.00);
		
		item.changePrice(-3.1);
		
		expect(item.currentPrice).toEqual(6.9);
		expect(item.isRedPencilPromo()).toEqual(false);
	});
	
	it("should not be active if price not stable for 30 days", function() {
		item = new Item(10.00);
		var d = new Date();
		d.setDate(d.getDate() - 20);
		item.lastChangedDate = d;
		
		item.changePrice(-2);
		
		expect(item.currentPrice).toEqual(8.0);
		expect(item.isRedPencilPromo()).toEqual(false);
	});
	
	it("should not be active if the price is reduced to -30%", function() {
		item = new Item(10.00);
		
		item.changePrice(-1);
		item.changePrice(-1);
		item.changePrice(-1);
		item.changePrice(-1);
		
		expect(item.currentPrice).toEqual(6.0);
		expect(item.isRedPencilPromo()).toEqual(false);
	});
	
	it("should not be in a red pencil promo if it is 31 days after original promo", function(){
		item = new Item(10.00);
		item.changePrice(-1);
		var d = new Date();
		d.setDate(d.getDate() - 31);
		item.promoStartDate = d;
		
		expect(item.currentPrice).toEqual(9.0);
		expect(item.isRedPencilPromo()).toEqual(false);
	});
	
	it("should not be in a red pencil promo if there is a price increase", function(){
		item = new Item(10.00);

		item.changePrice(-2);
		item.changePrice(1);
		
		expect(item.currentPrice).toEqual(9.0);
		expect(item.isRedPencilPromo()).toEqual(false);
		expect(item.lastPromoEnded.getDay()).toEqual(new Date().getDay());
		expect(item.priceBeforePromo).toEqual(9.0);
	});
	
	it("should be in a red pencil promo if there is a second decrease of 4%", function(){
		item = new Item(10.00);
		
		item.changePrice(-2);
		item.changePrice(-.4);
		
		expect(item.currentPrice).toEqual(7.6);
		expect(item.priceBeforePromo).toEqual(10);
		expect(item.isRedPencilPromo()).toEqual(true);
	});
	
	it("should not be in a red pencil promo if the last one ended 10 days ago", function(){
		item = new Item(10.00);
		var d = new Date();
		d.setDate(d.getDate() - 10);
		
		item.lastPromoEnded = d;
		item.changePrice(-2);
		
		expect(item.currentPrice).toEqual(8);
		expect(item.isRedPencilPromo()).toEqual(false);
	});
	
	it("should not update last end date when it doesnt active red pencil", function(){
		item = new Item(10.00);
		
		item.changePrice(2);
		
		expect(item.currentPrice).toEqual(12);
		expect(item.isRedPencilPromo()).toEqual(false);
		var d = new Date();
		d.setDate(d.getDate() - 30);
		expect(item.lastPromoEnded.getDay()).toEqual(d.getDay());
	});
	
	it("should not update promoStartDate on second change", function(){
		item = new Item(10.00);
		
		item.changePrice(-1);
		var afterFirstDate = item.promoStartDate;
		item.changePrice(-1);
		
		expect(item.currentPrice).toEqual(8);
		expect(item.isRedPencilPromo()).toEqual(true);
		var d = new Date();
		expect(item.promoStartDate.getDay()).toEqual(d.getDay());
		expect(item.promoStartDate.getDay()).toEqual(afterFirstDate.getDay());
	});
	
});
