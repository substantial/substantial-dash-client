import DashboardWidgetComponent from 'appkit/components/dashboard-widget';

// Display a chronological history of items.
//
// The feed is expected to simply append/push new items onto
// the list. Existing items are not updated.
//
var FeedWidgetComponent = DashboardWidgetComponent.extend({

  // Number of items shown in the feed.
  itemsLimit: 5,
  // Property name used to identify existing items.
  itemIdProperty: "id",

  init: function() {
    this._super();
    this.set("contents", Ember.A());
  },

  actions: {
    receiveEvent: function(data) {
      this.updateContents(data);
    }
  },


  // Items should have a persistent #id property (so that 
  // the view can persist items by identity.)
  //
  updateContents: function(data) {
    var items = Ember.isArray(data) ? data : JSON.parse(data);
    var contents = this.get("contents");
    var itemsLimit = this.get("itemsLimit");
    var itemIdProperty = this.get("itemIdProperty");

    items.forEach(function(item) {
      var id = Ember.get(item, itemIdProperty);
      if (Ember.isEmpty(id) || !contents.isAny(itemIdProperty, id)) {
        contents.pushObject(Ember.Object.create(item));
      }
    });

    var length = contents.get("length");
    if (length > itemsLimit) {
      contents.removeAt(5, length-5);
    }
  }

});

export default FeedWidgetComponent;
