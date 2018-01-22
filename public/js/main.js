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

  var isSlide = function isSlide() {
    var w = endClientX - startClientX;
    var h = endClientY - startClientY;
    var atan = Math.abs(Math.atan2(h, w) / Math.PI * 180);
    if (atan < 70 || atan > 110) return true;
    return false;
  };

  var touchmove = function touchmove(e) {
    var prevVal = endClientX ? endClientX : startClientX;
    endClientX = e.touches[0].clientX;
    endClientY = e.touches[0].clientY;
    if (!isSlide()) return;
    e.preventDefault();
    deltaClientX = (startClientX - endClientX) / window.innerWidth * 100;
    slidingElement.style.transform = 'translateX(-' + (100 + deltaClientX) + '%)';
    if (next) next.style.transform = 'translateX(-' + (0 + deltaClientX) + '%)';
    if (prev) prev.style.transform = 'translateX(-' + (200 + deltaClientX) + '%)';
    momentum = Math.abs(prevVal - endClientX);
  };

  var touchend = function touchend(e) {
    if (!isSlide()) {
      resetSlider();
      return;
    }
    var numberOfItems = slidingElement.parentNode.children.length;
    var currentIndex = Array.from(slidingElement.parentNode.children).indexOf(slidingElement);
    var isFirst = currentIndex == 0 || false;
    var isLast = currentIndex == numberOfItems - 1 || false;

    var isFlicked = isFlick(isFirst, isLast);
    var duration = isFlicked ? 0.3 : 0.5;
    if (Math.abs(deltaClientX) < 45 && !isFlicked) {
      slider(slidingElement, duration, -100, false);
      if (next) slider(next, duration, 0, false);
      if (prev) slider(prev, duration, -200, false);
    } else if (deltaClientX < 0 && !isFirst) {
      slider(slidingElement, duration, 0);
      if (prev) slider(prev, duration, -100);
      if (prev) prev.classList.add('active');
    } else if (deltaClientX > 0 && !isLast) {
      slider(slidingElement, duration, -200);
      if (next) slider(next, duration, -100);
      if (next) next.classList.add('active');
    } else {
      slider(slidingElement, duration, -100, false);
      if (next) slider(next, duration, 0, false);
      if (prev) slider(prev, duration, -200, false);
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

  var isFlick = function isFlick(isFirst, isLast) {
    if (momentum >= 10 && !(deltaClientX <= 0 && isFirst || deltaClientX >= 0 && isLast)) {
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