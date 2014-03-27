import { test , moduleForComponent } from 'appkit/tests/helpers/module-for';
import BayeuxStub from 'appkit/tests/helpers/bayeux-stub';
import PipedriveDealsComponent from 'appkit/components/pipedrive-deals';

moduleForComponent('dashboard-widget', 'Unit - Pipedrive Deals component', {
  subject: function() {
    var obj = PipedriveDealsComponent.create({
      bayeux: new BayeuxStub(),
      channel: 'awesome-deals'
    });
    return obj;
  }
});

test('it exists', function() {
  ok(this.subject() instanceof PipedriveDealsComponent);
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
	equal(this.subject().get('contents.0.stage_name'), 'Opportunity');
});
