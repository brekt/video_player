# Summary
This is a responsive video player built with vanilla JS (ES6) and HTML5. The code is transpiled to ES5 with Babel. The server is an Express server. The tests run with Mocha and test the playlist JSON data. Linting is done with ESLint according to Google conventions. Although I'm using vanilla JS, it's similar to a single page MVC. The file playlist.json is the model, index.html is the view, and main.js is the controller.

I use npm scripts instead of task managers or bundlers.
```
git clone git@github.com:brekt/video_player.git
cd video_player
npm i
npm start
```
Navigate to localhost:3333.

# Testing
```
npm test
```
