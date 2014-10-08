/** @jsx React.DOM */  

var Comment = React.createClass({
  
  getInitialState: function() {
    return {data:{} };
  },

  render: function(){
    return (
        <div className="post">
          <div>{this.props.data.body}</div>
          <div className="clearfix" ></div>
        </div>
      )
  }
});

var CommentList = React.createClass({

  render: function() {
    var itemNodes = this.props.comments.map(function(comment) {
      
      return (
          <Comment data={comment.data} key={comment.data.id} />
          );
    });
    
    return (
        <div className="postList">
          {itemNodes}   
        </div>
        );
  }
});


var CommentListView = React.createClass({

  getStateFromStores: function() {
    return {
      comments: reddit.SubRedditStore.getComments(this.props.subreddit, this.props.article)
    };
  },

  getInitialState: function() {
    return this.getStateFromStores();
  },

  componentDidMount: function() {
      console.log("CommentListView: componentDidMount");
      reddit.SubRedditStore.addChangeListener(this._onChange);
      reddit.WebUtils.getComments(this.props.subreddit, this.props.article);
  },

  componentWillUnmount: function() {
    console.log("CommentListView: componentWillUnmount");
    reddit.SubRedditStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(this.getStateFromStores());
  },

  render: function() {
    return (
         <CommentList comments={this.state.comments} />
      )
  }
});