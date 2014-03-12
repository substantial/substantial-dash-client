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
    {id: '3', name: 'Meep'},
    {id: '2', name: 'Meep'},
    {id: '1', name: 'Meep'}
  ]);
  var initialContents = this.subject().get('contents').toArray();
  this.subject().updateContents([
    {id: '4', name: 'Bunsen'},
    {id: '3', name: 'Bunsen'}
  ]);
  var updatedContents = this.subject().get('contents').toArray();
  equal(updatedContents.objectAt(0).get('id'), '4');
  equal(updatedContents.objectAt(1).get('id'), '3');
  equal(updatedContents.objectAt(2).get('id'), '2');
  equal(updatedContents.objectAt(3).get('id'), '1');
  equal(updatedContents.objectAt(3).get('name'), 'Meep', 'Name should not have changed.');
});

test('updating contents pushes out older items', function() {
  this.subject().updateContents([
    {id: '9', name: 'Meep'},
    {id: '8', name: 'Meep'},
    {id: '7', name: 'Meep'},
    {id: '6', name: 'Meep'},
    {id: '5', name: 'Meep'},
    {id: '4', name: 'Meep'},
    {id: '3', name: 'Meep'},
    {id: '2', name: 'Meep'},
    {id: '1', name: 'Meep'}
  ]);
  var initialContents = this.subject().get('contents').toArray();
  this.subject().updateContents([
    {id: '16', name: 'Bunsen'},
    {id: '15', name: 'Bunsen'},
    {id: '14', name: 'Bunsen'},
    {id: '13', name: 'Bunsen'},
    {id: '12', name: 'Bunsen'},
    {id: '11', name: 'Bunsen'},
    {id: '10', name: 'Bunsen'},
    {id: '9', name: 'Meep'},
    {id: '8', name: 'Meep'},
    {id: '7', name: 'Meep'}
  ]);
  var updatedContents = this.subject().get('contents').toArray();
  equal(updatedContents.objectAt(0).get('id'), '16');
  equal(updatedContents.objectAt(1).get('id'), '15');
  equal(updatedContents.objectAt(2).get('id'), '14');
  equal(updatedContents.objectAt(3).get('id'), '13');
  equal(updatedContents.objectAt(4).get('id'), '12');
});

test('updating contents maintains item limit', function() {
  this.subject().updateContents([
    {id: '6', name: 'Meep'},
    {id: '5', name: 'Meep'},
    {id: '4', name: 'Meep'},
    {id: '3', name: 'Meep'},
    {id: '2', name: 'Meep'},
    {id: '1', name: 'Meep'}
  ]);
  var contents = this.subject().get('contents').toArray();
  equal(contents.get('length'), 5);
});
