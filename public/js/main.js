'use strict';

var content = {};

// ajax request to get playlist data
(function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3333/data');
  xhr.onload = function () {
    if (xhr.status === 200) {
      content.data = parseData(xhr.responseText);
      initializeDOM();
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
 *
 */
function initializeDOM() {
  var thumbnailElements = document.querySelectorAll('div.thumbnails');
  var videoElement = document.querySelector('video');
  // set up video thumbnails
  for (var i = 0; i < thumbnailElements.length; i++) {
    var imgElement = thumbnailElements[i].querySelector('img');
    imgElement.src = content.thumbnailUrls[i];
  }
  // set up video element
  videoElement.src = content.videoUrls[0];
  content.currentVideo = 0;
  videoElement.addEventListener('ended', function (event) {
    event.preventDefault();
    content.currentVideo === content.videoUrls.length - 1 ? content.currentVideo = 0 : content.currentVideo++;
    videoElement.src = content.videoUrls[content.currentVideo];
    videoElement.load();
    videoElement.play();
  });
}