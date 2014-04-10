// A clock that 
//
// Based on "Continous Redrawing of Objects"
// http://emberjs.com/guides/cookbook/working_with_objects/continuous_redrawing_of_views/
//
// Set set a computed property's dependent key to "clock.pulse" to refresh
// it periodically.
//
var Clock = Ember.Object.extend({
  pulse: Ember.computed.oneWay('moment').readOnly(),
  periodMs: 5000,
  moment: null,

  // The recursively called clockwork.
  _tick: function() {
    var _this = this;
    var clock = this;
    var now = window.moment();
    clock.set('moment', now);
    // This should be the idiomatic `Ember.run.later` but that
    // blocks acceptance tests. This is a workaround from
    // https://github.com/emberjs/ember.js/issues/3008
    setTimeout(function() {
      Ember.run(_this, _this._tick);
    }, this.get('periodMs'));
  }.on('init')
});

export default Clock;
