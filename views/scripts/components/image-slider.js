window.addEventListener('load', function() {
  const imageSliders = document.querySelectorAll('.image-slider');
  if (!imageSliders) return;
    imageSliders.forEach(imageSlider => {
      const slidingSection = imageSlider.querySelector('.images')
      if (slidingSection.querySelectorAll('.sliding-element').length < 2) return;

      const btnNext = imageSlider.querySelector('.btnNext');
      btnNext.style.visibility = 'visible';
      imageSlider.querySelector('.btnPrev').addEventListener('click', slider.slidePrev);
      btnNext.addEventListener('click', slider.slideNext);
  });
});

const slider = (() => {
  let slidingElement = null;
  let next = null;
  let prev = null;

  const slideNext = (event) => {
    const [numberOfItems, currentIndex] = mainSlider(event);
    const isLast = currentIndex == numberOfItems -1 || false;
    const willBeLast = (currentIndex + 1) >= numberOfItems -1 || false;
    const btnNext =  slidingElement.parentNode.parentNode.querySelector('.btnNext');
    const btnPrev = slidingElement.parentNode.parentNode.querySelector('.btnPrev');
    btnPrev.style.visibility = 'visible';
    btnNext.style.visibility = willBeLast ? 'hidden' : 'visible';
    if (!isLast) slideToNext(0.5);
  };

  const slidePrev = (event) => {
    const [numberOfItems, currentIndex] = mainSlider(event);
    const isFirst = currentIndex == 0 || false;
    const willBeFirst = (currentIndex -1) <= 0 || false;
    const btnNext =  slidingElement.parentNode.parentNode.querySelector('.btnNext');
    const btnPrev = slidingElement.parentNode.parentNode.querySelector('.btnPrev');
    btnNext.style.visibility = 'visible';
    btnPrev.style.visibility = willBeFirst ? 'hidden' : 'visible';
    if (!isFirst) slideToPrev(0.5);
  };

  const mainSlider = (event) => {
    resetSlider();
    const eventSrc = event.target || event.srcElement;
    const parent = eventSrc.parentNode.parentNode.querySelector('.images');
    assignElements(parent);
    resetElement(slidingElement);
    if (next) resetElement(next);
    if (prev) resetElement(prev);
    const numberOfItems = slidingElement.parentNode.children.length;
    const currentIndex = Array.from(slidingElement.parentNode.children).indexOf(slidingElement);
    return [numberOfItems, currentIndex]
  }

  const slideToPrev = (duration) => {
    slider(slidingElement, duration, 0);
    if (prev) slider(prev, duration, -100);
    if (prev ) prev.classList.add('active');
  } 

  const slideToNext = (duration) => {
    slider(slidingElement, duration, -200);
    if (next) slider(next, duration, -100);
    if (next) next.classList.add('active');
  };

  const assignElements = (parent) => {
    slidingElement = parent.querySelector('.sliding-element.active');
    const children = parent.children;
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

  const resetElement = (element) => {
    element.classList.remove('animate');
    element.style.transitionDuration = "0s";
  }

  const resetSlider = () => {
    slidingElement = null;
    next = null;
    prev = null;
  };

  return {
    slidePrev: slidePrev,
    slideNext: slideNext,
  }
})();
