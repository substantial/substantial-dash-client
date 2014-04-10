import Clock from 'appkit/utils/clock';

var ClockServiceInitializer = {
  name: "clock-service",

  initialize: function(container, application) {
    application.register('clock:service', Clock, { singleton: true });
    application.inject('view', 'clock', 'clock:service');
  }
};

export default ClockServiceInitializer;
