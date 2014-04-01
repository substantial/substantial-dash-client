import { test , moduleFor } from 'appkit/tests/helpers/module-for';

import PipedriveDealsController from 'appkit/pods/pipedrive-deals/controller';
import BayeuxStub from 'appkit/tests/helpers/bayeux-stub';

moduleFor('controller:pods/pipedrive-deals', 'Unit - Pipedrive Deals controller', {
  subject: function() {
    var obj = PipedriveDealsController.create({
      bayeux: new BayeuxStub(),
      channel: 'awesome-deals'
    });
    return obj;
  }
});

test('it exists', function() {
  ok(this.subject() instanceof PipedriveDealsController);
});

test('it receives data and sets contents', function() {
	var data = '[{"stage_name":"Opportunity","filters":' + 
                '[{"name":"Substantial","dollar_value":1217000,"deal_count":29},' + 
                '{"name":"SF","dollar_value":300000,"deal_count":8}]' +
              '},' +
              '{"stage_name":"Qualified","filters":' +
                '[{"name":"Substantial","dollar_value":0,"deal_count":29},' +
                '{"name":"SF","dollar_value":0,"deal_count":8}]' +
              '}]';
	this.subject().send('receiveEvent', data);
	equal(this.subject().get('contents.firstObject.stage_name'), 'Opportunity');
});
