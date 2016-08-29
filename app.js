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
//   -- use event target to determine which image was clicked
//   -- add to the views of all images displayed
//   -- add to the clicks of just the clicked image
function handleClick(e) {
  console.log(e.target);
  // clear any prior list
  imageSet.textContent = '';

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

  // we create 3 images for display at one time.
  generateImgElement();
  generateImgElement();
  generateImgElement();
}

// which will lead us to a common function to generate the image set
function generateImgElement() {
  // create Elements
  var img = document.createElement('img');
  var li = document.createElement('li');

  var randomIdx = Math.floor(Math.random() * imageFileNames.length);
  var randomImage = imageFileNames[randomIdx];

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
