export default Ember.Handlebars.makeBoundHelper(function(id, options) {
  if (Ember.isEmpty(id)) {
    return '';
  }
  var protocol = window.location.protocol;
  // function shortcut: HTML encode user input
  var h = Ember.Handlebars.Utils.escapeExpression;
  var size = h(options.size || "48");
  var img = '<img src="'+protocol+'//www.gravatar.com/avatar/'+h(id)+
    '?s='+size+'" alt="" width="'+size+'" height="'+size+'" class="avatar">';
  return new Ember.Handlebars.SafeString(img);
});
