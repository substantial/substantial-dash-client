// A wrapper view that rerenders itself periodically; by
// default every thirty-seconds.
//
// Use to recalculate constantly changing values, like
// a relative time "five minutes ago":
//
//     {{#view "interval-rerender" tagName="time"}}
//       {{time-ago-in-words aTimeProperty}}
//     {{/view}}
//
var IntervalRerenderView = Ember.View.extend({

  intervalSecs: 30,

  template: Ember.Handlebars.compile('{{yield}}'),

  tick: function() {
    var intervalMs = 1000 * this.get("intervalSecs");
    var nextTick = Ember.run.later(this, function() {
      if (this.isDestroying) {
        return;
      }
      this.rerender();
    }, intervalMs);
    this.set("nextTick", nextTick);
  },

  didInsertElement: function() {
    this.tick();
  },

  willClearRender: function() {
    var nextTick = this.get('nextTick');
    Ember.run.cancel(nextTick);
  }

});

export default IntervalRerenderView;
