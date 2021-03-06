var BarChartComponent = Ember.Component.extend({
    tagName: 'svg',
    classNames: ['bar-chart'],
    attributeBindings: ['height', 'width'],

    height: '100%',
    width: '100%',
  
    draw: function() {
      var data = this.get('data');
      if (Ember.isEmpty(data)) { return; }

      var d3 = window.d3;
      var el = this.get('element');
      var width = parseInt(d3.select(el).style('width'), 10);
      var height = parseInt(d3.select(el).style('height'), 10);
      var headerSpace = 40;
      var xAxisSpace = 50;
      var yAxisSpace = 50;
      var barsWidth = width - yAxisSpace;
      var barsHeight = height - headerSpace - xAxisSpace;

      var yFormat = d3.format(".2s");

      var svg = d3.select(el);
      var x0 = d3.scale.ordinal().rangeRoundBands([0, barsWidth], 0.1);
      var x1 = d3.scale.ordinal();
      var y = d3.scale.linear().range([barsHeight, 0]);
      var color = d3.scale.ordinal().range(["#777", "white"]);

      var xAxis = d3.svg.axis().scale(x0).orient("bottom");
      var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5).tickFormat(yFormat);

      var legendNames = data[0].values.map(function(d) { return d.legend; });
      x0.domain(data.map(function(d) { return d.group; }));
      x1.domain(legendNames).rangeRoundBands([0, x0.rangeBand()]);
      var maxY = d3.max(data, function(d) { 
        return d3.max(d.values, function(d) {return d.yValue;}); 
      });
      y.domain([0, maxY]);

      // X axis
      svg.select(".x.axis")
        .attr("transform", "translate("+yAxisSpace+","+(headerSpace+barsHeight)+")")
        .call(xAxis);

      svg.selectAll(".x.axis text")
        .style("text-anchor", "start")
        .attr("transform", function(d, i) {
          return "translate(-"+x1.rangeBand()+",0)";
        });

      // Y axis
      var yAxisNode = svg.select(".y.axis");
      svg.select(".y.axis .axis-title")
        .style("text-anchor", "start")
        .attr("transform", "translate("+-(yAxisSpace-12)+","+(-22)+")");
      yAxisNode.attr("transform", "translate("+yAxisSpace+","+headerSpace+")");
      yAxisNode.call(yAxis);

      // Grouped bars
      var group = svg.selectAll(".group")
          .data(data, function(d) { return d.group; });
      
      group.enter().append("g").attr("class", "group");

      group.attr("transform", function(d) { 
          var xOffset = x0(d.group) + yAxisSpace;
          return "translate(" + xOffset + ",0)"; 
        });

      group.exit().remove();

      // Individual bars
      var bars = group.selectAll(".y-bar")
          .data(function(d) { return d.values; }, function(d) { return d.id; });

      var barsEnter = bars.enter().append("g");
      barsEnter.attr("class", "y-bar"); // classed() does not work for SVG <g>
      barsEnter.append("rect");
      barsEnter.append("text")
        .attr("class", "y-label");

      bars.select("rect")
        .transition()
          .attr("width", x1.rangeBand())
          .attr("rx", 6)
          .attr("yx", 6)
          // Overlap group members by 66% of their offset.
          .attr("x", function(d) { 
            var firstOffset = x1.range()[0];
            var offset = x1(d.legend);
            return offset === firstOffset ? offset : (offset*0.66) ; })
          .attr("y", function(d) { return headerSpace + y(d.yValue); })
          .attr("height", function(d) { return barsHeight - y(d.yValue); })
          .style("fill", function(d) { return color(d.legend); });

      bars.select(".y-label")
        .text(function(d) { return d.yLabel === 0 ? '' : d.yLabel; })
        .style("text-anchor", "start")
        // Follow group member offset.
        .attr("transform", function(d) { 
          var firstOffset = x1.range()[0];
          var offset = x1(d.legend);
          var offsetOffset = offset === firstOffset ? offset : (offset*0.66) ;
          return "translate(" + (offsetOffset+3) + "," + (barsHeight+headerSpace-3) + ")"; 
        });

      bars.exit().remove();

      // Legend rendering
      var legend = svg.selectAll(".legend")
          .data(legendNames.slice());

      var legendEnterGroup = legend.enter().append("g");
      legendEnterGroup.attr("class", "legend");
      legendEnterGroup.append("rect");
      legendEnterGroup.append("text");

      legend.attr("transform", function(d, i) { 
        return "translate(0," + (i*20) + ")";
      });

      legend.selectAll("rect")
          .attr("rx", 6)
          .attr("yx", 6)
          .attr("x", barsWidth+yAxisSpace-16)
          .attr("width", 16)
          .attr("height", 16)
          .style("fill", color);

      legend.selectAll("text")
          .attr("x", barsWidth+yAxisSpace-20)
          .attr("dy", "0.8em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });

    }.observes("data.@each"),

    didInsertElement: function() {
      window.d3.select(window).on('resize', this.draw.bind(this));
    }
  });

export default BarChartComponent;