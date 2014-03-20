// Based on "Continous Redrawing of Objects"
// http://emberjs.com/guides/cookbook/working_with_objects/continuous_redrawing_of_views/
//
// #pulse is updated every ~15-seconds
//
var ClockService = Ember.Object.extend({
  pulse: Ember.computed.oneWay('_minutes').readOnly(),
  tick: function () {
    var clock = this;
    Ember.run.later(function () {
      var minutes = clock.get('_minutes');
      if (typeof minutes === 'number') {
        clock.set('_minutes', minutes + (1/4));
      }
    }, 15000);
  }.observes('_minutes').on('init'),
  _minutes: 0
});

var ClockServiceInitializer = {
  name: "clock-service",

  initialize: function(container, application) {
    container.register('clock:service', ClockService, { singleton: true });
    application.inject('view', 'clock', 'clock:service');
  }
};

export default ClockServiceInitializer;
