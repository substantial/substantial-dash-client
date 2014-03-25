import { test , moduleForComponent } from 'appkit/tests/helpers/module-for';
import BayeuxStub from 'appkit/tests/helpers/bayeux-stub';
import GithubTeamNoticesComponent from 'appkit/components/github-team-notices';

moduleForComponent('github-team-notices', 'Unit - GitHub Team Notices component', {
  subject: function() {
    var obj = GithubTeamNoticesComponent.create({
      bayeux: new BayeuxStub(),
      channel: 'awesome-team-notices'
    });
    return obj;
  }
});

test('it exists', function() {
  ok(this.subject() instanceof GithubTeamNoticesComponent);
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
