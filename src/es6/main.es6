const content = {};
let videoElement;
let videoTitle;
let videoDescription;
let thumbnailElements;

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
  videoElement = document.querySelector('video');
  videoTitle = document.querySelector('h1.video-title');
  videoDescription = document.querySelector('h3.video-description');
  thumbnailElements = document.querySelectorAll('div.thumbnails');
  // set up video thumbnails
  let initialThumbImgClasses = thumbnailElements[0]
    .querySelector('img').classList;
  initialThumbImgClasses.add('current-video');
  for (let i = 0; i < thumbnailElements.length; i++) {
    let imgElement = thumbnailElements[i].querySelector('img');
    imgElement.src = content.thumbnailUrls[i];
    imgElement.addEventListener('click', (event) => {
      event.preventDefault();
      playSpecificVideo(i);
    });
    let imgTitle = thumbnailElements[i].querySelector('h4');
    imgTitle.innerHTML = content.data[i]['title'];
  }
  // set up video element
  videoElement.src = content.videoUrls[0];
  content.currentVideo = 0;
  videoElement.addEventListener('ended', (event) => {
    event.preventDefault();
    playNextVideo();
  });
  // set up video info section
  videoTitle.innerHTML = content.data[0]['title'];
  videoDescription.innerHTML = content.data[0]['summary'];
}

/**
 * plays next video after previous video ends.
 *
 */
 function playNextVideo() {
   updateThumbnails(content.currentVideo + 1, content.currentVideo);
   content.currentVideo === content.videoUrls.length - 1
     ? content.currentVideo = 0
     : content.currentVideo++;
   videoElement.src = content.videoUrls[content.currentVideo];
   videoTitle.innerHTML = content.data[content.currentVideo]['title'];
   videoDescription.innerHTML =
    content.data[content.currentVideo]['summary'];
   videoElement.load();
   videoElement.play();
 }

 /**
  * plays a specific video on click of thumbnail.
  * @param {number} whichVideo - index of video to play.
  *
  */
 function playSpecificVideo(whichVideo) {
   updateThumbnails(whichVideo, content.currentVideo);
   videoElement.pause();
   videoElement.src = content.videoUrls[whichVideo];
   videoTitle.innerHTML = content.data[whichVideo]['title'];
   videoDescription.innerHTML = content.data[whichVideo]['summary'];
   videoElement.load();
   videoElement.play();
   content.currentVideo = whichVideo;
 }

 /**
  * plays a specific video on click of thumbnail.
  * @param {number} whichVideo - index of video to play.
  * @param {number} previousVideo - index of previous video.
  *
  */
function updateThumbnails(whichVideo, previousVideo) {
  let previousImgClasses = thumbnailElements[previousVideo]
    .querySelector('img').classList;
  previousImgClasses.remove('current-video');
  let thumbnailImgClasses = thumbnailElements[whichVideo]
    .querySelector('img').classList;
  thumbnailImgClasses.add('current-video');
}
