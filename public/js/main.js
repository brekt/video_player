'use strict';

var content = {};

// ajax request to get playlist data
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3333/data');
xhr.onload = function () {
  if (xhr.status === 200) {
    content = parseData(xhr.responseText);
    populateDOM(content);
  } else {
    alert('Request failed. xhr.status: ' + xhr.status);
  }
};
xhr.send();

/**
 * parse data for content
 * @param {string} data - string from ajax request to be parsed as json.
 * @return {object} - an object holding arrays of content data.
 */
function parseData(data) {
  data = JSON.parse(data);
  content.thumbnails = data.map(function (obj) {
    var imageUrl = 'https://static01.nyt.com/' + obj['images'][3]['url'];
    return imageUrl;
  });
  content.videos = data.map(function (obj) {
    var videoUrl = obj['renditions'][1]['url'];
    return videoUrl;
  });
  return content;
}

/**
 * add video and thumbnail images to view
 * @param {object} content - the video playlist content.
 *
 */
function populateDOM(content) {
  content.videos.map(function (video) {
    var videoElement = document.querySelector('video');
    videoElement.src = content.videos[0];
  });
  content.thumbnails.map(function (thumbnail) {
    // TODO
  });
}