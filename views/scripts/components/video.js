let currentVideo = null;

function onYouTubeIframeAPIReady() {
  const imageSliders = document.querySelectorAll('.image-slider');
  const videos = document.querySelectorAll('.video-component');
  if (!videos) return;
  if (!imageSliders) return;
    for (var i = 0; i < imageSliders.length; i++) {
      const btnPrev = imageSliders[i].querySelector('.btnPrev');
      const btnNext = imageSliders[i].querySelector('.btnNext');
      if (btnNext) btnNext.addEventListener('click', closeVideo);
      if (btnPrev) btnPrev.addEventListener('click', closeVideo);
    }
  
    for (var i = 0; i < videos.length; i++) {
      const videoElm = new videoPlayer(videos[i]);
      videos[i].querySelector('.video-play-icon').addEventListener('click', videoElm.showVideo);
      videos[i].querySelector('.close-video').addEventListener('click', videoElm.closeVideo);
    }
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
