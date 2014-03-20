// Based on "Continous Redrawing of Objects"
// http://emberjs.com/guides/cookbook/working_with_objects/continuous_redrawing_of_views/
//
// #pulse is updated every ~15-seconds
//
var ClockService = Ember.Object.extend({
  pulse: Ember.computed.oneWay('_minutes').readOnly(),
  tick: function () {
    var clock = this;
    // This should be the idiomatic `Ember.run.later` but that
    // blocks acceptance tests. This is a workaround from
    // https://github.com/emberjs/ember.js/issues/3008
    setTimeout(function() {
      Em.run(function() {
        var minutes = clock.get('_minutes');
        if (typeof minutes === 'number') {
          clock.set('_minutes', minutes + (1/4));
        }
      })
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
