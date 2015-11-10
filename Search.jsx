// Search component
Search = React.createClass({ 

  propTypes: {
    is_loading: React.PropTypes.bool.isRequired,
    handleRequest: React.PropTypes.func.isRequired
  },

  getInitialState() { 
    return {
      search_value: 'http://www.arthurgerbelot.com/rav/Gutenberg.txt'
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

    this.props.handleRequest(url);
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
          {this.renderSubmit()}
        </div>
      </form>
    );
  },

  renderSubmit() {
    console.log("props: ", this.props);
    if (this.props.is_loading) {
      return <span>Loading</span>
    } else {
      return <input type="submit" className="button" />
    }
  }
});