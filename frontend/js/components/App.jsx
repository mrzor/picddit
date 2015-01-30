/** @jsx React.DOM */

var PictureBrowser = require("./PictureBrowser.jsx");

var App = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div style={ { border: '1px solid cyan' } }>
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
