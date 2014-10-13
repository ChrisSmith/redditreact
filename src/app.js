/** @jsx React.DOM */  

var Post = React.createClass({
  
  getInitialState: function() {
    return {data:{} };
  },

  onClick: function(){
    Backbone.history.navigate(this.props.data.permalink, {trigger: true});
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

 

var NavigationView = React.createClass({

  getHome: function(){
    var home = {
      href: Backbone.history.root + "/#",
      name: "reddit"
    };
  },

  getInitialState: function(){
    return {
      links: [this.getHome()]
    };
  },

  setRoute: function(subreddit, article){
      var links = [this.getHome()];
      if(subreddit){
        links.push({
          href: Backbone.history.root + "/#r/"+subreddit,
          name: "/r/"+subreddit
        });
      }

      if(article){
        links.push({
          href: Backbone.history.root + "/#r/"+subreddit+'/comments/'+article,
          name: '/'+article
        });
      }

      this.setState({links: links});
  },

  render: function(){
    var links = this.state.links.map(function(link) {
        return (
          <li><a href={link.href}>{link.name}</a></li>
        );
    });
    
    return (
      <ul className="links">
        {links} &nbsp;
      </ul>
      );
  }

});




