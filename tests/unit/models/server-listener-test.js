import { test , moduleFor } from 'appkit/tests/helpers/module-for';

import ServerListener from 'appkit/models/server-listener';

moduleFor('model:server-listener', "Unit - ServerListener", {
  subject: function() {
    var obj = Ember.Object.createWithMixins(ServerListener, {
      // replace Server-Sent-Event code with a stub
      serverListenerConnect: sinon.stub()
    });
    return obj;
  }
});

test("it exists", function() {
  ok(!Ember.isEmpty(this.subject().get("serverListenerBaseUrl")));
});
