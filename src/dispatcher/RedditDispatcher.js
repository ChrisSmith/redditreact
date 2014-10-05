var reddit = window.reddit = window.reddit || {};

reddit.RedditDispatcher = _.extend(new window.Dispatcher(), {
	
	handleServerAction: function(action){
		var payload = {
			source: 'SERVER_ACTION',
			action: action
		};
		this.dispatch(payload);
	},

	handleViewAction: function(action){
		var payload = {
			source: 'VIEW_ACTION',
			action: action
		};
		this.dispatch(payload);
	}


});