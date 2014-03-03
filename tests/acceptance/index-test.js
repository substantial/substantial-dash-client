import ServerListener from 'appkit/models/server-listener';

var App;

module('Acceptances - Index', {
  setup: function(){
    ServerListener.reopen({
      serverListenerConnect: sinon.stub()
    });
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('index renders', function(){
  expect(1);

  visit('/').then(function(){
    ok(true);
  });
});
