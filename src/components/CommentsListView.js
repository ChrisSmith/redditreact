/** @jsx React.DOM */  

var LoadMoreCommentsView = React.createClass({

  onClick: function(){
   
    var children = _.reduce(this.props.data.children, function(child, list){ 
        if(list){
          return list + ',' + child ;  
        }
        return child;
    }, '');

    // Can't use this api b/c of CORS :( 
    // $.post("http://www.reddit.com/api/morechildren", {
    //     api_type: 'json',
    //     children: children,
    //     link_id: 't3_'+this.props.articleId,
    //     sort: 'confidence' 
    // });


  },

  render: function(){
    return (
      <div onClick={this.onClick}>load more comments</div>
    );
  }
});


var CommentHeader = React.createClass({

  render: function(){

     var children = this.props.data.replies 
      ? this.props.data.replies.data.children
      : [];

    return (
        <div> 
          <span onClick={this.props.toggleCollapsed}>
            { this.props.collapsed ? '[+]' : '[-]' } &nbsp;

            {this.props.data.author} {this.props.data.score} points ({children.length}) children
          </span>
        </div>
      );
  }
});

var Comment = React.createClass({
  
  getInitialState: function() {
    return {data:{}, collapsed: false };
  },

  toggleCollapsed: function(){
    this.setState({
      collapsed: !this.state.collapsed
    });
  },

  render: function(){

    var children = this.props.data.replies 
      ? this.props.data.replies.data.children
      : [];

    var style = {
      marginLeft: this.props.depth * 5
    };

    var header = (
      <CommentHeader onClick={this.toggleCollapsed} 
        data={this.props.data} 
        collapsed={this.state.collapsed}
        toggleCollapsed={this.toggleCollapsed} /> 
    );

    var body;
    if(!this.state.collapsed){
      body = (
        <div>
          <div>{this.props.data.body}</div>
          <div>Score: {this.props.data.score}</div>
          <div>Author: {this.props.data.author}</div>
          <CommentList comments={children} depth={this.props.depth + 1} articleId={this.props.articleId} />
          <div className="clearfix" ></div>
        </div>
        );
    }
    
    return (
        <div className="post" style={style}>
          {header}
          {body}
        </div>
      );
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
    var articleId = this.props.articleId;

    var itemNodes = this.props.comments.map(function(comment) {
      
      if(comment.kind == "more"){
        return (
            <LoadMoreCommentsView data={comment.data} articleId={articleId} /> 
          )
      }

      return (
          <Comment data={comment.data} key={comment.data.id} depth={depth} articleId={articleId} />
          );
    });
    
    var style = {
      marginLeft: this.props.depth
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
            <a href={this.state.article.data.url} >
              <img src={this.state.article.data.thumbnail}></img>
            </a>
            <h3>{this.state.article.data.title}</h3>
            <div>{this.state.article.data.selftext}</div>
            <div>Score: {this.state.article.data.score}</div>
            <div>Author: {this.state.article.data.author}</div> 
            <div className="clearfix" ></div>
          </div>

           <CommentList articleId={this.props.articleId} comments={this.state.comments} depth={0}/>
        </div>
      )
  }
});