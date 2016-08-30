'use strict';

var imageFileNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var allImageSet = [];
var oldDisplayArray = [];
var currentDisplayArray = [];
var totalClicks = 0;

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
  console.log(oldDisplayArray.join());

  // we create 3 images for display at one time.
  // clear out the current array so we can load it.
  currentDisplayArray = [];

  generateNewImage();
  generateNewImage();
  generateNewImage();
}

// Event Handler for Button Click
function buttonClickHandler() {
  // In this function we want to generate a chart of all the clicks counted.
  createChart();
};


function createChart() {
  // just paste in logic to create the example chart
  // creating a Chart
  var ctx = document.getElementById('ourChart');

  //create the labels array and the data array for input.
  var imgNames = [];
  var imgClicks = [];
  for (var i = 0; i < allImageSet.length; i++) {
    imgNames.push(allImageSet[i].name);
    imgClicks.push(allImageSet[i].clickCount);
  }

  var data = {
    labels: imgNames,
    datasets: [
      {
        label: 'Popularity Chart',
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
        data: imgClicks,
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
            beginAtZero: true
          }
        }]
      }
    }
  };

  new Chart(ctx, chartConfigObj);

};


function randomIndices () {
  // this function returns 3 unique random indices for our array of images
  // extracting common code
  var firstRandomIndex = Math.floor(Math.random() * imageFileNames.length);
  var secondRandomIndex = Math.floor(Math.random() * imageFileNames.length);
  // check the two random numbers and if the same, generate a new one until they are unique
  while (firstRandomIndex === secondRandomIndex) {
    secondRandomIndex = Math.floor(Math.random() * imageFileNames.length);
  }
  // now generate a third one
  var thirdRandomIndex = Math.floor(Math.random() * imageFileNames.length);
  // check it against the other two - we want 3 different ones
  while (firstRandomIndex === thirdRandomIndex || secondRandomIndex === thirdRandomIndex) {
    thirdRandomIndex = Math.floor(Math.random() * imageFileNames.length);
  }

  // we have 3 unique random indices, return them
  return [firstRandomIndex, secondRandomIndex, thirdRandomIndex];
}

function generateNewImage() {
  // no index passed, so generate one.
  var randomIdx = Math.floor(Math.random() * imageFileNames.length);
  generateImgElement(randomIdx);
}

function generateImgElement(imgIndex) {
  // a common function to generate the image set
  //   -- and add to the views of all images displayed

  // create Elements
  var img = document.createElement('img');
  var li = document.createElement('li');

  var uniqueImage = false;
  // get our first choice for a random image.
  var randomIdx;
  var randomImage = imageFileNames[imgIndex];

  // loop this so we check to see if it is a duplicate before using it.
  if (oldDisplayArray.length > 0) {
    // check these to prevent dupes.
    do {
      if (oldDisplayArray.indexOf(randomImage) >= 0) {
        // this is a duplicate, don't use it. Get a new one.
        randomIdx = Math.floor(Math.random() * imageFileNames.length);
        randomImage = imageFileNames[randomIdx];
      } else {
        uniqueImage = true;
      }
    } while (!uniqueImage);
  }

  // do the same check against the current array, if there are any elements in it.
  uniqueImage = false;
  if (currentDisplayArray.length > 0) {
    // check what is in the current array so we don't duplicate it.
    do {
      if (currentDisplayArray.indexOf(randomImage) >= 0) {
        // this is a duplicate, don't use it. Get a new one.
        randomIdx = Math.floor(Math.random() * imageFileNames.length);
        randomImage = imageFileNames[randomIdx];
      } else {
        uniqueImage = true;
      }
    } while (!uniqueImage);
  }

  // We have a unique image, put it in the current display array;
  // and increase the shownCount for that image.
  currentDisplayArray.push(randomImage);
  for (var imgIdx = 0; imgIdx < allImageSet.length; imgIdx++) {
    // check all the images to find the matching one
    if ( ('images/' + randomImage) === allImageSet[imgIdx].fullPathName ) {
      // found it!
      allImageSet[imgIdx].shownCount += 1;
      console.log(allImageSet[imgIdx].displayMe());
    }
  };

  // set src
  img.setAttribute('src', 'images/' + randomImage);

  // add to the DOM
  li.appendChild(img);
  imageSet.appendChild(li);
}
