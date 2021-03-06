var EventHotnessView = Ember.View.extend({
  classNameBindings: ['timeTemperature'],
  pulseBinding: 'clock.pulse',

  time: null,

  timeTemperature: function() {
    var time = this.get("time");
    var now = window.moment();
    var diffSecs = window.moment(time).diff(now);
    var temperature = null;
    if (diffSecs < 300000) {
      temperature = "hot";
    } else if (diffSecs < 7200000) {
      temperature = "warm";
    } else if (diffSecs < 86400000*2) {
      temperature = "cool";
    } else {
      temperature = "cold";
    }
    return temperature;
  }.property("time", "pulse")
});

export default EventHotnessView;
