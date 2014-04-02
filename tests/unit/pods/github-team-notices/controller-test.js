import { test , moduleFor } from 'appkit/tests/helpers/module-for';

import GithubTeamNoticesController from 'appkit/pods/github-team-notices/controller';
import BayeuxStub from 'appkit/tests/helpers/bayeux-stub';

moduleFor('controller:pods/github-team-notices', 'Unit - GitHub Team Notices controller', {
  subject: function() {
    var obj = GithubTeamNoticesController.create({
      bayeux: new BayeuxStub(),
      channel: 'awesome-team-notices'
    });
    return obj;
  }
});

test('it exists', function() {
  ok(this.subject() instanceof GithubTeamNoticesController);
});

test('it receives data and sets contents', function() {
  var data = '{ "pull_requests": ['+
      '{ '+
        '"head": { "repo": { "name": "project-awesomeness" }}, '+
        '"title": "Make The Logo Bigger", '+
        '"updated_at": "'+window.moment().toISOString()+'" '+
      '}'+
    ']}';
  this.subject().send('receiveEvent', data);
  equal(this.subject().get('contents.firstObject.dashEventType'), 'Pull Request');
  equal(this.subject().get('contents.firstObject.title'), 'Make The Logo Bigger');
});
