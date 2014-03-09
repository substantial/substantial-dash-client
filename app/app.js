import Resolver from 'ember/resolver';

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
  name: "faye-client",

  initialize: function(container, application) {
    var client = new window.Faye.Client("http://0.0.0.0:8001/bayeux");
    application.register('faye-client:main', client, { instantiate: false });
    application.inject('controller', 'bayeux', 'faye-client:main');
  }
});

export default App;
