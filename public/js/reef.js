<<<<<<< HEAD
//GETTING DATA
$.get('/python/data/waveData.json', {
}, function (data) {
  console.log(data);
}, 'json');
=======
//GETTINF DATA
>>>>>>> fdb64095a3aad2441064532010cd2cf0d825b29f

$(document).ready(function () {
  //DATA AND VARIBELS
  var counter = 0;
  var labels = [];
  var type = [];
  var data = [];
  var colors = [];
  var label = [];
  var numofpanels = 0;

<<<<<<< HEAD
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
});
=======
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
  });
>>>>>>> fdb64095a3aad2441064532010cd2cf0d825b29f

  //GRPAHING FUNCTION
  function graph() {
    var ctx = $("#chart").get();
    var mono = new Chart(ctx, {
      type: type[counter],
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
        }
      }
    });
  };


});
