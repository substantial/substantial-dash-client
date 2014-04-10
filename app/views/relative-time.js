var RelativeTimeView = Ember.View.extend({

  tagName: 'time',
  template: Ember.Handlebars.compile('{{view.timeInWords}}'),
  pulseBinding: 'clock.pulse',

  time: null,

  timeInWords: function() {
    var time = this.get('time');
    return window.moment(time).fromNow();
  }.property("time", "pulse")

});

export default RelativeTimeView;
