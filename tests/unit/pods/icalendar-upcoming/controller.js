import { test , moduleFor } from 'appkit/tests/helpers/module-for';

import IcalendarUpcomingController from 'appkit/pods/icalendar-upcoming/controller';
import BayeuxStub from 'appkit/tests/helpers/bayeux-stub';

moduleFor('controller:pods/icalendar-upcoming', 'Unit - iCalendar Upcoming controller', {
  subject: function() {
    var obj = IcalendarUpcomingController.create({
      bayeux: new BayeuxStub(),
      channel: 'awesome-events'
    });
    return obj;
  }
});

test('it exists', function() {
  ok(this.subject() instanceof IcalendarUpcomingController);
});

test('it receives data and sets contents', function() {
  var data = '[{'+
      '"summary":"SF Standup","description":"","location":"","starts_at":"2014-04-02T11:45:00-07:00","ends_at":"2014-04-02T12:00:00-07:00"'+
    '},{'+
      '"summary":"Weekly Happy Hour!","description":"","location":"","starts_at":"2014-04-02T17:00:00-07:00","ends_at":"2014-04-02T18:00:00-07:00"'+
    '},{'+
      '"summary":"SF Standup","description":"","location":"","starts_at":"2014-04-03T11:45:00-07:00","ends_at":"2014-04-03T12:00:00-07:00"'+
    '},{'+
      '"summary":"SF Standup","description":"","location":"","starts_at":"2014-04-04T11:45:00-07:00","ends_at":"2014-04-04T12:00:00-07:00"'+
    '},{'+
      '"summary":"SF Standup","description":"","location":"","starts_at":"2014-04-07T11:45:00-07:00","ends_at":"2014-04-07T12:00:00-07:00"}'+
  ']';
  this.subject().send('receiveEvent', data);
  equal(this.subject().get('contents.firstObject.summary'), 'SF Standup');
});
