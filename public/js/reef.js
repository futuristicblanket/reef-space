$(document).ready(function () {
  var sitemin = [];
  //GETTING DATA
  $.get('data/waveData.json', function (data) {
    const startTime = performance.now();
    site = data.Site;
    sitemin.push(site);
    console.log(sitemin);
    const duration = performance.now() - startTime;
    console.log(`someMethodIThinkMightBeSlow took ${duration}ms`);
  }, "json");
  //FIXXING POINTS
  /* var power = 10 ** 2
   var long = (Math.round(longatude * power)) / power;
   var lat = (Math.round(latatude * power)) / power;*/

  //CLICKS
  var chartl = $("#right");
  chartl.click(function () {
    counter++
    if (counter > numofpanels) {
      counter = 0
    };
  })
});
var chartr = $("#left");
chartr.click(function () {
  counter = counter - 1;
  if (counter < 0) {
    counter = numofpanels;
  };
});
//DATA AND VARIBELS
var counter = 0;
var labels = [['red', 'red', 'red', 'red', 'red', 'red'], ['red', 'red', 'red', 'red', 'red', 'red']];
var atype = ['line', 'bar'];
var data = [[1, 2, 4, 8, 16, 32], [1, 2, 4, 8, 16, 32]];
var colors = [['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000'], ['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']];
var label = [['red'], ['Blue']];
var numofpanels = 1;

//GRPAHING FUNCTION
//function char(atype, labels, label, data, colors, counter) {
var ctx = $("#myChart").get();

var mono = new Chart(ctx, {
  type: atype[counter],
  data: {
    labels: labels[counter],
    datasets: [{
      label: label[counter],
      data: data[counter],
      backgroundColor: colors[counter],
      borderColor: colors[counter],
      borderWidth: 1
          }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
              }]
    },
    fill: true,
  }

});
//}
//char(atype, labels, label, data, colors, counter);
