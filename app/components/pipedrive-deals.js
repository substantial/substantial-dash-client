import DashboardWidgetComponent from 'appkit/components/dashboard-widget';

var PipedriveDealsComponent = DashboardWidgetComponent.extend({

  init: function() {
    this._super();
    this.set("contents", []);
  },

  actions: {
    receiveEvent: function(data) {
      var items = Ember.A(JSON.parse(data));
      var contents = this.get("contents");
      contents.clear();
      items.forEach(function(item) {        
        contents.pushObject(Ember.Object.create(item));
      });
    }
  }

});

export default PipedriveDealsComponent;
