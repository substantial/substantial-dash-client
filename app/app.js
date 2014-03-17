import Resolver from 'ember/resolver';
import Cookies from 'appkit/utils/cookies';

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver['default']
});

App.initializer({
  name: "authenticate",

  initialize: function(container, application) {
    var location = window.location;
    var url = window.purl(location.href);
    var apiKey = url.param('api_key');
    var userName = url.param('user_name');

    if (Ember.isEmpty(apiKey)) {
      apiKey = Cookies.getItem('api_key');
      userName = Cookies.getItem('user_name');
    }

    if (!Ember.isEmpty(apiKey)) {
      var auth = Ember.Object.create({
        apiKey: apiKey,
        userName: userName
      });
      Cookies.setItem('api_key', apiKey);
      Cookies.setItem('user_name', userName);
      application.register('auth:main', auth, { instantiate: false });
      application.inject('controller', 'auth', 'auth:main');
      // Clean the auth info querystring from the document's URL.
      var authenticatedPath = url.attr('path') + '#' + url.attr('fragment');
      window.history.replaceState("authenticated", "", authenticatedPath);

      Ember.Logger.debug('App.initializer authenticated: '+auth.get('name'));
    }
  }
});

App.initializer({
  name: "faye-client",
  after: "authenticate",

  initialize: function(container, application) {
    var auth = container.lookup('auth:main');
    // Skip Faye/bayeux setup unless authentication has been registered.
    if (!Ember.isEmpty(auth)) {
      var client = new window.Faye.Client("http://0.0.0.0:8001/bayeux");
      // Add API key to outgoing messages.
      client.addExtension({
        outgoing: function(message, callback) {
          if (message.channel !== '/meta/subscribe' && 
              message.channel !== '/meta/publish') {
            return callback(message);
          }
          message.ext = message.ext || {};
          message.ext.apiKey = auth.get('apiKey');
          callback(message);
        }
      });
      application.register('faye-client:main', client, { instantiate: false });
      // Controllers have direct Pub/Sub access view their #bayeux property.
      application.inject('controller', 'bayeux', 'faye-client:main');
      // Dashboard Widgets are web components; give them Pub/Sub access too.
      application.inject('component', 'bayeux', 'faye-client:main');
    }
  }
});

export default App;
