var BarChartComponent = Ember.Component.extend({
    tagName: 'svg',
    attributeBindings: 'width height'.w(),
    margin: {top: 20, right: 20, bottom: 30, left: 65},
    
    w: function(){
      return this.get('width') - this.get('margin.left') - this.get('margin.right');
    }.property('width'),
  
    h: function(){
      return this.get('height') - this.get('margin.top') - this.get('margin.bottom');
    }.property('height'),  
  
    transformG: function(){
      return "translate(" + this.get('margin.left') + "," + this.get('margin.top') + ")";
    }.property(),
      
    transformX: function(){
      return "translate(0,"+ this.get('h') +")";
    }.property('h'),   

    yAxisTitle: function(){
      return this.get('yAxisTitle');
    }.property('yAxisTitle'),
  
    draw: function(){
      var data = this.get('data');

      var yFormat = window.d3.format(".2s");
      var width = this.get('w');
      var height = this.get('h');
      var svg = window.d3.select('#'+this.get('elementId'));
      var x0 = window.d3.scale.ordinal().rangeRoundBands([0, width], 0.1);
      var x1 = window.d3.scale.ordinal();
      var y = window.d3.scale.linear().range([height, 0]);
      var color = window.d3.scale.ordinal().range(["#aa1d2a", "white"]);

      var xAxis = window.d3.svg.axis().scale(x0).orient("bottom");
      var yAxis = window.d3.svg.axis().scale(y).orient("left").tickFormat(yFormat);

      var legendNames = data[0].values.map(function(d) { return d.legend; });
      x0.domain(data.map(function(d) { return d.group; }));
      x1.domain(legendNames).rangeRoundBands([0, x0.rangeBand()]);
      var maxY = window.d3.max(data, function(d) { 
        return window.d3.max(d.values, function(d) {return d.yValue;}); 
      });
      y.domain([0, maxY]);

      Ember.Logger.debug("max y: ", maxY);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(this.get("yAxisTitle"));

      var group = svg.selectAll(".group")
          .data(data)
        .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(" + x0(d.group) + ",0)"; });

      group.selectAll("rect")
          .data(function(d) { return d.values; })
        .enter().append("rect")
          .attr("width", x1.rangeBand())
          .attr("x", function(d) { return x1(d.legend); })
          .attr("y", function(d) { return y(d.yValue); })
          .attr("height", function(d) { return height - y(d.yValue); })
          .style("fill", function(d) { return color(d.legend); });

      var legend = svg.selectAll(".legend")
          .data(legendNames.slice().reverse())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });

      // svg.select(".axis.x").call(xAxis);
      // svg.select(".axis.y").call(yAxis);
  
      // svg.select(".rects").selectAll("rect")
      //   .data(data)
      // .enter().append("rect")
      //   .attr("class", "bar")
      //   .attr("x", function(d) { return x(d.x); })
      //   .attr("width", x.rangeBand())
      //   .attr("y", function(d) { return y(d.y); })
      //   .attr("height", function(d) { return height - y(d.y); });
    }.observes("data.@each")
  
    // didInsertElement: function(){
    //   this.draw();
    // }
  });

export default BarChartComponent;