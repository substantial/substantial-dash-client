import { test , moduleFor } from 'appkit/tests/helpers/module-for';

import LoginController from 'appkit/controllers/login';

moduleFor('controller:login', 'Unit - Login controller');

test('it exists', function() {
  ok(this.subject() instanceof LoginController);
});

test('it has #providers', function() {
  var providers = this.subject().get('providers');
  ok(Ember.isArray(providers));
});

test('first provider is Google Apps', function() {
  var providers = this.subject().get('providers');
  equal(providers.get("firstObject.name"), "Google Apps");
  equal(providers.get("firstObject.id"), "google_apps");
});
