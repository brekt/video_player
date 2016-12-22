'use strict';

var content = {};

// ajax request to get playlist data
(function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3333/data');
  xhr.onload = function () {
    if (xhr.status === 200) {
      content.data = parseData(xhr.responseText);
      initializeDOM(content.data);
    } else {
      alert('Request failed with status: ' + xhr.status);
    }
  };
  xhr.send();
})();

/**
 * parse data for content
 * @param {string} data - string from ajax request to be parsed as json.
 * @return {object} - an object holding arrays of content data.
 */
function parseData(data) {
  data = JSON.parse(data);
  content.thumbnailUrls = data.map(function (obj) {
    var imageUrl = 'https://static01.nyt.com/' + obj['images'][3]['url'];
    return imageUrl;
  });
  content.videoUrls = data.map(function (obj) {
    var videoUrl = obj['renditions'][1]['url'];
    return videoUrl;
  });
  content.data = data; // replacing string with parsed json on global obj;
  return content;
}

/**
 * add video and thumbnail images to view
 * @param {object} content - the video playlist content.
 *
 */
function initializeDOM(content) {
  // set up video element
  var videoElement = document.querySelector('video');
  videoElement.src = content.videoUrls[0];
  content.currentVideo = 0;
  videoElement.addEventListener('ended', function (event) {
    event.preventDefault();
    content.currentVideo === content.videoUrls.length - 1 ? content.currentVideo = 0 : content.currentVideo++;
    videoElement.src = content.videoUrls[content.currentVideo];
    videoElement.load();
    videoElement.play();
  });
  // set up video thumbnails
  content.thumbnailUrls.map(function (thumbnailUrl, index) {
    // TODO
  });
}

/**
 * play next video in playlist
 * @param {number} videoElement - the video element in the DOM.
 * @param {object} currentVideo - the index of the current video URL.
 *
 */
function playNextVideo(videoElement, currentVideo) {
  alert('video ended');
  currentVideo > 3 ? currentVideo = 0 : currentVideo++;
  videoElement.src = content.videoUrls[currentVideo];
  videoElement.load();
  videoElement.play();
  content.currentVideo = currentVideo;
}