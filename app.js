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
    var posts = this.props.posts.map(function(element) {
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
  render: function() {
    return (
      <div className="row">
        <form>
          <div className="input-field col s12">
            <i className="material-icons prefix">search</i>
            <input
              type="text"
              placeholder="Search..."
              value={this.props.filterText}/>
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
      posts: [
        { id: 1, title: "New version of Ruby on Rails released", link: "#", likes: 3 },
        { id: 2, title: "JavaScript is the most popular language according to Stack Overflow", link: "#", likes: 2 },
        { id: 3, title: "Coding jobs are on demand for 2016", link: "#", likes: 0 }
      ] // for the PostList component
    };
  },
  render: function() {
    return (
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <h1>Latest News</h1>

          <SearchBar filterText={this.state.filterText}/>

          <PostList posts={this.state.posts}/>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<FilterablePostList />, document.getElementById('content'));
