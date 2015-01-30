require("./loadcounter");

window.Reflux = require('reflux');
window.RedditStore = require('./stores/RedditStore')
window.Actions = require('./Actions');
window.fetch = require('whatwg-fetch');
window.RedditData = require('./RedditData')
window.rd = new RedditData()

app = React.createFactory(require("./components/App"));

React.render(
  app(),
  document.getElementById('pdt-app-container')
);

document.addEventListener("keydown", (e) ->
  if e.keyCode == 32
    # Space-press, let's trigger the nextPicture action
    Actions.RedditStore.nextPicture()
    e.preventDefault()
, false);
