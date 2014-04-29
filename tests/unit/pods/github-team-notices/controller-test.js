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

test('it updates existing contents', function() {
  var data = '{ "pull_requests": ['+
      '{ '+
        '"id": "554", '+
        '"head": { "repo": { "name": "project-foobar" }}, '+
        '"title": "Deploy Foo", '+
        '"updated_at": "'+window.moment().toISOString()+'" '+
      '},'+
      '{ '+
        '"id": "555", '+
        '"head": { "repo": { "name": "project-awesomeness" }}, '+
        '"title": "Make The Logo Bigger", '+
        '"updated_at": "'+window.moment().toISOString()+'" '+
      '}'+
    ']}';
  this.subject().send('receiveEvent', data);
  equal(this.subject().get('contents.1.title'), 'Make The Logo Bigger');
  data = '{ "pull_requests": ['+
      '{ '+
        '"id": "554", '+
        '"head": { "repo": { "name": "project-foobar" }}, '+
        '"title": "Deploy Foo", '+
        '"updated_at": "'+window.moment().toISOString()+'" '+
      '},'+
      '{ '+
        '"id": "555", '+
        '"head": { "repo": { "name": "project-awesomeness" }}, '+
        '"title": "Make The Logo Even Bigger", '+
        '"updated_at": "'+window.moment().toISOString()+'" '+
      '}'+
    ']}';
  this.subject().send('receiveEvent', data);
  equal(this.subject().get('contents.1.title'), 'Make The Logo Even Bigger');
});

test('it adds new contents', function() {
  var data = '{ "pull_requests": ['+
      '{ '+
        '"id": "554", '+
        '"head": { "repo": { "name": "project-foobar" }}, '+
        '"title": "Deploy Foo", '+
        '"updated_at": "'+window.moment().toISOString()+'" '+
      '}'+
    ']}';
  this.subject().send('receiveEvent', data);
  equal(this.subject().get('contents.length'), 1);
  data = '{ "pull_requests": ['+
      '{ '+
        '"id": "554", '+
        '"head": { "repo": { "name": "project-foobar" }}, '+
        '"title": "Deploy Foo", '+
        '"updated_at": "'+window.moment().toISOString()+'" '+
      '},'+
      '{ '+
        '"id": "555", '+
        '"head": { "repo": { "name": "project-awesomeness" }}, '+
        '"title": "Make The Logo Bigger", '+
        '"updated_at": "'+window.moment().toISOString()+'" '+
      '}'+
    ']}';
  this.subject().send('receiveEvent', data);
  equal(this.subject().get('contents.length'), 2);
});

test('it clears contents', function() {
  var data = '{ "pull_requests": ['+
      '{ '+
        '"id": "554", '+
        '"head": { "repo": { "name": "project-foobar" }}, '+
        '"title": "Deploy Foo", '+
        '"updated_at": "'+window.moment().toISOString()+'" '+
      '},'+
      '{ '+
        '"id": "555", '+
        '"head": { "repo": { "name": "project-awesomeness" }}, '+
        '"title": "Make The Logo Bigger", '+
        '"updated_at": "'+window.moment().toISOString()+'" '+
      '}'+
    ']}';
  this.subject().send('receiveEvent', data);
  ok(!Ember.isEmpty(this.subject().get('contents')), "should not be empty");
  data = '{ "pull_requests": []}';
  this.subject().send('receiveEvent', data);
  ok(Ember.isEmpty(this.subject().get('contents')), "should be empty");
});
