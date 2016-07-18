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
    var posts = [
      { title: "New version of Ruby on Rails released", link: "#", likes: 3 },
      { title: "JavaScript is the most popular language according to Stack Overflow", link: "#", likes: 2 },
      { title: "Coding jobs are on demand for 2016", link: "#", likes: 0 }
    ].map(function(element) {
      return <PostRow post={element} />
    });

    return (
      <ul className="collection">
        {posts}
      </ul>
    );
  }
});

ReactDOM.render(<PostList />, document.getElementById('content'));
