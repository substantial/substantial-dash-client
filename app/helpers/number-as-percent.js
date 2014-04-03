export default Ember.Handlebars.makeBoundHelper(function(number) {
  return window.numeral(number).format('0.0%');
});
