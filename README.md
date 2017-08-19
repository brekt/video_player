# Summary
This is a responsive video player built with vanilla JS (ES6) and HTML5. The code is transpiled to ES5 with Babel. The server is an Express server. The tests run with Mocha and test the playlist JSON data. Linting is done with ESLint according to Google conventions. Although I'm using vanilla JS, it's similar to a single page MVC. The file playlist.json is the model, index.html is the view, and main.js is the controller.

I use npm scripts instead of task managers or bundlers.
```
git clone git@github.com:brekt/video_player.git
cd video_player
npm i
npm start
```
Navigate to localhost:3333.&ast;

&ast;_If you want to test on mobile rather than just the device emulator, you'll need to change line 14 in src/es6/main.es6 to your machine's local ip and run `npm start` again._
# Testing
```
npm test
```
# TODO
* Turn the player into a React component.
  * Use Jest for testing.
* Use Webpack to bundle files and spin up a testing server.
