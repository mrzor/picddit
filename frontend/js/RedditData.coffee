# While the RedditStore handles Reflux Actions, this class handles
# JSON-RPC to Reddit and JSON massaging.

reqwest = require('reqwest')
_ = require('lodash')

class RedditData
  constructor: () ->
    @_subreddit = 'funny'
    @_imageDictionary = {}
    @_unseenImageKeyList = []
    @_nextPageLink = undefined
    @_pictureUrlMatcher = /\.(jpg|png|gif)$/
    # gifv/imgur HTML needs more massaging (usually galleries)

  setSubreddit: (subreddit) ->
    @_unseenImageKeyList = []
    @_subreddit = subreddit

  getSubreddit: () ->
    @_subreddit

  getNextImage: (callback, errback) ->
    nextImage = @_unseenImageKeyList.shift()

    if (nextImage)
      callback(nextImage)
    else
      @_fetchImages(
        () ->
          nextImage = @_unseenImageKeyList.shift()
          callback(nextImage)
          return
      , errback)

    undefined

  _onFetchSuccess: (response, callback, errback) ->
    if (response.kind != "Listing")
      errback("Reddit response is not of the 'Listing' kind.")
      return

    @_nextPageLink = response.data.after

    imageObjects = _.filter(response.data.children, (obj) ->
      @_pictureUrlMatcher.test(obj.data.url)
    , @)

    _.forEach(imageObjects, (obj) ->
      if !_.has(@_imageDictionary, obj.data.url)
        @_imageDictionary[obj.data.url] = obj.data
        @_unseenImageKeyList.push(obj.data)
    , @)

    callback.bind(@)()

  _onFetchFailure: (err, errback) ->
    console.log("fetch failed")
    errback(err)

  _fetchImages: (callback, errback) ->
    # XXX handle @_nextPageLink
    reqUrl = 'https://www.reddit.com/r/' + @_subreddit + '.json'
    reqwest({
      url: reqUrl,
      crossOrigin: true,
      success: _.bind(@_onFetchSuccess, @, _, callback, errback),
      error: _.bind(@_onFetchFailure, @, _, errback)
    })


module.exports = RedditData
