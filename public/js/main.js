'use strict';

window.addEventListener('load', function () {
  var imageSliders = document.querySelectorAll('.image-slider');
  imageSliders.forEach(function (imageSlider) {
    var slidingSection = imageSlider.querySelector('.images');
    slidingSection.addEventListener("touchstart", slider.touchHandler, false);
    slidingSection.addEventListener("touchmove", slider.touchHandler, false);
    slidingSection.addEventListener("touchend", slider.touchHandler, false);
  });
});

var slider = function () {
  var startClientX = null;
  var startClientY = null;
  var endClientX = null;
  var endClientY = null;
  var deltaClientX = null;
  var slidingElement = null;
  var nextElement = null;
  var previousElement = null;
  var touchStartTime = null;
  var deltaTime = null;

  var touchHandler = function touchHandler(e) {
    slidingElement = e.srcElement.querySelector('.sliding-element.active');
    nextElement = slidingElement.nextSibling;
    previousElement = slidingElement.previousSibling;
    var image = slidingElement.querySelector('.image');
    var slider = slide(image);
    var nextImage = null;
    var prevImage = null;

    if (e.type == "touchstart") {
      startClientX = e.touches[0].clientX;
      startClientY = e.touches[0].clientY;
      image.classList.remove('animate');
      image.style.transitionDuration = "0s";
      touchStartTime = new Date().getTime();
    } else if (e.type == "touchmove") {
      //Should we bother?
      if (!isValidSlide()) return;
      e.preventDefault();
      var prev = endClientX ? endClientX : startClientX;
      endClientX = e.touches[0].clientX;
      endClientY = e.touches[0].clientY;
      deltaClientX = (startClientX - endClientX) / window.innerWidth * 100;
      image.style.transform = 'translateX(-' + (100 + deltaClientX) + '%)';
    } else if (e.type == "touchend" || e.type == "touchcancel") {
      console.log(image);
      var isFlicked = isFlick();
      var duration = isFlicked ? 0.1 : 0.5;
      if (Math.abs(deltaClientX) < 55 && !isFlicked) {
        slider(duration, -100, false);
      } else if (deltaClientX < 0) {
        slider(duration, 0);
      } else if (deltaClientX > 0) {
        slider(duration, -200);
      }
      resetSlider();
    }
  };

  var slide = function slide(image) {
    return function (duration, toPosition) {
      var removeClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      console.log('körs');
      image.classList.add('animate');
      image.style.transitionDuration = duration + 's';
      image.style.transform = 'translateX(' + toPosition + '%)';
      if (removeClass) slidingElement.classList.remove('active');
    };
  };

  var isValidSlide = function isValidSlide() {
    var angleDeg = Math.atan2(endClientY - startClientY, endClientX - startClientX);
    return true;
  };

  var isFlick = function isFlick(e) {
    deltaTime = new Date().getTime() - touchStartTime;
    if (Math.abs(deltaClientX) >= 5 && deltaTime < 250) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  };

  var resetSlider = function resetSlider() {
    touchStartTime = null;
    deltaTime = null;
    startClientX = null;
    startClientY = null;
    endClientX = null;
    endClientY = null;
    deltaClientX = null;
    nextElement = null;
    previousElement = null;
    slidingElement = null;
  };

  return {
    touchHandler: touchHandler
  };
}();