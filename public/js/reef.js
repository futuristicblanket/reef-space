$(document).ready(function () {
  //GETTING DATA
  /*$.get('/python/data/waveData.json', {}, function (data) {
    console.log(data);
  }, 'json');*/
  //GETTINF DATA
  //DATA AND VARIBELS
  var counter = 0;
  var labels = 'red';
  var type = 'bar';
  var data = [1];
  var colors = ['#000'];
  var label = ['red'];
  var numofpanels = 1;

  //CLICKS
  var chartl = $("#right");
  chartl.click(function () {
    counter++
    if (counter > numofpanels) {
      counter = 0
    };
    chartl.slideUp(1000, function () {
      graph();
      chartl.slideDown(1000)
    })
  });
  //CLICKS
  /*var chartl = $("#right");
  chartl.click(function () {
    counter++
    if (counter > numofpanels) {
      counter = 0
    };
    chartl.slideUp(1000, function () {
      graph();
      chartl.slideDown(1000)
    })
  });
  var chartr = $("#left");
  chartr.click(function () {
    counter = counter - 1;
    if (counter < 0) {
      counter = numofpanels;
    };
    chartr.slideUp(1000, function () {
      graph();
      chartr.slideDown(1000)
    })
  });*/
  //GRPAHING FUNCTION
    /*var ctx = $("#chart").get();
    var mono = new Chart(ctx, {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          backgroundColor: colors,
          borderColor: colors,
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
        }
      }
    });*/
});
