import { test , moduleForComponent } from 'appkit/tests/helpers/module-for';
import BayeuxStub from 'appkit/tests/helpers/bayeux-stub';
import FeedWidgetComponent from 'appkit/components/feed-widget';

moduleForComponent('feed-widget', 'Unit - Feed widget component', {
  subject: function() {
    var obj = FeedWidgetComponent.create({
      bayeux: new BayeuxStub(),
      channel: 'awesome-feed'
    });
    return obj;
  }
});

test('it exists', function() {
  ok(this.subject() instanceof FeedWidgetComponent);
});

test('updating contents preserves existing items', function() {
  this.subject().updateContents([
    {id: '1', name: 'Meep'},
    {id: '2', name: 'Meep'},
    {id: '3', name: 'Meep'}
  ]);
  var initialContents = this.subject().get('contents').toArray();
  this.subject().updateContents([
    {id: '3', name: 'Bunsen'},
    {id: '4', name: 'Bunsen'}
  ]);
  var updatedContents = this.subject().get('contents').toArray();
  equal(updatedContents.objectAt(0).get('id'), '1');
  equal(updatedContents.objectAt(1).get('id'), '2');
  equal(updatedContents.objectAt(2).get('id'), '3');
  equal(updatedContents.objectAt(2).get('name'), 'Meep', 'Name should not have changed.');
  equal(updatedContents.objectAt(3).get('id'), '4');
});

test('updating contents maintains item limit', function() {
  this.subject().updateContents([
    {id: '1', name: 'Meep'},
    {id: '2', name: 'Meep'},
    {id: '3', name: 'Meep'},
    {id: '4', name: 'Meep'},
    {id: '5', name: 'Meep'},
    {id: '6', name: 'Meep'}
  ]);
  var contents = this.subject().get('contents').toArray();
  equal(contents.get('length'), 5);
});
