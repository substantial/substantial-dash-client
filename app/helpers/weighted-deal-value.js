export default Ember.Handlebars.makeBoundHelper(function(amount, probability) {	
	amount = isNaN(amount) || amount === '' || amount === null ? 0 : amount;
	var weighted_amount = amount * (probability / 100);
	Ember.Logger.debug(amount,probability);
	return window.accounting.formatMoney(weighted_amount, '$', 0);
});
