import BayeuxSubscriber from 'appkit/mixins/bayeux-subscriber';

var IcalendarUpcomingController = Ember.ArrayController.extend(BayeuxSubscriber, {
  channel: "icalendar-upcoming",

  init: function() {
    this._super();
    this.set("contents", Ember.A());
  },

  actions: {
    receiveEvent: function(data) {
      var items = Ember.A(JSON.parse(data));
      var contents = this.get("contents");
      contents.clear();
      items.slice(0,5).forEach(function(item) {
        contents.pushObject(Ember.Object.create(item));
      });
    }
  }
});

export default IcalendarUpcomingController;
