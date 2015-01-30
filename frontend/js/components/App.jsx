/** @jsx React.DOM */

var NavBar = require("./NavBar");
var PictureBrowser = require("./PictureBrowser");

var App = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div>
        <NavBar />
        <PictureBrowser />
      </div>
    );
  },

  showNext: function(e) {
    console.log("calling actioncreator")
    e.preventDefault();
    PictureBrowserActionCreators.showNext();
  }
});

module.exports = App;
