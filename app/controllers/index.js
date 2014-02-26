import ServerListener from 'appkit/models/server-listener';

var IndexController = Ember.ObjectController.extend({

  init: function() {
    this._super();
    this.initServerListener();
  },

  actions: {
    receiveEvent: function(data) {
      Ember.Logger.info("IndexController#receiveEvent", data);
    }
  },

  initServerListener: function() {
    var serverListener = ServerListener.create({
      recipient: this
    });
    this.set("serverListener", serverListener);
  }

});

export default IndexController;
