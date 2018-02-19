let currentVideo = null;

function onYouTubeIframeAPIReady() {
  const imageSliders = document.querySelectorAll('.image-slider');
  const videos = document.querySelectorAll('.video-component');
  if (!videos) return;
  if (!imageSliders) return;
    imageSliders.forEach(imageSlider => {
      const btnPrev = imageSlider.querySelector('.btnPrev');
      const btnNext = imageSlider.querySelector('.btnPrev');
      if (btnNext) btnNext.addEventListener('click', closeVideo);
      if (btnPrev) btnPrev.addEventListener('click', closeVideo);
  });

  videos.forEach(video => {
    const videoElm = new videoPlayer(video);
    video.querySelector('.video-play-icon').addEventListener('click', videoElm.showVideo);
    video.querySelector('.close-video').addEventListener('click', videoElm.closeVideo);
  });
}

const closeVideo = () => {
  if (currentVideo) currentVideo.closeVideo();
};
class videoPlayer {
  constructor(video) {
    this.showVideo = this.showVideo.bind(this);
    this.closeVideo = this.closeVideo.bind(this);
    this.videoComponent = video;
    this.createPlayer();
  };

  createPlayer() {
    const videoId = this.videoComponent.dataset.videoId;
    this.player = new YT.Player(this.videoComponent.querySelector('.video-slot'), {
      videoId: videoId,
    });
  };

  showVideo() {
    const vidoeOverlay = this.videoComponent.querySelector('.video-overlay');
    vidoeOverlay.style.display = 'flex';
    this.player.playVideo();
    currentVideo = this;
  };
   
  closeVideo() {
    this.player.stopVideo();
    const vidoeOverlay = this.videoComponent.querySelector('.video-overlay');
    vidoeOverlay.style.display = 'none';
    currentVideo = null;
  };
};
