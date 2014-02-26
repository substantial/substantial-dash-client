var Router = Ember.Router.extend({
  rootURL: '/#dashboard'
});

Router.map(function() {
  this.route('component-test');
  this.route('helper-test');
  this.route('dashboard');
  // this.resource('posts', function() {
  //   this.route('new');
  // });
});

export default Router;
