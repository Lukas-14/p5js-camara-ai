// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/aRtYvQP6Z/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let labels = [];
let confidence = 0;
let questionImage;

// Timeout
let lastExecution = 0;
let timeout;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  questionImage = loadImage('assets/q.png');
  label = ['skip', 'back', 'standby'];
  timeout = millis();
}

function setup() {
  createCanvas(640, 480);
  // Create the video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  // background("green");
  // Draw the video
  image(flippedVideo, 0, 0);

  timeout = millis()

  if(timeout > lastExecution) {
    if(confidence > 0.95) {
      if (label !== 'standby') {
        if(label === 'skib') {
          lastExecution = millis() + 5000
          console.log(2);
        } else if(label === 'back') {
          lastExecution = millis() + 5000
          console.log(3)
        }
      }
    }
  }

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
  text(confidence, width / 2, height - 20);

}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
//   console.log(results[0]);
  label = results[0].label;
  confidence = results[0].confidence;
  // Classifiy again!
  classifyVideo();
}
