var Actions = require('../Actions')
var RedditData = require('../RedditData')

var RedditStore = Reflux.createStore({
  listenables: [Actions.RedditStore],

  init: function() {
    this.stuff = {
      currentImageUrl: undefined,
      currentImageTitle: undefined,
      nextPictureLoading: false,
      redditData: new RedditData()
    };
  },

  getInitialState: function() {
    return this.stuff;
  },

  handleNextImage: function(nextImage) {
    if (nextImage === undefined) {
      console.error("RedditStore: something is wrong.")
      return;
    };

    this.stuff.currentImageUrl = nextImage.url;
    this.stuff.currentImageTitle = nextImage.title;
    this.stuff.nextPictureLoading = false;
    this.trigger(_this.stuff);
  },

  onNextPicture: function() {
    _this = this;

    if (this.stuff.nextPictureLoading == false) {
      this.stuff.nextPictureLoading = true;
      this.trigger(this.stuff);

      this.stuff.redditData.getNextImage(
        this.handleNextImage.bind(this),
        function (err) {
          console.warn('getting next picture errbacked', err)
          this.stuff.nextPictureLoading = false;
        }.bind(this));
    }
  },

  onPickSubreddit: function(pickedSubreddit) {
    this.stuff.redditData.setSubreddit(pickedSubreddit);
    this.trigger(this.stuff);
  }
});

module.exports = RedditStore;
