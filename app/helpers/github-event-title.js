// Generates human-readable, hyperlinked titles for GitHub events:
// https://developer.github.com/v3/activity/events/types/
//
export default Ember.Handlebars.makeBoundHelper(function(ev) {
  if (Ember.isEmpty(ev)) {
    return "";
  }
  var title, comment;
  // function shortcut: fetch nested properties from any object
  var get = Ember.get;
  // function shortcut: HTML encode user input
  var h = Ember.Handlebars.Utils.escapeExpression;
  var type = get(ev, "type");
  var payload = get(ev, "payload");
  switch (type) {

    case "PushEvent": 
      var commitCount = get(payload, "commits.length");
      title = "pushed " + commitCount + " " + (commitCount === 1 ? "commit" : "commits");
      break;

    case "PullRequestEvent":
      var action = get(payload, "action");
      var pullRequest = get(payload, "pull_request");
      title = h(action) + " pull request<br>" + 
          "<a href='" + h(get(pullRequest, "_links.html.href")) + "'>" + 
            h(get(pullRequest, "title")) + 
          "</a>";
      break;

    case "CreateEvent": 
      title = "created " + h(get(payload, "ref_type")) + " " + h(get(payload, "ref"));
      break;
    case "DeleteEvent": 
      title = "deleted " + h(get(payload, "ref_type")) + " " + h(get(payload, "ref"));
      break;

    case "IssueCommentEvent":
      comment = get(payload, "comment");
      var issue = get(payload, "issue");
      title = "commented on issue: " + 
        "<a href='" + h(get(comment, "html_url")) + "'>" + 
          h(get(issue, "title")) + 
        "</a>";
      break;
    case "CommitCommentEvent":
      comment = get(payload, "comment");
      title = "<a href='" + h(get(comment, "html_url")) + 
        "'>commented on a commit</a>";
      break;
    case "PullRequestReviewCommentEvent":
      comment = get(payload, "comment");
      title = "<a href='" + h(get(comment, "html_url")) + 
        "'>commented on a pull request</a>";
      break;

    case "MemberEvent": 
      var member = get(payload, "member");
      title = h(get(payload, "action")) + " " + h(get(member, "login")) + " as a collaborator";
      break;
    case "TeamAddEvent": 
      var team = get(payload, "team");
      title = "gave " + h(get(team, "name")) + " " + h(get(team, "permission")) + " access";
      break;

    case "PublicEvent": 
      title = "made the repository public";
      break;

    default:
      title = "triggered " + type;
  }
  return new Ember.Handlebars.SafeString(title);
});

