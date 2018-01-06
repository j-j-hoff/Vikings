
let imageSlider = null;
let image = null;

window.addEventListener('load', function() {
  imageSlider = document.querySelector('.image-slider');
  image = imageSlider.querySelector('.image');
  imageSlider.addEventListener("touchstart", touchHandler, false);
  imageSlider.addEventListener("touchmove", touchHandler, false);
  imageSlider.addEventListener("touchend", touchHandler, false);
});


let startClientX = null;
let endClientX = null;
let deltaClientX = null;

function touchHandler(e) {
  if (e.type == "touchstart") {
    startClientX = e.touches[0].clientX;
    image.classList.remove('animate');
    image.style.transitionDuration = "0s";
  } else if (e.type == "touchmove") {
    e.preventDefault();
    const prev = endClientX ? endClientX : startClientX;
    endClientX = e.touches[0].clientX;
    var rect = image.getBoundingClientRect();
    deltaClientX = ((startClientX - endClientX) / window.innerWidth) * 100;
    console.log(deltaClientX);
    image.style.transform = `translateX(-${100+deltaClientX}%)`;

  } else if (e.type == "touchend" || e.type == "touchcancel") {
    startClientX = null;
    endClientX = null;
    deltaClientX = null;
    image.classList.add('animate');
    image.style.transitionDuration ="0.5s";
    image.style.transform = 'translateX(-100%)';
  }
}
