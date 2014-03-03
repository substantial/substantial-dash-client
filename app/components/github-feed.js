import DashboardWidgetComponent from 'appkit/components/dashboard-widget';

var GithubFeedComponent = DashboardWidgetComponent.extend({

  init: function() {
    this._super();
    this.set("contents", Ember.A());
  },

  actions: {
    receiveEvent: function(data) {
      var items = Ember.A(JSON.parse(data));
      var contents = this.get("contents");
      contents.clear();
      items.slice(0,3).forEach(function(item) {
        Ember.Logger.info(item);
        contents.pushObject(Ember.Object.create(item));
      });
    }
  }

});

export default GithubFeedComponent;
