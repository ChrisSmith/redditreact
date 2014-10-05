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


var PostListView = React.createClass({

  getStateFromStores: function() {
    return {
      posts: reddit.SubRedditStore.getPosts(this.props.subreddit)
    };
  },

  getInitialState: function() {
    return this.getStateFromStores();
  },

  componentDidMount: function() {
      console.log("post list view: componentDidMount");
      reddit.SubRedditStore.addChangeListener(this._onChange);
      reddit.WebUtils.getPosts(this.props.subreddit);
  },

  componentWillUnmount: function() {
    console.log("post list view: componentWillUnmount");
    reddit.SubRedditStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(this.getStateFromStores());
  },

  render: function() {
    return (
         <PostList posts={this.state.posts} />
      )
  }
});