// Put general configuration here. This file is included
// in both production and development BEFORE Ember is
// loaded.
//
// For example to enable a feature on a canary build you
// might do:
//
// window.ENV = {FEATURES: {'with-controller': true}};

window.ENV = {

  // The base URL of the backend "substantial-dash-server".
  api_base_url: 'http://0.0.0.0:8001',

  // List of auth providers configure on the server. The #name is for display,
  // but the #id should match to the OmniAuth strategy identifier.
  auth_providers: [
    { name: "Google Apps", id: "google_apps" }
  ]
  
};
