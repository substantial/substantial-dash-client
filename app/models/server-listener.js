var ServerListener = Ember.Mixin.create({

  init: function() {
    this._super();
    this.serverListenerConnect();
  },

  serverListenerConnect: function() {
    var _this = this;
    var connection = new window.EventSource(
      this.get("serverListenerBaseUrl") + this.get("serverListenerUri"),
      { withCredentials: true }
    );
    this.set("connection", connection);

    connection.addEventListener('open', function() {
      Ember.Logger.info('ServerListener Open');
    }, false);

    connection.addEventListener('error', function(error) {
      Ember.Logger.error('ServerListener Error', error);
    }, false);

    connection.addEventListener('message', function(message) {
      Ember.Logger.info('ServerListener Received', message);
    }, false);

    // listen on the specific event channel
    var channel = this.get("channel");
    if (channel) {
      connection.addEventListener(channel, function(message) {
        Ember.Logger.info('ServerListener Received on Channel', channel, message);
        _this.serverListenerReceive(message.data);
      }, false);
    }
  },

  serverListenerBaseUrl: function() {
    // FIXME port number hack for development
    return location.protocol + "//" + location.hostname + ":8001"; 
  }.property(),

  serverListenerUri: function() {
    var channel = this.get("channel");
    return "/intakes/" + channel + "/subscribe";
  }.property("channel"),

  serverListenerReceive: function(data) {
    this.send("receiveEvent", data);
  }

});

export default ServerListener;
