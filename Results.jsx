// Search component
Results = React.createClass({

  propTypes: {
    results: React.PropTypes.array.isRequired
  },

  render() {
    return (
      <div className="results">
        <div className="row">
          <div className="column">
            <h3><i className="fa fa-star-o"/>Top results</h3>
          </div>
        </div>
        <div className="row">
          {this.renderResults()}
        </div>
      </div>
    );
  },

  renderResults() {
    return _.map(this.props.results, function(r) {
      return (
        <div className="results__result column" key={r[0] + r[1]}>
          {r[0] + ' - ' + r[1]}
        </div>
      );
    });
  },
});