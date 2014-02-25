import { test , moduleForComponent } from 'appkit/tests/helpers/module-for';
import DashboardWidgetComponent from 'appkit/components/dashboard-widget';

var component;

moduleForComponent('dashboard-widget', 'Unit - Dashboard widget component', 
                   {
  setup: function() {
    component = this.subject();
  }
});

test('Write a test here', function() {
  ok( true, 'Implement Me' );
});
