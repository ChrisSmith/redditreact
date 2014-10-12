/** @jsx React.DOM */  

var Comment = React.createClass({
  
  getInitialState: function() {
    return {data:{} };
  },

  render: function(){

    var children = this.props.data.replies 
      ? this.props.data.replies.data.children
      : [];

    var style = {
      marginLeft: this.props.depth * 20
    };

    return (
        <div className="post" style={style} >
          <div>{this.props.data.body}</div>
          <div>Score: {this.props.data.score}</div>
          <div>Author: {this.props.data.author}</div>
          <div>Depth: {this.props.depth}</div>
          <CommentList comments={children} depth={this.props.depth + 1} />
          <div className="clearfix" ></div>
        </div>
      )
  }
});

var CommentList = React.createClass({

  render: function() {

    if(!this.props.comments){
      return (
        <div>Loading...</div>
      );
    }

    var depth = this.props.depth;

    var itemNodes = this.props.comments.map(function(comment) {
      
      return (
          <Comment data={comment.data} key={comment.data.id} depth={depth} />
          );
    });
    
    var style = {
      marginLeft: this.props.depth * 20
    };

    return (
        <div className="postList" style={style}>
          {itemNodes}   
        </div>
        );
  }
});


var CommentListView = React.createClass({

  getStateFromStores: function() {
    var commentsAndPost = reddit.SubRedditStore.getComments(this.props.subreddit, this.props.articleId);
    return {
      article: commentsAndPost.article,
      comments: commentsAndPost.comments
    };
  },

  getInitialState: function() {
    return this.getStateFromStores();
  },

  componentDidMount: function() {
      console.log("CommentListView: componentDidMount");
      reddit.SubRedditStore.addChangeListener(this._onChange);
      reddit.WebUtils.getComments(this.props.subreddit, this.props.articleId);
  },

  componentWillUnmount: function() {
    console.log("CommentListView: componentWillUnmount");
    reddit.SubRedditStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(this.getStateFromStores());
  },

  render: function() {

    if(!this.state.article){
      return (
        <div>Loading...</div>
        )
    }

    return (
        <div>
          <div className="post">
            <img src={this.state.article.data.thumbnail}></img>
            <h3>{this.state.article.data.title}</h3>
            <div>{this.state.article.data.selftext}</div>
            <div>Score: {this.state.article.data.score}</div>
            <div>Author: {this.state.article.data.author}</div> 
            <div className="clearfix" ></div>
          </div>

           <CommentList comments={this.state.comments} depth={0}/>
        </div>
      )
  }
});