export default Ember.Handlebars.makeBoundHelper(function(amount) {
	amount = isNaN(amount) || amount === '' || amount === null ? 0 : amount;
	return window.accounting.formatMoney(amount, '$', 0);
});
