'use strict';

var imageSlider = null;
var image = null;

window.addEventListener('load', function () {
  imageSlider = document.querySelector('.image-slider');
  image = imageSlider.querySelector('.image');
  imageSlider.addEventListener("touchstart", touchHandler, false);
  imageSlider.addEventListener("touchmove", touchHandler, false);
  imageSlider.addEventListener("touchend", touchHandler, false);
});

var startClientX = null;
var endClientX = null;
var deltaClientX = null;

function touchHandler(e) {
  if (e.type == "touchstart") {
    startClientX = e.touches[0].clientX;
  } else if (e.type == "touchmove") {
    e.preventDefault();
    var prev = endClientX ? endClientX : startClientX;
    endClientX = e.touches[0].clientX;
    var rect = image.getBoundingClientRect();
    deltaClientX = prev - endClientX;
    image.style.left = rect.left - deltaClientX;
  } else if (e.type == "touchend" || e.type == "touchcancel") {
    startClientX = null;
    endClientX = null;
    deltaClientX = null;
    image.style.left = 0;
  }
}