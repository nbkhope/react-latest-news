var PostRow = React.createClass({
  render: function() {
    return (
      <li className="collection-item avatar">
        <i className="material-icons circle red">thumb_up</i>
        <a href={this.props.post.link} className="title">{this.props.post.title}</a>
        <span className="badge">{this.props.post.likes} likes</span>
      </li>
    );
  }
});

var PostList = React.createClass({
  render: function() {
    var posts = this.props.posts
      // first filter the posts accordingly to searchBar
      .filter(function(element) {
        // only allow posts whose filterText match the post title
        return element.title.toLowerCase().indexOf(this.props.filterText.toLowerCase()) > -1;
      }.bind(this)) // note the bind(this) right after closing brace for the function
      // then transform posts into PostRow components
      .map(function(element) {
        return <PostRow key={element.id} post={element} />
      });

    return (
      <ul className="collection">
        {posts}
      </ul>
    );
  }
});

var SearchBar = React.createClass({
  handleSearchChange: function(e) {
    this.props.onUserInput(e.target.value);
  },
  render: function() {
    return (
      <div className="row">
        <form>
          <div className="input-field col s12">
            <i className="material-icons prefix">search</i>
            <input
              type="text"
              placeholder="Search..."
              value={this.props.filterText}
              onChange={this.handleSearchChange}/>
          </div>
        </form>
      </div>
    );
  }
});

var PostForm = React.createClass({
  getInitialState: function() {
    return {
      title: '',
      link: '',
    }
  },
  handleTitleChange: function(e) {
    this.setState({
      title: e.target.value
    });
  },
  handleLinkChange: function(e) {
    this.setState({
      link: e.target.value
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var title = this.state.title.trim();
    var link = this.state.link.trim();
    // prevent form from being submitted if any of the input fields are empty
    if (!title || !link) {
      return;
    }

    // Call upon the parent component to submit the post
    this.props.onPostSubmit({
      title: title,
      link: link
    });

    // Clear up the form
    this.setState({
      title: '',
      link: ''
    });
  },
  render: function() {
    return (
      <div>
        <h3>Create New Post</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleTitleChange}/>
            <input
              type="text"
              placeholder="Link URL"
              value={this.state.link}
              onChange={this.handleLinkChange}/>
            <button type="submit" className="btn waves-effect waves-light">
              Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
});

var FilterablePostList = React.createClass({
  getInitialState: function() {
    // Returns the initial state object
    return {
      filterText: '', // for the SearchBar component
      posts: [] // for the PostList component
    };
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          posts: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleUserInput: function(filterText) {
    this.setState({
      filterText: filterText
    });
  },
  handlePostSubmit: function(post) {
    // initialize number of likes to zero here
    // since our fake backend won't do it for us
    post.likes = 0;
    
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: post,
      context: this
    })
      .then(function(data) {
        this.setState({
          posts: this.state.posts.concat(post)
          // posts: data
        });
        console.log(data);
      })
      .fail(function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      })
      ;
  },
  render: function() {
    return (
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <h1>Latest News</h1>

          <SearchBar
            filterText={this.state.filterText}
            onUserInput={this.handleUserInput}/>

          <PostList
            posts={this.state.posts}
            filterText={this.state.filterText}/>

          <PostForm onPostSubmit={this.handlePostSubmit}/>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<FilterablePostList url="/posts" />, document.getElementById('content'));
