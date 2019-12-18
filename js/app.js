'use strict';

//constructor function to create an object for each image
//properties: name, filepath, number of times that has been shown, number of times that hs been clicked ,array of each instance

var numClicksAllowed = 25;
var numClicksThisRound = 0;
var prevImageSet = [];

function ImagesInstance(filepath, name) {
  this.name = name;
  this.filepath = filepath;
  this.numDisplayed = 0;
  this.numClicked = 0;
  this.percentClicked = 0;
  ImagesInstance.list.push(this);
}

ImagesInstance.list = [];

var lsData = localStorage.getItem('data');

if (lsData) {
  var parsedLsData = JSON.parse(lsData);

  for (var i = 0; i < parsedLsData.length; i++) {
    var newInstance = new ImagesInstance(parsedLsData[i].filepath, parsedLsData[i].name);
    newInstance.numDisplayed = parsedLsData[i].numDisplayed;
    newInstance.numClicked = parsedLsData[i].numClicked;
    console.log(newInstance);
  }
} else {

  new ImagesInstance('./images/bag-rs.png', 'Other Worldly Travel');
  new ImagesInstance('./images/banana-rs.png', 'Go Bananas');
  new ImagesInstance('./images/bathroom-rs.png', 'Never Leave the Bathroom');
  new ImagesInstance('./images/boots-rs.png', 'A/C Rain Boots');
  new ImagesInstance('./images/breakfast-rs.png', 'Morning Glory');
  new ImagesInstance('./images/bubblegum-rs.png', 'Meat-a-ball Gum');
  new ImagesInstance('./images/chair-rs.png', 'Butt Shaping Chair');
  new ImagesInstance('./images/cthulhu-rs.png', 'Octo-Monsto');
  new ImagesInstance('./images/dog-duck-rs.png', 'Duckie Dog');
  new ImagesInstance('./images/dragon-rs.png', 'Why not?');
  new ImagesInstance('./images/pen-rs.png', 'Pentencils');
  new ImagesInstance('./images/pet-sweep-rs.png', 'Finally');
  new ImagesInstance('./images/scissors-rs.png', 'Pizza Scissors');
  new ImagesInstance('./images/shark-rs.png', 'Cozy Shark Bite');
  new ImagesInstance('./images/sweep-rs.png', 'Kid Sweeps');
  new ImagesInstance('./images/tauntaun-rs.png', 'Intestinal Sleeping Bag');
  new ImagesInstance('./images/unicorn-rs.png', 'Unicorn Deliciousness');
  new ImagesInstance('./images/usb-rs.gif', 'USB Tail');
  new ImagesInstance('./images/water-can-rs.png', 'Pointless Watering Can');
  new ImagesInstance('./images/wine-glass-rs.png', 'Dribble Wine Glass');
}


// functions to create and remove listeners

function createListeners() {
  var imageContainer = document.getElementById('images-container');
  imageContainer.addEventListener('click', handleClick);
}

function removeListeners() {
  var imageContainer = document.getElementById('images-container');
  imageContainer.removeEventListener('click', handleClick);
}

// function to generate random nums 

function getRandoNum() {
  return Math.floor(Math.random() * ImagesInstance.list.length);
}

// function to handle click events

function handleClick(event) {

  for (var i = 0; i < ImagesInstance.list.length; i++) {
    if (ImagesInstance.list[i].name === event.target.alt) {
      ImagesInstance.list[i].numClicked++;

      ImagesInstance.list[i].percentClicked = (ImagesInstance.list[i].numClicked / ImagesInstance.list[i].numDisplayed) * 100;

      numClicksThisRound++;

      if (numClicksThisRound === numClicksAllowed) {
        removeListeners();
        prepareChartData();
      }
      break;
    }
  }
  storeData();
  getRandoImages();
}


// get random images
function getRandoImages() {

  // List of images from DOM
  var images = ['image1', 'image2', 'image3'];
  var texts = ['image1-text', 'image2-text', 'image3-text'];

  // Begin with empty set of images to compare against
  var currImageSet = [];

  // Repeat for each image showing
  for (var i = 0; i < images.length; i++) {

    // Find it in the DOM
    var image = document.getElementById(images[i]);
    var text = document.getElementById(texts[i]);

    // False flag
    var ok = false;

    // Keep looking for a unique image to display
    while (ok === false) {

      // Get random number between 0 and # of images
      var randoNum = getRandoNum();

      // If not previously shown and not currently displayed
      if (!prevImageSet.includes(randoNum) && !currImageSet.includes(randoNum)) {

        // Update display count
        ImagesInstance.list[randoNum].numDisplayed++;

        // Render it
        image.src = ImagesInstance.list[randoNum].filepath;
        image.alt = ImagesInstance.list[randoNum].name;
        text.textContent = ImagesInstance.list[randoNum].name;

        // Add image to list of images displayed
        currImageSet.push(randoNum);


        // End
        ok = true;
      }
    }
  }
  // Set previous set of images displayed to current set
  prevImageSet = currImageSet;
}

function prepareChartData() {

  var labels = [];
  var data = [];
  var bgColors = [];
  var borderColors = [];

  for (var i = 0; i < ImagesInstance.list.length; i++) {

    var rbg = '#' + Math.floor(Math.random() * 16777215).toString(16);
    var rbdr = '#' + Math.floor(Math.random() * 16777215).toString(16);

    labels.push(ImagesInstance.list[i].name);
    data.push(ImagesInstance.list[i].percentClicked);
    bgColors.push(rbg);
    borderColors.push(rbdr);
  }
  renderChart(labels, data, bgColors, borderColors);
}

function storeData () {
  var dataToStore = JSON.stringify(ImagesInstance.list);

  localStorage.setItem('data', dataToStore);
}

createListeners();
getRandoImages();
