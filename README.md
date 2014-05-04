# Substantial Dash client [![Build Status](https://travis-ci.org/substantial/substantial-dash-client.png)](https://travis-ci.org/substantial/substantial-dash-client)

**An early work-in-progress** to visualize realtime events, statuses, and key performance indicators.

Designed to display data from [Substantial Dash server](https://github.com/substantial/substantial-dash-server).

## Tech

* [Ember.js](http://emberjs.com): event-driven UI
* [Bayeux/Faye events](http://faye.jcoglan.com): publish & subscribe to data streams
* [Gridster](http://gridster.net/): recomposable grid layout

## Browser Support

Current versions of Chrome, Firefox, Safari, & IE (should) all work fine.

Older browsers that do not support CSS Flexbox will not display the dashboard layout correctly.

## Development

Built with EAK, [Ember App Kit](http://stefanpenner.github.io/ember-app-kit/)

### Requirements

* [Node.js](http://nodejs.org) installed (only required for development and build)
* `npm install -g grunt-cli`
* `npm install -g bower`
* `brew install phantomjs`

### Boot-up

    git clone git@github.com:substantial/substantial-dash-client.git
    cd substantial-dash-client/
    npm install

Configure your specific Dash's environment with *config/environment.js* and child *config/environments/\**. The default config should work for local development; each production Dash will require it's own unique *config/environments/production.js*.

Run the test suite:

    grunt test
    
Start the auto-reloading dev server at http://0.0.0.0:8000
    
    grunt server

### Code Layout

*Breaking change warning: These locations are subject to change as we eventually extract widgets into independently installable components/pods.*

* [app/templates/index.hbs](https://github.com/substantial/substantial-dash-client/blob/master/app/templates/index.hbs), the main Dashboard UI layout
* [app/pods](https://github.com/substantial/substantial-dash-client/tree/master/app/pods), each widget's controller, view, template, & styles together
* [app/initializers](https://github.com/substantial/substantial-dash-client/tree/master/app/initializers), services available/used across the app

The EAK [Getting Started guide](http://iamstef.net/ember-app-kit/guides/getting-started.html) offers deeper insight into how this Ember.js application is built.
