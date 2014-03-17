import Resolver from 'ember/resolver';
import AuthenticationInitalizer from 'appkit/initializers/authentication';
import FayeClientInitalizer from 'appkit/initializers/faye-client';

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver['default']
});

App.initializer(AuthenticationInitalizer);
App.initializer(FayeClientInitalizer);

export default App;
