//Initial Setup of Chart
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("div")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import CSV Data
d3.csv("assets/data/data.csv").then(function(healthData) {
    
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    healthData.forEach(function(data) {
        // console.log(data)//works.
        // console.log(data.state)//prints abbreviation
        // console.log(data.poverty)//prints age
        // console.log(data.healthcare)
        data.state = data.state
        data.poverty = +data.poverty//prints age
        data.healthcare= +data.healthcare
        // console.log(data.healthcare) //confirm INTParse
          });
          // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(healthData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthData, d => d.healthcare)])
      .range([height, 0]);
    
    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);
});
//Use this as example for part 1 parse.
// hairData.forEach(function(data) {
//     data.hair_length = +data.hair_length;
//     data.num_hits = +data.num_hits;
//   });
