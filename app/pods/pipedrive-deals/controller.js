import BayeuxSubscriber from 'appkit/mixins/bayeux-subscriber';
import BarChartComponent from 'appkit/components/bar-chart';

var PipedriveDealsController = Ember.ArrayController.extend(BayeuxSubscriber, {
  channel: "pipedrive-deals",

  init: function() {
    this._super();
    this.set("contents", []);
    this.set("sales", []);
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
      var contents = this.get("contents");
      var sales = this.get("sales");

      // map server data to the format accepted by the chart
      var chartData = [];
      
      if (contents) {
        var referenceFilters = Ember.A(contents.get('firstObject.filters'));

          contents.forEach(function(content) {
            var stageName = content.stage_name;
            var stage = { group: stageName, values: [] };

            content.filters.forEach(function(filter) {
              var filterName = filter.name;
              var id = stageName + '-' + filterName;
              
              stage.values.pushObject({ 
                id: id,
                legend: filterName, 
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

export default PipedriveDealsController;
