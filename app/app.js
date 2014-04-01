import Resolver from 'ember/resolver';
import AuthenticationInitalizer from 'appkit/initializers/authentication';
import FayeClientInitalizer from 'appkit/initializers/faye-client';
import ClockServiceInitalizer from 'appkit/initializers/clock-service';

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit',
  podModulePrefix: 'appkit/pods',
  Resolver: Resolver['default']
});

App.initializer(AuthenticationInitalizer);
App.initializer(FayeClientInitalizer);
App.initializer(ClockServiceInitalizer);

export default App;
