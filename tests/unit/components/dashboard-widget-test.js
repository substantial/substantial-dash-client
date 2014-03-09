import { test , moduleForComponent } from 'appkit/tests/helpers/module-for';
import DashboardWidgetComponent from 'appkit/components/dashboard-widget';

moduleForComponent('dashboard-widget', 'Unit - Dashboard widget component', {
  subject: function() {
    var bayeuxStub = { subscribe: Ember.K };
    var subscribeStub = sinon.stub(bayeuxStub, 'subscribe', function() {
      var subscribedStub = { then: Ember.K };
      sinon.stub(subscribedStub, 'then');
      return subscribedStub;
    });

    var obj = DashboardWidgetComponent.create({
      bayeux: bayeuxStub,
      channel: '/awesome-metrics'
    });
    return obj;
  }
});

test('it exists', function() {
  ok(this.subject() instanceof DashboardWidgetComponent);
});

test('subscribes to its channel', function() {
  ok(this.subject().get('bayeux').subscribe.calledOnce);
});
