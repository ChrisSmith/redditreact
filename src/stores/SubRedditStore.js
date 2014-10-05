var reddit = window.reddit = window.reddit || {};


reddit.SubRedditStore = _.extend({
	
	CHANGE_EVENT: 'SubReddits-Change',

  _subreddits: [],
  _postsBySubreddit: {},

	emitChange: function() {
		this.trigger(this.CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(this.CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.off(this.CHANGE_EVENT, callback);
	},

  getAll: function(){
    return this._subreddits;
  },

  getPosts: function(subreddit){
    return this._postsBySubreddit[subreddit] || [];
  },

  dispatch: function(payload){
    var action = payload.action;

    switch(action.type) {

      case reddit.ActionTypes.RECEIVE_RAW_SUBREDDITS:
        this._subreddits = action.rawData.data.children;
        this.emitChange();
        break;

      case reddit.ActionTypes.RECEIVE_RAW_POSTS:
        this._postsBySubreddit[action.subreddit] = action.rawData.data.children;
        this.emitChange();
        break;


      default:
        // do nothing
    }
  }

}, Backbone.Events);


reddit.SubRedditStore.dispatchToken = reddit.RedditDispatcher.register(function(payload){
    reddit.SubRedditStore.dispatch(payload);
});