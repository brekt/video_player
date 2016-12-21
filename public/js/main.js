'use strict';

var content = {};

// ajax request to get playlist data
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3333/data');
xhr.onload = function () {
  if (xhr.status === 200) {
    content = parseData(xhr.responseText);
    console.log(content.thumbnails);
    console.log(content.videos);
  } else {
    alert('Request failed.  Returned status of ' + xhr.status);
  }
};
xhr.send();

// parse data for content
function parseData(data) {
  console.log(data);
  data = JSON.parse(data);
  content.thumbnails = data.map(function (obj) {
    var imageUrl = 'https://static01.nyt.com/' + obj['images'][3]['url'];
    return imageUrl;
  });
  content.videos = data.map(function (obj) {
    var videoUrl = 'https://static01.nyt.com/' + obj['renditions'][1]['url'];
    return videoUrl;
  });
  return content;
}