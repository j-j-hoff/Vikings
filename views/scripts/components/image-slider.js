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

  const isSlide = () => {
    const w = endClientX - startClientX;
    const h = endClientY - startClientY;
    const atan = Math.abs(Math.atan2(h, w) / Math.PI * 180);
    if (atan < 70 || atan > 110) return true;
    return false;
  };

  const touchmove = (e) => {
    const prevVal = endClientX ? endClientX : startClientX;
    endClientX = e.touches[0].clientX;
    endClientY = e.touches[0].clientY;
    if (!isSlide()) return;
    e.preventDefault();
    deltaClientX = ((startClientX - endClientX) / window.innerWidth) * 100;
    slidingElement.style.transform = `translateX(-${100 + deltaClientX}%)`;
    if (next) next.style.transform = `translateX(-${0 + deltaClientX}%)`;
    if (prev) prev.style.transform = `translateX(-${200 + deltaClientX}%)`;
    momentum = Math.abs(prevVal - endClientX);
  }

  const touchend = (e) => {
    if (!isSlide()) {
      resetSlider();
      return;
    }
    const numberOfItems = slidingElement.parentNode.children.length;
    const currentIndex = Array.from(slidingElement.parentNode.children).indexOf(slidingElement);
    const isFirst = currentIndex == 0 || false;
    const isLast = currentIndex == numberOfItems -1 || false;

    const isFlicked = isFlick(isFirst, isLast);
    const duration = isFlicked ? 0.3 : 0.5;
    if (Math.abs(deltaClientX) < 45 && !isFlicked) {
      slider(slidingElement, duration, -100, false);
      if (next) slider(next, duration, 0, false);
      if (prev) slider(prev, duration, -200, false);
    } 
    else if (deltaClientX < 0 && !isFirst) {
      slider(slidingElement, duration, 0);
      if (prev) slider(prev, duration, -100);
      if (prev ) prev.classList.add('active');

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

  const isFlick = (isFirst, isLast) => {
    if (momentum >= 10 && !( (deltaClientX <= 0 && isFirst) || (deltaClientX >= 0 && isLast) ) ){
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
