import ServerListener from 'appkit/models/server-listener';

var DashboardWidgetComponent = Ember.Component.extend(ServerListener, {
  title: null,
  channel: null
});

export default DashboardWidgetComponent;
