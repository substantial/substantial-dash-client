var FayeClientInitializer = {
  name: "faye-client",
  after: "authentication",

  initialize: function(container, application) {
    var auth = container.lookup('auth:main');
    // Skip Faye/bayeux setup unless authentication has been registered.
    if (!Ember.isEmpty(auth)) {
      var client = new window.Faye.Client(window.ENV.api_base_url + "/bayeux");
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
};

export default FayeClientInitializer;
