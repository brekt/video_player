let content = {};

// ajax request to get playlist data
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3333/data');
xhr.onload = () => {
  if (xhr.status === 200) {
    content = parseData(xhr.responseText);
    console.log(content.thumbnails);
  } else {
    alert('Request failed.  Returned status of ' + xhr.status);
  }
};
xhr.send();

// parse data for content
function parseData(data) {
  console.log(data);
  data = JSON.parse(data);
  // content.thumbnails = data.map((obj) => {
  //   let imageUrl = `https://static01.nyt.com/${obj[images][3][url]}`;
  //   return imageUrl;
  // });
  return content;
}
