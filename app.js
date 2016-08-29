'use strict';

var imageFileNames = ['bag.jpg','banana.jpg','scissors.jpg','sweep.png','tauntaun.jpg'];
var allImageSet = [];

for (var i = 0; i < imageFileNames.length; i++) {
  var fileName = imageFileNames[i];
  new Image(null, fileName);
}


// create Elements
var img = document.createElement('img');
var li = document.createElement('li');
var imageSet = document.getElementById('image_set');



var randomIdx = Math.floor(Math.random() * imageFileNames.length);
var randomImage = imageFileNames[randomIdx];

// set src
img.setAttribute('src', 'images/' + randomImage);

console.log(randomImage);

// add to the DOM
li.appendChild(img);
imageSet.appendChild(li);


// clickhandler event needed (for ul)
//   -- clear any prior list
//   -- use event target to determine which image was clicked
//   -- add to the views of all images displayed
//   -- add to the clicks of just the clicked image

// which will lead us to a common function to generate the image set

// object definition
function Image(name, path) {
  this.views = 0;
  this.clicks = 0;
  this.name = name;
  this.path = path;

  allImageSet.push(this);

}
