$(document).ready(function () {

  //GRPAHING FUNCTION
  function char(atype, labels, label, data, colors, counter) {
    $("#myChart").remove();
    $('#reef-charting').append("<canvas id='myChart'></canvas>");

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
  };

  //DATA AND VARIBELS
  var counter = 4;
  var numofpanels = 0;

  //CLICKS
  /*var chartl = $("#right");
  chartl.click(function () {
    counter++
    if (counter > numofpanels) {
      counter = 0
    };
    console.log(counter);
    char(atype, labels, label, data, colors, counter);
  })
  var chartr = $("#left");
  chartr.click(function () {
    counter = counter - 1;
    if (counter < 0) {
      counter = numofpanels;
    };
    console.log(counter);
    char(atype, labels, label, data, colors, counter);
  });*/

  function updateChart(locationString) {

    $.getJSON('data/wave.json?site=' + encodeURI(locationString),
      function (data) {
        console.log(data);
        $.each(data, function (i, dataa) {
          //Update Vars
          data = [];
          atype = ['line'];
          counter = 4;
          numofpanels = 1;
          data = data.push([]).push(dataa.Hsia);
          data = data.push([]).push(dataa.Hmax);
          data = data.push([]).push(dataa.Tp);
          data = data.push([]).push(dataa.Tz);
          data = data.push([]).push(dataa.SST);
          data = data.push([]) .push(dataa.Direction);
          label = label.push(dataa.DateTime);
          labels = 'Ocean Surface Tempuerture at ' + locationString;
          numofpanels = 0;
          //Update Chart
          char(atype, labels, label, data, colors, counter);
        });
      }, "json");
  };
  updateChart('Tweed Heads');
});
