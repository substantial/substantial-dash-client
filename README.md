# Substantial Dash client

**An early work-in-progress** to visualize realtime events, statuses, and key performance indicators.

Designed to display data from [Substantial Dash server](https://github.com/substantial/substantial-dash-server).

## Tech

* [Ember.js](http://emberjs.com): dashboard widgets build as [web components](http://emberjs.com/guides/components/)
* [Server Sent Events](http://www.html5rocks.com/en/tutorials/eventsource/basics/): streaming dashboard updates
* [CSS Flexbox](http://css-tricks.com/snippets/css/a-guide-to-flexbox/): grid layout without the hacks

## Browser Support

Current versions of Chrome, Firefox, & Safari all work splendidly.

Internet Explorer is not supported :unamused: because:

* no IE supports HTML5 `EventSource` a.k.a. Server Sent Events (possible solutions: polyfill, switch to WebSockets, or an event-stream-as-a-service such as [Pusher](http://pusher.com/))
* IE < 10 does not support CSS Flexbox

## Development

Built with EAK, [Ember App Kit](http://stefanpenner.github.io/ember-app-kit/)

### Requirements

* [Node.js](http://nodejs.org) installed (only required for development and build)
* `npm install -g grunt-cli`
* `npm install -g bower`

### Boot-up

    git clone git@github.com:substantial/substantial-dash-client.git
    cd substantial-dash-client/
    npm install

Run the test suite:

    grunt test
    
Start the auto-reloading dev server at http://0.0.0.0:8000
    
    grunt server

The EAK [Getting Started guide](http://iamstef.net/ember-app-kit/guides/getting-started.html) offers deeper insight into how this Ember.js application is built.
