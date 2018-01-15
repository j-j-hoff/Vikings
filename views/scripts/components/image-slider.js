window.addEventListener('load', function() {
  const imageSliders = document.querySelectorAll('.image-slider');
    imageSliders.forEach(imageSlider => {
      const slidingSection = imageSlider.querySelector('.images')
      slidingSection.addEventListener("touchstart", slider.touchHandler, false);
      slidingSection.addEventListener("touchmove", slider.touchHandler, false);
      slidingSection.addEventListener("touchend", slider.touchHandler, false);
  });
});

const slider = (() => {
  let startClientX = null;
  let startClientY = null;
  let endClientX = null;
  let endClientY = null;
  let deltaClientX = null;
  let slidingElement = null;
  let nextElement = null;
  let previousElement = null;
  let touchStartTime = null;
  let deltaTime = null;
  let momentum = null;

  const touchHandler = (e) => {
    slidingElement = e.srcElement.querySelector('.sliding-element.active');
    nextElement = slidingElement.nextSibling;
    previousElement = slidingElement.previousSibling;
    const image = slidingElement.querySelector('.image');
    const slider = slide(image);
    const nextImage = null;
    const prevImage = null;
    
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
      const prev = endClientX ? endClientX : startClientX;
      endClientX = e.touches[0].clientX;
      endClientY = e.touches[0].clientY;
      deltaClientX = ((startClientX - endClientX) / window.innerWidth) * 100;
      image.style.transform = `translateX(-${100 + deltaClientX}%)`;
      momentum = prev - endClientX;
    } else if (e.type == "touchend" || e.type == "touchcancel") {
      const isFlicked = isFlick();
      const duration = isFlicked ? 0.1 : 0.5;
      if (Math.abs(deltaClientX) < 55 && !isFlicked) {
        slider(duration, -100, false);
      } else if (deltaClientX < 0) {
        slider(duration, 0);
      } else if (deltaClientX > 0) {
        slider(duration, -200);
      }
      resetSlider();
    }
  }

  const slide = (image) => (duration, toPosition, removeClass = true) => {
    console.log('körs');
    image.classList.add('animate');
    image.style.transitionDuration =`${duration}s`;
    image.style.transform = `translateX(${toPosition}%)`;
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

  const resetSlider = () => {
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
    momentum = null;
  };

  return {
    touchHandler: touchHandler,
  }
})();
