import { test , moduleFor } from 'appkit/tests/helpers/module-for';

import BeerAtWeWorkController from 'appkit/pods/beer-at-we-work/controller';
import BayeuxStub from 'appkit/tests/helpers/bayeux-stub';

moduleFor('controller:pods/beer-at-we-work', 'Unit - Beer at WeWork controller', {
  subject: function() {
    var obj = BeerAtWeWorkController.create({
      bayeux: new BayeuxStub(),
      channel: 'awesome-beer'
    });
    return obj;
  }
});

test('it exists', function() {
  ok(this.subject() instanceof BeerAtWeWorkController);
});

test('it receives data and sets contents', function() {
  var data = '[{'+
      '"floor":7,"name":"Negra Modelo Dark 5.4%"'+
    '},{'+
      '"floor":6,"name":"Boont Amber Ale 5.8%"'+
    '},{'+
      '"floor":5,"name":"Negra Modelo Dark 5.4%"'+
    '},{'+
      '"floor":4,"name":"Sierra Nevada Pale Ale 5.6%"'+
    '},{'+
      '"floor":2,"name":"Bass Pale Ale 5.0%"'+
  '}]';
  this.subject().send('receiveEvent', data);
  equal(this.subject().get('contents.firstObject.floor'), '7');
});
