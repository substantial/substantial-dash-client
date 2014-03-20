import DashboardWidgetComponent from 'appkit/components/dashboard-widget';

var PipedriveDealsComponent = DashboardWidgetComponent.extend({

  init: function() {
    this._super();
    this.set("contents", [ { filler_value_so_embers_at_each_observing_works_on_first_array_fill: 0 } ]);
  },

  didInsertElement: function() {
    this.setupChart();
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

  setupChart: function() {
    var chart = window.nv.models.multiBarChart()
      .transitionDuration(250)
      .reduceXTicks(false)   //If 'false', every single x-axis tick label will be rendered.
      .rotateLabels(0)      //Angle to rotate x-axis labels.
      .showControls(false)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
      .groupSpacing(0.1)    //Distance between each group of bars.
      .color(['red', 'white'])      
    ;

    chart.yAxis
        .tickFormat(window.d3.format(',f'));

    //window.nv.utils.windowResize(chart.update);

    this.set("chart", chart);

    return chart;
  }, 

  populateChart: function() {
    var contents = this.get("contents");

    // map server data to a format accepted by the chart
    var salesData = [];
    var dealsData = [];
    var chart = this.get("chart");

    if (contents) {
      var referenceFilters = Ember.A(contents[0].filters);

      referenceFilters.forEach(function(referenceFilter) {
        var filterName = referenceFilter.name;
        var salesKeyValue = { key: filterName, values: [] };
        var dealsKeyValue = { key: filterName, values: [] };

        contents.forEach(function(content) {
          var filter = content.filters.findBy('name', filterName);
          var x = content.stage_name;
          var dollar_value = filter.dollar_value;
          var deal_count = filter.deal_count;

          salesKeyValue.values.push( {x: x, y: dollar_value} );
          dealsKeyValue.values.push( {x: x, y: deal_count} );
        });

        salesData.push(salesKeyValue);
        dealsData.push(dealsKeyValue);
      });
    }

    window.d3.select('.pipedrive-sales-chart svg')
      .datum(salesData)
      .call(chart);

    window.d3.select('.pipedrive-deals-chart svg')
      .datum(dealsData)
      .call(chart);

  }.observes("contents.@each")
});

export default PipedriveDealsComponent;
