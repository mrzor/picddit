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

  onNextPicture: function() {
    _this = this;

    if (this.stuff.nextPictureLoading == false) {
      this.stuff.nextPictureLoading = true;
      this.trigger(this.stuff);

      this.stuff.redditData.getNextImage(
        function(nextImage) {
          _this.stuff.currentImageUrl = nextImage.url;
          _this.stuff.currentImageTitle = nextImage.title;
          _this.stuff.nextPictureLoading = false;
          _this.trigger(_this.stuff);
          console.log("RedditStore: next picture set, store is triggering")
        },
        function (err) {
          console.warn('getting next picture errbacked', err)
          _this.stuff.nextPictureLoading = false;
        });
    }
  },

  onPickSubreddit: function(pickedSubreddit) {
    this.stuff.redditData.setSubreddit(pickedSubreddit);
    this.trigger(this.stuff);
  }
});

module.exports = RedditStore;
