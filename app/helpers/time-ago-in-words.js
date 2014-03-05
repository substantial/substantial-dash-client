export default Ember.Handlebars.makeBoundHelper(function(time) {
  return window.moment(time).fromNow();
});
