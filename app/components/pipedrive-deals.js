import DashboardWidgetComponent from 'appkit/components/dashboard-widget';
import BarChartComponent from 'appkit/components/bar-chart';

var PipedriveDealsComponent = DashboardWidgetComponent.extend({

  init: function() {
    this._super();
    this.set("contents", []);
    this.set("sales", []);
  },

  didInsertElement: function() {
      Ember.Logger.debug("MEOW4");
    // this.setupChart();
  },

  // TODO: add did didDestroyElement one day

  actions: {
    receiveEvent: function(data) {
      this.updateContents(data);
    }
  },

  updateContents: function(data) {
    var items = Ember.A(JSON.parse(data));
    var contents = this.get("contents");
   
    contents.setObjects(items);
  },

  // setupChart: function() {
  //   var chart = BarChartComponent.new();

  //   this.set("chart", chart);

  //   return chart;
  // }, 

  populateChart: function() {
      Ember.Logger.debug("MEOW3");
      var contents = this.get("contents");
      var sales = this.get("sales");

      // map server data to the format accepted by the chart
      var chartData = [];
      
      if (contents) {
        var referenceFilters = Ember.A(contents.get('firstObject.filters'));

          contents.forEach(function(content) {
            var stage = { group: content.stage_name, values: [] };

            content.filters.forEach(function(filter) {
              stage.values.pushObject({ 
                legend: filter.name, 
                yValue: filter.dollar_value, 
                yLabel: filter.deal_count
              });
            }); //filters

            chartData.pushObject(stage);
          }); //contents

          sales.setObjects(chartData);
      }
  }.observes("contents.@each")
});

export default PipedriveDealsComponent;
