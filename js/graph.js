'use strict';

function renderChart(labels, data, bgColors, borderColors) {

  var ctx = document.getElementById('myChart').getContext('2d');

  new Chart(ctx,
    {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '% Votes',
          data: data,
          backgroundColor: bgColors,
          borderColor: borderColors
        }],
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      }
    }
  );
}