/** @jsx React.DOM */

var NavBar = React.createClass({
  mixins: [Reflux.listenTo(RedditStore, "onStoreChange")],

  onStoreChange: function(storeData) {
    this.setState({
      subreddit: storeData.redditData.getSubreddit()
    });
  },

  getInitialState: function() {
    return {
      subreddit: "funny",
      availableSubreddits: ["funny", "aww", "pics", "spaceporn"]
    };
  },

  render: function() {
    var _this = this;

    navButtons = this.state.availableSubreddits.map(function(subname){
      var activeClass = (_this.state.subreddit == subname) ? "active" : "";

      return (<li className={activeClass}><a
        href={'#'+subname}
        data-subreddit={subname}
        key={subname}
        onClick={_this.onNavClick}>
          r/{subname}
        </a></li>);
    });

    return (
      <nav className="navbar navbar-default navbar-fixed-top pdt-navbar" role="navigation">
        <div className="pdt-fluid-container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">PICDDIT</a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              {navButtons}
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li><a className='pdt-nextbutton' onClick={this.onNextClick} href='#'>
                <i className="fa fa-arrow-right"></i>
                Next <span className="pdt--dimlink">[space]</span>
              </a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  },

  onNavClick: function(e) {
    Actions.RedditStore.pickSubreddit(e.target.dataset.subreddit);
    Actions.RedditStore.nextPicture();
  },

  onNextClick: function(e) {
    Actions.RedditStore.nextPicture();
    e.preventDefault();
  }
});

module.exports = NavBar;
