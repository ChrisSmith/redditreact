/** @jsx React.DOM */  

var SubRedditView = React.createClass({
  
  getInitialState: function() {
    return { data:{} };
  },

  onClick: function(){
    Backbone.history.navigate(this.props.data.url, {trigger: true});
  },

  render: function(){
    var subreddit = this.props.data;
    return (
        <div onClick={this.onClick} className="post">
          <h3>{subreddit.display_name}</h3>
        </div>
      )
  }
});

var SubRedditListView = React.createClass({

  getStateFromStores: function() {
    return {
      subreddits: reddit.SubRedditStore.getAll()
    };
  },

  getInitialState: function() {
    return this.getStateFromStores();
  },

  componentDidMount: function() {
      console.log("sub reddit list view: componentDidMount");
      reddit.SubRedditStore.addChangeListener(this._onChange);
      reddit.WebUtils.getAllSubReddits();
  },

  componentWillUnmount: function() {
    console.log("sub reddit list view: componentWillUnmount");
    reddit.SubRedditStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(this.getStateFromStores());
  },

  render: function() {
    var itemNodes = this.state.subreddits.map(function(subreddit) {
      
      return (
          <SubRedditView data={subreddit.data} key={subreddit.data.id} />
          );
    });
    
    return (
        <div className="postList">
          {itemNodes}
        </div>
        );
  }
});
