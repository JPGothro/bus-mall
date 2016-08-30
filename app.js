'use strict';

var imageFileNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var allImageSet = [];
var oldDisplayArray = [];
var currentDisplayArray = [];

for (var i = 0; i < imageFileNames.length; i++) {
  var fileName = imageFileNames[i];
  var shortName = fileName.split('.');
  new Image(shortName[0], fileName);
}

// get the ul element where we will put all the images
var imageSet = document.getElementById('image_set');

imageSet.addEventListener('click', handleClick);

// create the inital set of images for display...
generateImgElement();
generateImgElement();
generateImgElement();

// clickhandler event needed (for ul)
//   -- add to the views of all images displayed
//   -- add to the clicks of just the clicked image
function handleClick(e) {
  console.log(e.target);
  // clear any prior list
  imageSet.textContent = '';

  // get the clicked image to increment the number of clicks for it
  var clickedImage = e.target.getAttribute('src');
  console.log(clickedImage);

  for (var imgIdx = 0; imgIdx < allImageSet.length; imgIdx++) {
    // check all the images to find the matching one
    if ( clickedImage === allImageSet[imgIdx].fullPathName ) {
      // found it!
      console.log('found a match');
      allImageSet[imgIdx].clickCount++;
    }
  };

  // put the array just displayed into the old one
  oldDisplayArray = currentDisplayArray;

  // we create 3 images for display at one time.
  // clear out the current array so we can load it.
  currentDisplayArray = [];
  generateImgElement();
  generateImgElement();
  generateImgElement();
}

// which will lead us to a common function to generate the image set
function generateImgElement() {
  // create Elements
  var img = document.createElement('img');
  var li = document.createElement('li');

  var uniqueImage = false;
  var randomIdx = Math.floor(Math.random() * imageFileNames.length);
  var randomImage = imageFileNames[randomIdx];

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
  currentDisplayArray.push(randomImage);
  // increase the shownCount for that image.
  for (var imgIdx = 0; imgIdx < allImageSet.length; imgIdx++) {
    // check all the images to find the matching one
    if ( ('images/' + randomImage) === allImageSet[imgIdx].fullPathName ) {
      // found it!
      console.log('found a match');
      allImageSet[imgIdx].shownCount++;
    }
  };

  // set src
  img.setAttribute('src', 'images/' + randomImage);

  // add to the DOM
  li.appendChild(img);
  imageSet.appendChild(li);
}

// object constructor
function Image(displayName, fileName) {
  this.shownCount = 0;
  this.clickCount = 0;
  this.name = displayName;
  this.fullPathName = 'images/' + fileName;
  this.imageId = '';

  allImageSet.push(this);
}
