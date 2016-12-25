const content = {};

// ajax request to get playlist data
(function() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3333/data');
  xhr.onload = () => {
    if (xhr.status === 200) {
      content.data = parseData(xhr.responseText);
      initializeDOM();
    } else {
      alert(`Request failed with status: ${xhr.status}`);
    }
  };
  xhr.send();
})();

/**
 * parse data for content.
 * @param {string} data - string from ajax request to be parsed as json.
 * @return {object} - an object holding arrays of content data.
 */
function parseData(data) {
  data = JSON.parse(data);
  content.thumbnailUrls = data.map((obj) => {
    let imageUrl = `https://static01.nyt.com/${obj['images'][3]['url']}`;
    return imageUrl;
  });
  content.videoUrls = data.map((obj) => {
    let videoUrl = obj['renditions'][1]['url'];
    return videoUrl;
  });
  return data;
}

/**
 * add video and thumbnail images to view.
 *
 */
function initializeDOM() {
  let thumbnailElements = document.querySelectorAll('div.thumbnails');
  let videoElement = document.querySelector('video');
  let videoTitle = document.querySelector('h1.video-title');
  let videoDescription = document.querySelector('h3.video-description');
  // set up video thumbnails
  let currentThumbImgClasses = thumbnailElements[0]
    .querySelector('img').classList;
  currentThumbImgClasses.add('current-video');
  for (let i = 0; i < thumbnailElements.length; i++) {
    let imgElement = thumbnailElements[i].querySelector('img');
    imgElement.src = content.thumbnailUrls[i];
    imgElement.addEventListener('click', (event) => {
      event.preventDefault();
      currentThumbImgClasses.remove('current-video');
      playSpecificVideo(i);
    });
  }
  // set up video element
  videoElement.src = content.videoUrls[0];
  content.currentVideo = 0;
  videoElement.addEventListener('ended', (event) => {
    event.preventDefault();
    currentThumbImgClasses.remove('current-video');
    playNextVideo(videoElement);
  });
  // set up video info section
  videoTitle.innerHTML = content.data[0]['title'];
  videoDescription.innerHTML = content.data[0]['summary'];
}

/**
 * plays next video after previous video ends.
 * @param {object} videoElement - HTML video element.
 *
 */
 function playNextVideo(videoElement) {
   content.currentVideo === content.videoUrls.length - 1
     ? content.currentVideo = 0
     : content.currentVideo++;
   videoElement.src = content.videoUrls[content.currentVideo];
   videoTitle.innerHTML = content.data[content.currentVideo]['title'];
   videoDescription.innerHTML =
    content.data[content.currentVideo]['description'];
   videoElement.load();
   videoElement.play();
   updateThumbnails(content.currentVideo);
 }

 /**
  * plays a specific video on click of thumbnail.
  * @param {object} videoElement - HTML video element.
  * @param {number} whichVideo - index of video to play.
  *
  */
 function playSpecificVideo(videoElement, whichVideo) {
  //  videoElement.pause();
   videoElement.src = content.videoUrls[whichVideo];
   videoTitle.innerHTML = content.data[whichVideo]['title'];
   videoDescription.innerHTML = content.data[whichVideo]['description'];
   videoElement.load();
   videoElement.play();
   content.currentVideo = whichVideo;
   updateThumbnails(whichVideo);
 }

 /**
  * plays a specific video on click of thumbnail.
  * @param {number} whichVideo - index of video to play.
  *
  */
 function updateThumbnails(whichVideo) {
   let thumbnailElements = document.querySelectorAll('div.thumbnails');
   let thumbnailImgClasses = thumbnailElements[whichVideo]
     .querySelector('img').classList;
   thumbnailImgClasses.add('current-video');
 }
