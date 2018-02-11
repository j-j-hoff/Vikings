window.addEventListener('load', function() {
  const videos = document.querySelectorAll('.video-component');
  if (!videos) return;
  videos.forEach(video => {
    videoPlayer.init(video);
  });
});

const videoPlayer = (() => {
  let player = null;
  let videoComponent = null;

  const init = (video) => {
    videoComponent = video;
    createPlayer();
    video.querySelector('.video-play-icon').addEventListener('click', showVideo);
    video.querySelector('.close-video').addEventListener('click', closeVideo);
    const parent = video.parentNode.parentNode.parentNode;
    const btnPrev = parent.querySelector('.btnPrev');
    const btnNext = parent.querySelector('.btnPrev');
    if (btnNext) btnNext.addEventListener('click', closeVideo);
    if (btnPrev) btnPrev.addEventListener('click', closeVideo);
  };

  const createPlayer = () => {
    const videoId = videoComponent.dataset.videoId;
    player = new YT.Player(videoComponent.querySelector('.video-slot'), {
      videoId: videoId,
    });
  };

  const showVideo = (event) => {
    const eventSrc = event.target || event.srcElement;
    const vidoeOverlay = videoComponent.querySelector('.video-overlay');
    vidoeOverlay.style.display = 'flex';
    player.playVideo();
  };
  
  
  const closeVideo = (event) => {
    player.stopVideo();
    const vidoeOverlay = videoComponent.querySelector('.video-overlay');
    vidoeOverlay.style.display = 'none';
  };

  return { init: init }
})();
