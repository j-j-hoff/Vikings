'use strict';

window.addEventListener('load', function () {
  var imageSliders = document.querySelectorAll('.image-slider');
  imageSliders.forEach(function (imageSlider) {
    var slidingSection = imageSlider.querySelector('.images');
    slidingSection.addEventListener("touchstart", slider.touchstart, false);
    slidingSection.addEventListener("touchmove", slider.touchmove, false);
    slidingSection.addEventListener("touchend", slider.touchend, false);
  });
});

var slider = function () {
  var startClientX = null;
  var startClientY = null;
  var endClientX = null;
  var endClientY = null;
  var deltaClientX = null;
  var slidingElement = null;
  var momentum = null;
  var next = null;
  var prev = null;

  var touchstart = function touchstart(e) {
    assignElements(e);
    startClientX = e.touches[0].clientX;
    startClientY = e.touches[0].clientY;
    resetElement(slidingElement);
    if (next) resetElement(next);
    if (prev) resetElement(prev);
  };

  var touchmove = function touchmove(e) {
    if (!isValidSlide()) return;
    e.preventDefault();
    var prev = endClientX ? endClientX : startClientX;
    endClientX = e.touches[0].clientX;
    endClientY = e.touches[0].clientY;
    deltaClientX = (startClientX - endClientX) / window.innerWidth * 100;
    slidingElement.style.transform = 'translateX(-' + (100 + deltaClientX) + '%)';
    if (next) next.style.transform = 'translateX(-' + (0 + deltaClientX) + '%)';
    if (prev) next.style.transform = 'translateX(-' + (200 + deltaClientX) + '%)';
    momentum = prev - endClientX;
  };

  var touchend = function touchend(e) {
    var numberOfItems = slidingElement.parentNode.children.length;
    var currentIndex = Array.from(slidingElement.parentNode.children).indexOf(slidingElement);
    var isFirst = currentIndex == 0 || false;
    var isLast = currentIndex == numberOfItems - 1 || false;

    var isFlicked = isFlick();
    var duration = isFlicked ? 0.1 : 0.5;
    if (Math.abs(deltaClientX) < 55 && !isFlicked) {
      slider(slidingElement, duration, -100, false);
      slider(next, duration, 0, false);
      //slider(prev, duration, -200, false);
    } else if (deltaClientX < 0 && !isFirst) {
      slider(slidingElement, duration, 0);
      slider(next, duration, -100);
      next.classList.add('active');
    } else if (deltaClientX > 0 && !isLast) {
      slider(slidingElement, duration, -200);
      slider(next, duration, -100);
      next.classList.add('active');
    } else {
      slider(slidingElement, duration, -100, false);
      slider(next, duration, 0, false);
      //slider(next, duration, -200, false);
    }
    resetSlider();
  };

  var assignElements = function assignElements(e) {
    slidingElement = e.srcElement.querySelector('.sliding-element.active');
    var children = e.srcElement.children;
    var index = Array.prototype.slice.call(children).indexOf(slidingElement);
    if (index !== children.length - 1) next = slidingElement.parentNode.children[index + 1];
    if (index !== 0) prev = slidingElement.parentNode.children[index - 1];
  };

  var slider = function slider(element, duration, toPosition) {
    var removeClass = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    element.classList.add('animate');
    element.style.transitionDuration = duration + 's';
    element.style.transform = 'translateX(' + toPosition + '%)';
    if (removeClass) slidingElement.classList.remove('active');
  };

  var isValidSlide = function isValidSlide() {
    var angleDeg = Math.atan2(endClientY - startClientY, endClientX - startClientX);
    return true;
  };

  var isFlick = function isFlick(e) {
    if (momentum >= 10) {
      return true;
    } else {
      return false;
    }
  };

  var resetElement = function resetElement(element) {
    element.classList.remove('animate');
    element.style.transitionDuration = "0s";
  };

  var resetSlider = function resetSlider() {
    startClientX = null;
    startClientY = null;
    endClientX = null;
    endClientY = null;
    deltaClientX = null;
    slidingElement = null;
    momentum = null;
    next = null;
    prev = null;
  };

  return {
    touchstart: touchstart,
    touchmove: touchmove,
    touchend: touchend
  };
}();