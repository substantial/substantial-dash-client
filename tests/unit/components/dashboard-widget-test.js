import { test , moduleForComponent } from 'appkit/tests/helpers/module-for';
import BayeuxStub from 'appkit/tests/helpers/bayeux-stub';
import DashboardWidgetComponent from 'appkit/components/dashboard-widget';

moduleForComponent('dashboard-widget', 'Unit - Dashboard widget component', {
  subject: function() {
    var obj = DashboardWidgetComponent.create({
      bayeux: new BayeuxStub(),
      channel: 'awesome-metrics'
    });
    return obj;
  }
});

test('it exists', function() {
  ok(this.subject() instanceof DashboardWidgetComponent);
});

test('it subscribes using #bayeux', function() {
  ok(this.subject().get('bayeux').subscribe.calledOnce);
});

test('it subscribes to #channel', function() {
  ok(this.subject().get('bayeux').subscribe.calledWith("/awesome-metrics"));
});
