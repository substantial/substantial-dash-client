// Mock Faye/bayeux; avoid network calls.
//
var BayeuxStub = function() {
  var bayeuxStub = {};
  var methods = ['subscribe', 'publish'];
  methods.forEach(function(method) {
    bayeuxStub[method] = Ember.K;
    sinon.stub(bayeuxStub, method, function() {
      var promiseStub = { then: Ember.K };
      sinon.stub(promiseStub, 'then');
      return promiseStub;
    });
  });
  return bayeuxStub;
};

export default BayeuxStub;
