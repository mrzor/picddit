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

        <footer className="footer">
          <a target="_blank" href="https://github.com/mrzor/picddit">
            <i className="fa fa-github-alt"></i> Picddit sourcecode is available in octocat-land.
          </a>
        </footer>
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
