// Search component
Search = React.createClass({ 

  propTypes: {
    is_loading: React.PropTypes.bool.isRequired,
    handleRequest: React.PropTypes.func.isRequired
  },

  getInitialState() { 
    return {
      type: 'input',
      input_value: 'http://gummicube-test-arthur.meteor.com/Gutenberg.txt',
      textarea_value: 'Apple bacon cherry, apple cherry, bacon      cherry. Bacon\napple cherry apple\n\nbacon cherry bacon.',
    }
  },

  handleTypeChange(e) {
    this.setState({
      type: e.currentTarget.value
    });
  },

  handleChange() {
    var update = {};
    var type = this.state.type;

    update[type + '_value'] = this.refs['search-' + type].value;
    this.setState(update);
  },

  handleSubmit(e) {
    e.preventDefault();
    var type = this.state.type;

    this.props.handleRequest({
      type: type,
      value: this.state[type + '_value']
    });
  }, 

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="search row"> 
        <div className="column large-3 medium-4">
          {this.renderRadio()}
        </div>
        <div className="column large-7 medium-8">
          {this.renderInput()}
        </div>
        <div className="column large-2 medium-4">
          {this.renderSubmit()}
        </div>
      </form>
    );
  },

  renderRadio() {
    return (
      <div>
        <label>Type</label>
        <div className="radios">
          <input 
            type="radio" 
            name="type" 
            ref="type-input" 
            value="input" 
            id="type-input"
            checked={this.state.type === 'input'} 
            onChange={this.handleTypeChange} />
          <label htmlFor="type-input">Input</label>
          <input 
            type="radio" 
            name="type" 
            ref="type-textarea" 
            value="textarea" 
            id="type-textarea" 
            checked={this.state.type === 'textarea'}
            onChange={this.handleTypeChange} />
          <label htmlFor="type-textarea">Textarea</label>
        </div>
      </div>
    );
  },

  renderInput() {
    if (this.state.type === 'input') {
      return (
        <label>
          Insert URL
          <input 
            type="text" 
            name="search-input" 
            ref="search-input" 
            value={this.state.input_value} 
            onChange={this.handleChange}
          />
        </label>
      );
    } else {
      return (
        <label>
          Insert Text
          <textarea 
              name="search-textarea" 
              ref="search-textarea" 
              rows="4"
              value={this.state.textarea_value} 
              onChange={this.handleChange} />
        </label>
      );
    }
  },

  renderSubmit() {
    if (this.props.is_loading) {
      return <span>Loading</span>
    } else {
      return <input type="submit" className="button" />
    }
  }
});