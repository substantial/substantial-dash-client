import { test , moduleFor } from 'appkit/tests/helpers/module-for';

import Index from 'appkit/routes/index';

moduleFor('route:index', "Unit - IndexRoute");

test("it exists", function(){
  ok(this.subject() instanceof Index);
});
