// Bind to the #clock injected into the views to keep the 
// displayed relative time current. For example:
//
//     {{time-ago-in-words starts_at view.clock.pulse}}
//
export default Ember.Handlebars.makeBoundHelper(function(time) {
  return window.moment(time).fromNow();
});
