'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

window.addEventListener('load', function () {
  var imageSliders = document.querySelectorAll('.image-slider');
  if (!imageSliders) return;
  imageSliders.forEach(function (imageSlider) {
    var slidingSection = imageSlider.querySelector('.images');
    if (slidingSection.querySelectorAll('.sliding-element').length < 2) return;

    var btnNext = imageSlider.querySelector('.btnNext');
    btnNext.style.visibility = 'visible';
    slidingSection.addEventListener("touchstart", slider.touchstart, false);
    slidingSection.addEventListener("touchmove", slider.touchmove, false);
    slidingSection.addEventListener("touchend", slider.touchend, false);
    imageSlider.querySelector('.btnPrev').addEventListener('click', slider.slidePrev);
    btnNext.addEventListener('click', slider.slideNext);
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

  var slideNext = function slideNext(event) {
    var _mainSlider = mainSlider(event),
        _mainSlider2 = _slicedToArray(_mainSlider, 2),
        numberOfItems = _mainSlider2[0],
        currentIndex = _mainSlider2[1];

    var isLast = currentIndex == numberOfItems - 1 || false;
    var willBeLast = currentIndex + 1 >= numberOfItems - 1 || false;
    var btnNext = slidingElement.parentNode.parentNode.querySelector('.btnNext');
    var btnPrev = slidingElement.parentNode.parentNode.querySelector('.btnPrev');
    btnPrev.style.visibility = 'visible';
    btnNext.style.visibility = willBeLast ? 'hidden' : 'visible';
    if (!isLast) slideToNext(0.5);
  };

  var slidePrev = function slidePrev(event) {
    var _mainSlider3 = mainSlider(event),
        _mainSlider4 = _slicedToArray(_mainSlider3, 2),
        numberOfItems = _mainSlider4[0],
        currentIndex = _mainSlider4[1];

    var isFirst = currentIndex == 0 || false;
    var willBeFirst = currentIndex - 1 <= 0 || false;
    var btnNext = slidingElement.parentNode.parentNode.querySelector('.btnNext');
    var btnPrev = slidingElement.parentNode.parentNode.querySelector('.btnPrev');
    btnNext.style.visibility = 'visible';
    btnPrev.style.visibility = willBeFirst ? 'hidden' : 'visible';
    if (!isFirst) slideToPrev(0.5);
  };

  var mainSlider = function mainSlider(event) {
    resetSlider();
    var eventSrc = event.target || event.srcElement;
    var parent = eventSrc.parentNode.parentNode.querySelector('.images');
    assignElements(parent);
    resetElement(slidingElement);
    if (next) resetElement(next);
    if (prev) resetElement(prev);
    var numberOfItems = slidingElement.parentNode.children.length;
    var currentIndex = Array.from(slidingElement.parentNode.children).indexOf(slidingElement);
    return [numberOfItems, currentIndex];
  };

  var touchstart = function touchstart(event) {
    resetSlider();
    var eventSrc = event.target || event.srcElement;
    assignElements(eventSrc);
    startClientX = event.touches[0].clientX;
    startClientY = event.touches[0].clientY;
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

  var touchmove = function touchmove(event) {
    var prevVal = endClientX ? endClientX : startClientX;
    endClientX = event.touches[0].clientX;
    endClientY = event.touches[0].clientY;
    if (!isSlide()) return;
    event.preventDefault();
    deltaClientX = (startClientX - endClientX) / window.innerWidth * 100;
    slidingElement.style.transform = 'translateX(-' + (100 + deltaClientX) + '%)';
    if (next) next.style.transform = 'translateX(-' + (0 + deltaClientX) + '%)';
    if (prev) prev.style.transform = 'translateX(-' + (200 + deltaClientX) + '%)';
    momentum = Math.abs(prevVal - endClientX);
  };

  var touchend = function touchend(e) {
    if (!isSlide()) {
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
      slideToPrev(duration);
    } else if (deltaClientX > 0 && !isLast) {
      slideToNext(duration);
    } else {
      slider(slidingElement, duration, -100, false);
      if (next) slider(next, duration, 0, false);
      if (prev) slider(prev, duration, -200, false);
    }
  };

  var slideToPrev = function slideToPrev(duration) {
    slider(slidingElement, duration, 0);
    if (prev) slider(prev, duration, -100);
    if (prev) prev.classList.add('active');
  };

  var slideToNext = function slideToNext(duration) {
    slider(slidingElement, duration, -200);
    if (next) slider(next, duration, -100);
    if (next) next.classList.add('active');
  };

  var assignElements = function assignElements(parent) {
    slidingElement = parent.querySelector('.sliding-element.active');
    var children = parent.children;
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
    touchend: touchend,
    slidePrev: slidePrev,
    slideNext: slideNext
  };
}();

document.getElementById('open-close-menu').addEventListener('change', hideShowMenu);
function hideShowMenu(e) {
  var body = document.getElementsByTagName('body')[0];
  if (this.checked) {
    body.style.overflow = "hidden";
    body.style.position = "fixed";
  } else {
    body.style.overflow = "initial";
    body.style.position = "initial";
  }
}

window.addEventListener('load', function () {
  var videos = document.querySelectorAll('.video-component');
  if (!videos) return;
  videos.forEach(function (video) {
    videoPlayer.init(video);
  });
});

var videoPlayer = function () {
  var player = null;
  var videoComponent = null;

  var init = function init(video) {
    videoComponent = video;
    createPlayer();
    video.querySelector('.video-play-icon').addEventListener('click', showVideo);
    video.querySelector('.close-video').addEventListener('click', closeVideo);
    var parent = video.parentNode.parentNode.parentNode;
    var btnPrev = parent.querySelector('.btnPrev');
    var btnNext = parent.querySelector('.btnPrev');
    if (btnNext) btnNext.addEventListener('click', closeVideo);
    if (btnPrev) btnPrev.addEventListener('click', closeVideo);
  };

  var createPlayer = function createPlayer() {
    var videoId = videoComponent.dataset.videoId;
    player = new YT.Player(videoComponent.querySelector('.video-slot'), {
      videoId: videoId
    });
  };

  var showVideo = function showVideo(event) {
    var eventSrc = event.target || event.srcElement;
    var vidoeOverlay = videoComponent.querySelector('.video-overlay');
    vidoeOverlay.style.display = 'flex';
    player.playVideo();
  };

  var closeVideo = function closeVideo(event) {
    player.stopVideo();
    var vidoeOverlay = videoComponent.querySelector('.video-overlay');
    vidoeOverlay.style.display = 'none';
  };

  return { init: init };
}();