var RelativeTimeView = Ember.View.extend({

  tagName: 'time',
  templateName: 'relative-time',
  pulseBinding: 'clock.pulse',

  time: null,

  timeInWords: function() {
    var time = this.get('time');
    return window.moment(time).fromNow();
  }.property("time", "pulse")

});

export default RelativeTimeView;
