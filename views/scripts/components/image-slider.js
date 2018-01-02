window.addEventListener('load', function() {
  const imageSliders = document.querySelectorAll('.image-slider');
  imageSliders.forEach((imageSlider) => {
    console.log('Körs');
    if (imageSlider) {console.log('Den finns')}
    imageSlider.addEventListener('click', function(){console.log('Körs');});
    /*imageSlider.addEventListener('touchmove', process_touchmove, false);
    imageSlider.addEventListener('touchend', process_touchend, false);*/
  });
});

const process_touchstart = () => {
  alert('Tocuh');
}
