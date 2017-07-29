$(document).ready(function () {
  //GETTING DATA
  $.get('/python/data/waveData.json', {}, function (data) {
    console.log(data);
  }, 'json');

  //DATA AND VARIBELS
  var counter = 0;
  var labels = ['red', 'red', 'red', 'red', 'red', 'red'];
  var atype = 'line';
  var data = [1, 2, 4, 8, 16, 32];
  var colors = ['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000'];
  var label = ['red'];
  var numofpanels = 1;

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
    })
  });
  //GRPAHING FUNCTION
  var ctx = $("#chart").get();
  var mono = new Chart(ctx, {
    type: atype,
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
      },
      fill: true,
    }

  });
});
