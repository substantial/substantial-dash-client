import { test , moduleFor } from 'appkit/tests/helpers/module-for';

import ServerListener from 'appkit/models/server-listener';

moduleFor('model:server-listener', "Unit - ServerListener", {
  subject: function() {
    return ServerListener.create({
      connect: function() {}
    });
  }
});

test("it exists", function() {
  ok(this.subject() instanceof ServerListener);
});
