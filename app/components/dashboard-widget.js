var DashboardWidgetComponent = Ember.Component.extend({
  title: null,
  channel: null,
  
  // Injected from the Application initializer.
  bayeux: null,
  // Internal record of the current bayeux#subscribe.
  _subscription: null,

  init: function() {
    this._super();
    this.bayeuxSubscribe();
  },

  bayeuxSubscribe: function() {
    var _this = this;
    var bayeux = this.get("bayeux");
    var channel = this.get("channel");
    if (Ember.isEmpty(bayeux)) {
      Ember.Logger.error("A `bayeux` is required. Did you pass it into the component?");
      return;
    }
    if (Ember.isEmpty(channel)) {
      Ember.Logger.error("A `channel` is required. Did you pass it into the component?");
      return;
    }
    var _subscription = bayeux.subscribe('/'+channel, function(message) {
      _this.send("receiveEvent", message);
    }).then(function () {
      Ember.Logger.debug("bayeux subscribed to `/"+channel+"`");
    }, function(error) {
      Ember.Logger.error("bayeux subscribe failed to `/"+channel+"`", error);
    });
    this.set("_subscription", _subscription);
  }
});

export default DashboardWidgetComponent;
