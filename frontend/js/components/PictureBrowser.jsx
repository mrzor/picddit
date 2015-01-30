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
    console.log("componentDidMount")
    Actions.RedditStore.nextPicture()
  },

  render: function() {
    return (
      <div className='row pdt-picture-browser'>
        <h2>Pictures for {'r/' + this.state.subreddit}</h2>
        <div className='panel panel-default'>
          <h3>{this.state.imageTitle}</h3>
          <img src={this.state.imageUrl} style={{width: '100%', height: innerHeight * 0.7}}></img>
          <input ref="next-image" value="Next" type="button" className='btn btn-default btn-small' onClick={this.showNext} />
        </div>
      </div>
    );
  },

  showNext: function(e) {
    Actions.RedditStore.nextPicture()
    e.preventDefault();
  }
});

module.exports = PictureBrowser;
