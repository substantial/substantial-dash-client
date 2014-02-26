var ServerListener = Ember.Object.extend({

  init: function() {
    this.connect();
  },

  connect: function() {
    var _this = this;
    var connection = new window.EventSource(
      this.get("baseUrl") + this.get("uri"),
      { withCredentials: true }
    );
    this.set("connection", connection);

    connection.onopen = function() {};

    connection.onerror = function(error) {
      Ember.Logger.error('ServerListener Error', error); 
    };

    connection.onmessage = function(message) {
      Ember.Logger.info('ServerListener Received', message);
      _this.receive(message.data);
    };
  },

  baseUrl: function() {
    return location.protocol + "//" + location.hostname + ":8001";
  }.property(),

  uri: function() {
    return "/dashboards/broadcast";
  }.property(),

  receive: function(data) {
    var recipient = this.get("recipient");
    recipient.send("receiveEvent", data);
  }

});

export default ServerListener;
