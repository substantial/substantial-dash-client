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
	var data = '[{ "name" : "Sales" }]';
	this.subject().send('receiveEvent', data);
	equal(this.subject().get('contents.0.name'), 'Sales');
});
