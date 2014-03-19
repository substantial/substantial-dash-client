var DashboardWidgetComponent = Ember.Component.extend({
  title: null,
  channel: null,
  
  // Injected from the Application initializer.
  auth: null,
  bayeux: null,
  // Internal record of the current bayeux#subscribe.
  _subscription: null,
  _personalSubscription: null,

  init: function() {
    this._super();
    this.bayeuxSubscribe();
  },

  bayeuxChannel: function() {
    return '/'+this.get("channel");
  }.property("channel"),

  bayeuxPersonalChannel: function() {
    return '/personal/'+encodeURIComponent(this.get("auth.apiKey"))+this.get("bayeuxChannel");
  }.property("auth.apiKey", "bayeuxChannel"),

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

    var bayeuxPersonalChannel = this.get("bayeuxPersonalChannel");
    var _personalSubscription = bayeux.subscribe(bayeuxPersonalChannel, function(message) {
      _this.send("receiveEvent", message);
    }).then(function () {
      Ember.Logger.debug("bayeux subscribed to `"+bayeuxPersonalChannel+"`");

      var bayeuxChannel = _this.get("bayeuxChannel");
      var _subscription = bayeux.subscribe(bayeuxChannel, function(message) {
        _this.send("receiveEvent", message);
      }).then(function () {
        Ember.Logger.debug("bayeux subscribed to `"+bayeuxChannel+"`");
        _this.set("_subscription", _subscription);
      }, function(error) {
        Ember.Logger.error("bayeux subscribe failed to `"+bayeuxChannel+"`", error);
      });
      _this.set("_personalSubscription", _personalSubscription);

    }, function(error) {
      Ember.Logger.error("bayeux subscribe failed to `"+bayeuxPersonalChannel+"`", error);
    });
  }
});

export default DashboardWidgetComponent;
