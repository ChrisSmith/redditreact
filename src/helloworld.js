/** @jsx React.DOM */  

var Post = React.createClass({
  
  getInitialState: function() {
    return {data:{} };
  },

  onClick: function(){
    window.location = "http://reddit.com" + this.props.data.permalink;
  },

  render: function(){
    return (
        <div onClick={this.onClick} className="post">
          <img src={this.props.data.thumbnail}></img>
          <h3>{this.props.data.title}</h3>
          <div>{this.props.data.selftext}</div>
          <div className="clearfix" ></div>
        </div>
      )
  }
});

var PostList = React.createClass({


  render: function() {
    var itemNodes = this.props.posts.map(function(post) {
      
      return (
          <Post data={post.data} key={post.data.id} />
          );
    });
    
    return (
        <div className="postList">
          {itemNodes}
        </div>
        );
  }
});


var RedditApp = React.createClass({
  getInitialState: function() {
    return {posts: [], subreddit: ''};
  },
  
  refreshFromServer: function() {
    $.ajax({
      url: "http://www.reddit.com/r/" + this.props.subreddit + ".json",
      dataType: 'json',
      success: function(data) {
        this.setState({posts: data.data.children});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.refreshFromServer();
    //setInterval(this.refreshFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div>
        <h3>Reddit Single Page App</h3>
        <PostList posts={this.state.posts} />
      </div>
    );
  }
});