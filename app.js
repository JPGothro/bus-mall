'use strict';

var imageFileNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var allImageSet = [];
var oldDisplayArray = [];
var currentDisplayArray = [];
var totalClicks = 0;
var chartsCreated = false;
var popularityChart;
var viewsChart;
var radarChart;

// object constructor
function ProductImage (displayName, fileName) {
  this.shownCount = 0;
  this.clickCount = 0;
  this.name = displayName;
  this.fullPathName = fileName;
  this.imageId = '';
  // put the new object in the array of all image objects
  allImageSet.push(this);
}

ProductImage.prototype.displayMe = function() {
  // just create a string with all the properties and associated values
  var displayMyData = 'displayName: ' + this.name + ', fullPathName: ' + this.fullPathName + ', shownCount: ' + this.shownCount + ', clickCount: ' + this.clickCount + ', imageId: ' + this.imageId;
  return displayMyData;
};

for (var i = 0; i < imageFileNames.length; i++) {
  var fileName = imageFileNames[i];
  var shortName = fileName.split('.');
  new ProductImage(shortName[0], 'images/' + fileName);
}

// get the ul element where we will put all the images
var imageSet = document.getElementById('image_set');
// get the submit button element
var chartItBtn = document.getElementById('chart_it');
// create the popularity chart and a second chart
var firstChartCtx = document.getElementById('our_Chart');
var secondChartCtx = document.getElementById('second_Chart');
var radarChartCtx = document.getElementById('radar_Chart');

// Event Listeners
imageSet.addEventListener('click', clickHandler);
chartItBtn.addEventListener('click', buttonClickHandler);

// create the inital set of images for display...
var setOfIndices = randomIndices();
generateImgElement(setOfIndices[0]);
generateImgElement(setOfIndices[1]);
generateImgElement(setOfIndices[2]);

// clickhandler event for ul
function clickHandler(event) {
  // clear any prior list
  imageSet.textContent = '';

  // get the clicked image and increment the number of clicks for it
  var clickedImage = event.target.getAttribute('src');
  var currentImage = '';
  for (var imgIdx = 0; imgIdx < allImageSet.length; imgIdx++) {
    // check all the images to find the matching one
    currentImage = allImageSet[imgIdx].fullPathName;
    if ( clickedImage === currentImage ) {
      // found it!
      allImageSet[imgIdx].clickCount += 1;
      totalClicks += 1;
    }
  };

  if (totalClicks > 24) {
    // make the chart button visible.
    chartItBtn.setAttribute('class', 'visible');
  }

  // put the array just displayed into the old one
  oldDisplayArray = currentDisplayArray;
  console.log('The last set of images:', oldDisplayArray.join());

  // we create 3 images for display at one time.
  // clear out the current array so we can load it.
  currentDisplayArray = [];

  var setOfIndices = randomIndices();
  generateImgElement(setOfIndices[0]);
  generateImgElement(setOfIndices[1]);
  generateImgElement(setOfIndices[2]);
}

// Event Handler for Button Click
function buttonClickHandler() {
  // In this function we want to generate a chart of all the clicks counted.
  // Or we will update the existing charts
  if (!chartsCreated) {
    createCharts();
    chartsCreated = true;
  } else {
    updateCharts();
  }
};

function createCharts() {
  // just paste in logic to create the example chart
  // creating a Chart
  // the context was already created
  // Now call to initalize the First chart

  //create the labels array and the data array for input.
  var imgNames = [];
  var imgClicks = [];
  var imgViews = [];
  for (var i = 0; i < allImageSet.length; i++) {
    imgNames.push(allImageSet[i].name);
    imgClicks.push(allImageSet[i].clickCount);
    imgViews.push(allImageSet[i].shownCount);
  }
  popularityChart = initializeChart(firstChartCtx, 'Popularity', imgNames, imgClicks);

  // Now do the second chart
  viewsChart = initializeChart(secondChartCtx, 'Times Displayed', imgNames, imgViews);

  // And the radar chart
  radarChart = initializeRadarChart(imgNames, 'Times Displayed', imgViews, 'Popularity', imgClicks);
}

function initializeChart(chartCtx, chartTitle, labelData, dataValues) {
  var data = {
    labels: labelData,
    datasets: [
      {
        label: chartTitle,
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
        data: dataValues,
      }
    ],
  };

  var chartConfigObj = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  };

  return new Chart(chartCtx, chartConfigObj);
};

function updateCharts() {
  // Get the context
  // Now update the First chart
  // firstChartCtx = document.getElementById('our_Chart');
  // secondChartCtx = document.getElementById('second_Chart');

  //create the data arrays for input.
  var imgClicks = [];
  var imgViews = [];
  for (var i = 0; i < allImageSet.length; i++) {
    imgClicks.push(allImageSet[i].clickCount);
    imgViews.push(allImageSet[i].shownCount);
  }
  popularityChart.data.datasets[0].data = imgClicks;
  popularityChart.update();

  // Now do the second chart
  viewsChart.data.datasets[0].data = imgViews;
  viewsChart.update();

  // Now the radar chart
  radarChart.data.datasets[0].data = imgViews;
  radarChart.data.datasets[1].data = imgClicks;
  radarChart.update();

}

function initializeRadarChart(pointLabels, dsLabel1, dsInData1, dsLabel2, dsInData2) {
  var radarData = {
    labels: pointLabels,
    datasets: [
      {
        label: dsLabel1,
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: dsInData1
      },
      {
        label: dsLabel2,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: dsInData2
      }
    ]
  };


  var radarChrtCfg = {
    type: 'radar',
    data: radarData
  };

  return new Chart(radarChartCtx, radarChrtCfg);
}


function getRandomIndex () {
  return Math.floor(Math.random() * imageFileNames.length);
}

function randomIndices () {
  // this function returns 3 unique random indices for our array of images
  // unique within their current array and with the prior array.
  var firstRandomIndex = getRandomIndex();
  // check the two random numbers and if the same, generate a new one until they are unique
  while (oldDisplayArray.indexOf(firstRandomIndex) !== -1) {
    // there is dupe compared to the prior array.
    firstRandomIndex = getRandomIndex();
  }

  // second random number
  var secondRandomIndex = getRandomIndex();
  while (secondRandomIndex === firstRandomIndex
    || (oldDisplayArray.indexOf(secondRandomIndex) !== -1)) {
    secondRandomIndex = getRandomIndex();
  }

  // now generate a third one
  var thirdRandomIndex = getRandomIndex();
  // check it against the other two - we want 3 different ones
  while (thirdRandomIndex === firstRandomIndex
    || thirdRandomIndex === secondRandomIndex
    || (oldDisplayArray.indexOf(thirdRandomIndex) !== -1)) {
    thirdRandomIndex = getRandomIndex();
  }

  // we have 3 unique random indices, return them
  return [firstRandomIndex, secondRandomIndex, thirdRandomIndex];
}

function generateImgElement(imgIndex) {
  // a common function to generate the image set
  //   -- and add to the views of all images displayed

  // create Elements
  var img = document.createElement('img');
  var li = document.createElement('li');

  // get our random image.
  var randomImage = imageFileNames[imgIndex];

  // We have a unique image, put it in the current display array;
  // and increase the shownCount for that image.
  currentDisplayArray.push(imgIndex);
  for (var imgIdx = 0; imgIdx < allImageSet.length; imgIdx++) {
    // check all the images to find the matching one
    if ( ('images/' + randomImage) === allImageSet[imgIdx].fullPathName ) {
      // found it!
      allImageSet[imgIdx].shownCount += 1;
    }
  };

  // set src
  img.setAttribute('src', 'images/' + randomImage);

  // add to the DOM
  li.appendChild(img);
  imageSet.appendChild(li);
}
