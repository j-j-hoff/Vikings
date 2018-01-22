window.addEventListener('load', function() {
  const imageSliders = document.querySelectorAll('.image-slider');
    imageSliders.forEach(imageSlider => {
      const slidingSection = imageSlider.querySelector('.images')
      slidingSection.addEventListener("touchstart", slider.touchstart, false);
      slidingSection.addEventListener("touchmove", slider.touchmove, false);
      slidingSection.addEventListener("touchend", slider.touchend, false);
  });
});

const slider = (() => {
  let startClientX = null;
  let startClientY = null;
  let endClientX = null;
  let endClientY = null;
  let deltaClientX = null;
  let slidingElement = null;
  let momentum = null;
  let next = null;
  let prev = null;

  const touchstart = (e) => {
    assignElements(e);
    startClientX = e.touches[0].clientX;
    startClientY = e.touches[0].clientY;
    resetElement(slidingElement);
    if (next) resetElement(next);
    if (prev) resetElement(prev);
  }

  const touchmove = (e) => {
    if (!isValidSlide()) return;
    e.preventDefault();
    const prev = endClientX ? endClientX : startClientX;
    endClientX = e.touches[0].clientX;
    endClientY = e.touches[0].clientY;
    deltaClientX = ((startClientX - endClientX) / window.innerWidth) * 100;
    slidingElement.style.transform = `translateX(-${100 + deltaClientX}%)`;
    if (next) next.style.transform = `translateX(-${0 + deltaClientX}%)`;
    if (prev) next.style.transform = `translateX(-${200 + deltaClientX}%)`;
    momentum = prev - endClientX;
  }

  const touchend = (e) => {
    const numberOfItems = slidingElement.parentNode.children.length;
    const currentIndex = Array.from(slidingElement.parentNode.children).indexOf(slidingElement);
    const isFirst = currentIndex == 0 || false;
    const isLast = currentIndex == numberOfItems -1 || false;

    const isFlicked = isFlick();
    const duration = isFlicked ? 0.1 : 0.5;
    if (Math.abs(deltaClientX) < 55 && !isFlicked) {
      slider(slidingElement, duration, -100, false);
      slider(next, duration, 0, false);
      //slider(prev, duration, -200, false);
    } 
    else if (deltaClientX < 0 && !isFirst) {
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
  }

  const assignElements = (e) => {
    slidingElement = e.srcElement.querySelector('.sliding-element.active');
    const children = e.srcElement.children;
    const index = Array.prototype.slice.call(children).indexOf(slidingElement);
    if (index !== children.length - 1) next = slidingElement.parentNode.children[index + 1];
    if (index !== 0) prev = slidingElement.parentNode.children[index - 1];
  };

  const slider = (element, duration, toPosition, removeClass = true) => {
    element.classList.add('animate');
    element.style.transitionDuration =`${duration}s`;
    element.style.transform = `translateX(${toPosition}%)`;
    if (removeClass) slidingElement.classList.remove('active');
  };

  const isValidSlide = () => {
    var angleDeg = Math.atan2(endClientY - startClientY, endClientX - startClientX);
    return true;
  };

  const isFlick = (e) => {
    if (momentum >= 10) {
      return true;
    } else {
      return false;
    }
  };

  const resetElement = (element) => {
    element.classList.remove('animate');
    element.style.transitionDuration = "0s";
  }

  const resetSlider = () => {
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
  }
})();
