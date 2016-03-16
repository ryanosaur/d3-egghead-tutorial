var data = _.map(_.range(175), function(index) {
  return Math.random() * 150;
}).sort(function(a, b){
  return b - a;
})
  , SVG_HEIGHT = 300
  , SVG_WIDTH = 700
  ;

var svg = d3.select('#chartArea')
  .append('svg')
    .attr('width', SVG_WIDTH)
    .attr('height', SVG_HEIGHT)
    ;

var xScale = d3.scale.ordinal()
  .domain(data)
  .rangeBands([ 0, SVG_WIDTH ], .2, .3)
  // .rangeBands([ min, max ], padding between bars, padding outside the bands)
  ;

var yScale = d3.scale.linear()
  .domain([ 0, (d3.max(data) * 1.1) ]) // possible max value
  .range([ 0, SVG_HEIGHT ]) // adjusted range

var colorScale = d3.scale.quantile()
// var colorScale = d3.scale.quantile() // manually distributed
//   .domain([ 0, 10, data.length - 10, data.length ])
//   .range([ 'green', 'yellow', 'red' ])
// ******
// var colorScale = d3.scale.quantize() // evenly distributed
// .domain([ 0, data.length ])
// ******
// var colorScale = d3.scale.linear()
  .domain([ 0, data.length ])
  .range([ 'red', 'yellow', 'green' ])

svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
    .attr('class', 'bar')
    .attr('x', function(datum, index){
      return xScale(datum);
    })
    .attr('y', function(datum, index){
      return SVG_HEIGHT - yScale(datum);
    })
    .attr('width', xScale.rangeBand())
    .attr('height', function(datum, index) {
      return yScale(datum);
    })
    .attr('fill', function(datum, index) {
      // return colorScale(index);
      return colorScale(datum);
    })
    // OR
    // .attr('fill', colorScale)
    ;
