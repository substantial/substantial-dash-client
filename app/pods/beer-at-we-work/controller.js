import BayeuxSubscriber from 'appkit/mixins/bayeux-subscriber';

var BeerAtWeWorkController = Ember.ArrayController.extend(BayeuxSubscriber, {
  channel: "beer-at-we-work",

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

export default BeerAtWeWorkController;
