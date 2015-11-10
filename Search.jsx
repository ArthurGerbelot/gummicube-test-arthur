// Search component
Search = React.createClass({ 

  getInitialState() { 
    return {
      search_value: 'http://www.gutenberg.org/cache/epub/6133/pg6133.txt'
    }
  },

  handleChange() {
    this.setState({
      search_value: this.refs['search-input'].value
    })
  },

  handleSubmit(e) {
    e.preventDefault();
    var url = this.state.search_value;

    Meteor.http.call("GET", url, function(err, result) { 
      console.log("-- SERVER SIDE --");
      console.log("err : ", err);
      console.log("result : ", result);
    });
    // Make a request from server 
    Meteor.call('makeRequest', url, function(err, result) {
      console.log("-- SERVER SIDE --");
      console.log("err : ", err);
      console.log("result : ", result);
    });
  }, 

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="search row"> 
        <div className="column large-10 medium-8">
          <label>
            Insert URL here
            <input 
              type="text" 
              name="search-input" 
              ref="search-input" 
              value={this.state.search_value} 
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className="column large-2 medium-4">
          <input type="submit" className="button" />
        </div>
      </form>
    );
  }
});