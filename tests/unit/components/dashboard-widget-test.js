import { test , moduleForComponent } from 'appkit/tests/helpers/module-for';
import DashboardWidgetComponent from 'appkit/components/dashboard-widget';

var component;

moduleForComponent('dashboard-widget', 'Unit - Dashboard widget component', {
  subject: function() {
    var obj = DashboardWidgetComponent.create({
      // replace Server-Sent-Event code with a stub
      serverListenerConnect: sinon.stub()
    });
    return obj;
  }
});

test('it exists', function() {
  ok(this.subject() instanceof DashboardWidgetComponent);
});
