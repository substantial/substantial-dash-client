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
    this.set("contents", []);
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
    var newContents = [];
    var itemsLimit = this.get("itemsLimit");
    var itemIdProperty = this.get("itemIdProperty");

    // collect new items
    items.forEach(function(item) {
      var id = Ember.get(item, itemIdProperty);
      if (Ember.isEmpty(id) || !contents.isAny(itemIdProperty, id)) {
        newContents.pushObject(Ember.Object.create(item));
      }
    });

    // prepend the new items onto the contents
    contents.unshiftObjects(newContents);

    // slice off items beyond the limit
    var length = contents.get("length");
    if (length > itemsLimit) {
      contents.removeAt(5, length-1);
    }
  }

});

export default FeedWidgetComponent;
