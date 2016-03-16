var data = _.map(_.range(75), function(index) {
  return {
    x: Math.random() * 100
  , y: Math.random() * 100
  , r: Math.random() * 30
  }
})
// .sort(function(a, b){
//   return b - a;
// })
  , MARGIN = { top: 25, right: 0, bottom: 25, left: 40 }
  , SVG_HEIGHT = 700 - MARGIN.top - MARGIN.bottom
  , SVG_WIDTH = 1000 - MARGIN.left - MARGIN.right
  ;

var svg = d3.select('#chartArea')
  .append('svg')
    .attr('height', SVG_HEIGHT + MARGIN.top + MARGIN.bottom)
    .attr('width', SVG_WIDTH + MARGIN.left + MARGIN.right)
    .append('g')
      .attr('transform', 'translate(' + MARGIN.left + ',' + MARGIN.top + ')')
    ;

var xScale = d3.scale.linear()
  .domain([0, 100])
  .range([ 0, SVG_WIDTH ])
// var xScale = d3.scale.ordinal() // dynamix x axis
//   .domain(data)
//   .rangeBands([ 0, SVG_WIDTH ], .2, .3)
  // .rangeBands([ min, max ], padding between bars, padding outside the bands)
  ;

var yScale = d3.scale.linear()
  .domain([
    0,
    d3.max(data, function(datum) {
      return datum.y;
    })
  ]) // possible max value
  .range([ SVG_HEIGHT, 0 ]) // adjusted range

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

svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
    .attr('class', 'bubble')
    .attr('cx', function (datum) {
      return xScale(datum.x);
    })
    .attr('cy', function (datum) {
      return yScale(datum.y)
    })
    .attr('r', function(datum) {
      return datum.r;
    })
    // .attr('fill', function(datum, index) {
    //   // return colorScale(index);
    //   return colorScale(datum.r);
    // })
    // OR
    // .attr('fill', colorScale)
    ;
// svg.selectAll('rect')
//   .data(data)
//   .enter()
//   .append('rect')
//     .attr('class', 'bar')
//     .attr('x', function(datum, index){
//       return xScale(datum);
//     })
//     .attr('y', function(datum, index){
//       return SVG_HEIGHT - yScale(datum);
//     })
//     .attr('width', xScale.rangeBand())
//     .attr('height', function(datum, index) {
//       return yScale(datum);
//     })
//     .attr('fill', function(datum, index) {
//       // return colorScale(index);
//       return colorScale(datum);
//     })
//     // OR
//     // .attr('fill', colorScale)
//     ;
