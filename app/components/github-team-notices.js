import DashboardWidgetComponent from 'appkit/components/dashboard-widget';

var GithubTeamNotices = DashboardWidgetComponent.extend({

  init: function() {
    this._super();
    this.set("contents", []);
  },

  actions: {
    receiveEvent: function(data) {
      var items = Ember.A(JSON.parse(data));
      this.updatePullRequests(items.pull_requests);
      // eventually Issues too
    }
  },

  updatePullRequests: function(items) {
    var contents = this.get("contents");
    if (!Ember.isEmpty(items)) {

      // Remove items that have disappeared.
      var itemsToRemove = [];
      contents.forEach(function(existingItem) {
        var isNotPresent = !items.findBy("url", existingItem.get("url"));
        if (isNotPresent) {
          itemsToRemove.pushObject(existingItem);
        }
      });
      contents.removeObjects(itemsToRemove);

      // Process current items.
      items.forEach(function(item) {
        var existingItem = contents.findBy("url", item.url);
        if (Ember.isEmpty(existingItem)) {
          // Add new items.
          var newItem = contents.pushObject(Ember.Object.create(item));
          newItem.set("dashEventType", "Pull Request");
        } else {
          // Update existing items.
          existingItem.setProperties(item);
        }
      });
    }
  }

});

export default GithubTeamNotices;
