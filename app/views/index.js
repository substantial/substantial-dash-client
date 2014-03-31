var IndexView = Ember.View.extend({
  classNames: ["dashboard"],

  didInsertElement: function() {
    var el = this.get('element');
    $(".gridster ul", el).gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [100, 100]
    });
  }
});

export default IndexView;
