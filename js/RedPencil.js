function Item(price) {
	this.currentPrice = price;
	this.priceBeforePromo = price;
	this.isInPromo = false;
	this.lastChangedDate = thirtyDaysAgo();
	this.lastPromoEnded = thirtyDaysAgo();
	this.promoStartDate = thirtyDaysAgo();    
}

Item.prototype.isRedPencilPromo = function() {
	if (this.promoStartDate < thirtyDaysAgo())
		this.endPromo();
	return this.isInPromo;
};

Item.prototype.changePrice = function(amount) {
	if(!this.isInPromo)
		this.priceBeforePromo = this.currentPrice;
	this.currentPrice += amount;
	if (amount < (-.05 * this.priceBeforePromo) && amount > (-.3 * this.priceBeforePromo)
			&& this.currentPrice >= this.priceBeforePromo * (.7) && this.lastChangedDate <= thirtyDaysAgo()
			&& this.lastPromoEnded <= thirtyDaysAgo())
		this.startPromo();
	if (this.currentPrice <= this.priceBeforePromo * (.7) || (amount > 0))
		this.endPromo();
	this.lastChangedDate = new Date();
};

Item.prototype.startPromo = function () {
	if (!this.isInPromo)
		this.promoStartDate = new Date();
	this.isInPromo = true;
};

Item.prototype.endPromo = function() {
	if (this.isInPromo) {
		this.lastPromoEnded = new Date();
	}
	this.isInPromo = false;
	this.priceBeforePromo = this.currentPrice;
};

function thirtyDaysAgo() {
	var d = new Date();
	d.setDate(d.getDate() - 30);
	return d;
}
