var reddit = window.reddit = window.reddit || {};


reddit.SubRedditActionCreator = _.extend({

	receiveAllSubReddits: function(rawData){
		reddit.RedditDispatcher.handleServerAction({
			type: reddit.ActionTypes.RECEIVE_RAW_SUBREDDITS,
			rawData: rawData
		});
	},

	receivePosts: function(subreddit, rawData){
		reddit.RedditDispatcher.handleServerAction({
			type: reddit.ActionTypes.RECEIVE_RAW_POSTS,
			subreddit: subreddit,
			rawData: rawData
		});
	},

	receiveComments: function(subreddit, article, rawData){
		reddit.RedditDispatcher.handleServerAction({
			type: reddit.ActionTypes.RECEIVE_RAW_COMMENTS,
			subreddit: subreddit,
			article: article,
			rawData: rawData
		});	
	}


});