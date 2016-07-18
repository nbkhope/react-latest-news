var PostRow = React.createClass({
  render: function() {
    return (
      <li className="collection-item avatar">
        <i className="material-icons circle red">thumb_up</i>
        <a href="#" className="title">New version of Ruby on Rails released</a>
        <span className="badge">3 likes</span>
      </li>
    );
  }
});

ReactDOM.render(<PostRow />, document.getElementById('content'));
