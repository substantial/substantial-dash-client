// Generate a login link for an auth provider ID.
//
// Providers are configured in config/environment.js and child ./environments.
//
export default Ember.Handlebars.makeBoundHelper(function(providerId) {
  var provider = window.ENV.auth_providers.findBy("id", providerId);
  var get = Ember.get;
  // function shortcut: HTML encode user input
  var h = Ember.Handlebars.Utils.escapeExpression;
  var link = "<a href='"+ window.ENV.api_base_url + "/auth/" + 
    h(get(provider, "id")) + "/init" + "'>" + h(get(provider, "name")) + 
    "</a>";
  return new Ember.Handlebars.SafeString(link);
});
