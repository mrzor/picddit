/** @jsx React.DOM */

var PictureBrowser = React.createClass({
  mixins: [Reflux.listenTo(RedditStore, "onStoreChange")],

  onStoreChange: function(storeData) {
    this.setState({
      imageUrl: storeData.currentImageUrl,
      imageTitle: storeData.currentImageTitle,
      subreddit: storeData.redditData.getSubreddit()
    });
  },

  getInitialState: function() {
    return {
      subreddit: "funny",
    };
  },

  componentDidMount: function() {
    // Start with a picture
    Actions.RedditStore.nextPicture()
  },

  render: function() {
    return (
      <div className='row pdt-picture-browser'>
        <h2>{this.state.imageTitle}</h2>

        <img
          className='pdt-main-image'
          src={this.state.imageUrl}
          style={{maxWidth: '100%', display: 'none' }}
          onLoad={this.showImage}
        ></img>
      </div>
    );
  },

  showImage: function(e) {
    e.target.style.display = "";
  },
});

module.exports = PictureBrowser;
