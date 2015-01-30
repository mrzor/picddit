# While the RedditStore handles Reflux Actions, this class handles
# JSON-RPC to Reddit and JSON massaging.
#
# This is pretty far from all the Immutable goodness that's flying around.


reqwest = require('reqwest')
_ = require('lodash')

class RedditData
  constructor: () ->
    # current source of images
    @_subreddit = 'funny'

    # hash to remember all the images we've encountered
    @_imageDictionary = {}

    # image URLs we haven't seen yet. array is used as a queue / LIFO.
    @_unseenImageKeyList = []

    # reddit key for pagination.
    @_nextPageLink = undefined

    @_pictureUrlMatcher = /\.(jpg|png|gif)$/
    # gifv/imgur HTML needs more massaging (usually galleries)

  setSubreddit: (subreddit) ->
    # Images we haven't seen, we remove from the dictionary.
    # (so that if we come back to the subreddit, they get a chance to be seen again)
    _.forEach(@_unseenImageKeyList, (unseenKey) ->
      delete @_imageDictionary[unseenKey];
    , @)

    # Trash the list and reset the subreddit
    @_nextPageLink = undefined
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

    newImageCount = 0

    imageObjects = _.filter(response.data.children, (obj) ->
      @_pictureUrlMatcher.test(obj.data.url)
    , @)

    _.forEach(imageObjects, (obj) ->
      if !_.has(@_imageDictionary, obj.data.url)
        @_imageDictionary[obj.data.url] = obj.data
        @_unseenImageKeyList.push(obj.data)
        newImageCount += 1
    , @)

    if newImageCount > 0
      callback.bind(@)()
    else
      # XXX this could recurse ourselves into oblivion
      console.log("Found no image this time, trying next page")
      @_fetchImages(callback, errback)

  _onFetchFailure: (err, errback) ->
    console.log("fetch failed")
    errback(err)

  _fetchImages: (callback, errback) ->
    reqUrl = 'https://www.reddit.com/r/' + @_subreddit + '.json'
    reqwestParams = {
      url: reqUrl,
      crossOrigin: true,
      success: _.bind(@_onFetchSuccess, @, _, callback, errback),
      error: _.bind(@_onFetchFailure, @, _, errback)
    }

    if (@_nextPageLink)
      console.log("Going after #{@_nextPageLink}")
      reqwestParams.data = { after: @_nextPageLink }

    reqwest(reqwestParams)


module.exports = RedditData
