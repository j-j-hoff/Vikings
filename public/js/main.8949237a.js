'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.addEventListener('load', function () {
  var imageSliders = document.querySelectorAll('.image-slider');
  if (!imageSliders) return;
  imageSliders.forEach(function (imageSlider) {
    var slidingSection = imageSlider.querySelector('.images');
    if (slidingSection.querySelectorAll('.sliding-element').length < 2) return;

    var btnNext = imageSlider.querySelector('.btnNext');
    btnNext.style.visibility = 'visible';
    imageSlider.querySelector('.btnPrev').addEventListener('click', slider.slidePrev);
    btnNext.addEventListener('click', slider.slideNext);
  });
});

var slider = function () {
  var slidingElement = null;
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

  var resetElement = function resetElement(element) {
    element.classList.remove('animate');
    element.style.transitionDuration = "0s";
  };

  var resetSlider = function resetSlider() {
    slidingElement = null;
    next = null;
    prev = null;
  };

  return {
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

var currentVideo = null;

function onYouTubeIframeAPIReady() {
  var imageSliders = document.querySelectorAll('.image-slider');
  var videos = document.querySelectorAll('.video-component');
  if (!videos) return;
  if (!imageSliders) return;
  imageSliders.forEach(function (imageSlider) {
    var btnPrev = imageSlider.querySelector('.btnPrev');
    var btnNext = imageSlider.querySelector('.btnPrev');
    if (btnNext) btnNext.addEventListener('click', closeVideo);
    if (btnPrev) btnPrev.addEventListener('click', closeVideo);
  });

  videos.forEach(function (video) {
    var videoElm = new videoPlayer(video);
    video.querySelector('.video-play-icon').addEventListener('click', videoElm.showVideo);
    video.querySelector('.close-video').addEventListener('click', videoElm.closeVideo);
  });
}

var closeVideo = function closeVideo() {
  if (currentVideo) currentVideo.closeVideo();
};

var videoPlayer = function () {
  function videoPlayer(video) {
    _classCallCheck(this, videoPlayer);

    this.showVideo = this.showVideo.bind(this);
    this.closeVideo = this.closeVideo.bind(this);
    this.videoComponent = video;
    this.createPlayer();
  }

  _createClass(videoPlayer, [{
    key: 'createPlayer',
    value: function createPlayer() {
      var videoId = this.videoComponent.dataset.videoId;
      this.player = new YT.Player(this.videoComponent.querySelector('.video-slot'), {
        videoId: videoId
      });
    }
  }, {
    key: 'showVideo',
    value: function showVideo() {
      var vidoeOverlay = this.videoComponent.querySelector('.video-overlay');
      vidoeOverlay.style.display = 'flex';
      this.player.playVideo();
      currentVideo = this;
    }
  }, {
    key: 'closeVideo',
    value: function closeVideo() {
      this.player.stopVideo();
      var vidoeOverlay = this.videoComponent.querySelector('.video-overlay');
      vidoeOverlay.style.display = 'none';
      currentVideo = null;
    }
  }]);

  return videoPlayer;
}();

;