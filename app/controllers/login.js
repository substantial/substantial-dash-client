var LoginController = Ember.ObjectController.extend({

  providers: function() {
    return window.ENV.auth_providers;
  }.property()

});

export default LoginController;
