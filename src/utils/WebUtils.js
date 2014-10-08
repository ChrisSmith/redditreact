var reddit = window.reddit = window.reddit || {};


reddit.WebUtils = _.extend({

	getAllSubReddits: function(){

		$.ajax({
	      url: "http://www.reddit.com/reddits.json",
	      dataType: 'json',
	      success: function(data) {
	        reddit.SubRedditActionCreator.receiveAllSubReddits(data);
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(status, err.toString());
	      }.bind(this)
	    });
	},

	getPosts: function(subreddit){

		$.ajax({
	      url: "http://www.reddit.com/r/"+subreddit+".json",
	      dataType: 'json',
	      success: function(data) {
	        reddit.SubRedditActionCreator.receivePosts(subreddit, data);
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(status, err.toString());
	      }.bind(this)
	    });
	},

	getComments: function(subreddit, article){

		$.ajax({
	      url: "http://www.reddit.com/r/"+subreddit+"/comments/"+article+"/.json",
	      dataType: 'json',
	      success: function(data) {
	        reddit.SubRedditActionCreator.receiveComments(subreddit, article, data);
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(status, err.toString());
	      }.bind(this)
	    });
	}		

}, {});