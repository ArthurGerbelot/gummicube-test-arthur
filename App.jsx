// App component - represents the whole app
App = React.createClass({

  getInitialState() {
    return {
      count_displayed_results: 10,
      content: '',
      results: [],
      is_loading: false,
      is_error: false,
    }
  },

  handleRequest: function(request) {
    var self = this;
    this.setState({
      is_loading: true,
    });

    if (request.type === 'input') {
      Meteor.call('makeRequest', request.value, function(err, result) {
        if (err || !result || (result.statusCode !== 200)) {
          console.log("Error received: ", err);
          self.setState({is_error: true});
          setTimeout(function() {
            self.setState({
              is_error: false,
              is_loading: false
            });
          }, 3000);
        } else {
          var content = result.content;
          // content = "Apple bacon cherry, apple     cherry, bacon\n cherry. Bacon apple cherry apple bacon cherry bacon.";

          var results = self.getResults(content);
          self.setState({
            is_loading: false,
            results: results
          });
        }
      });
    } else {
      var results = self.getResults(request.value);
      self.setState({
        is_loading: false,
        results: results
      });
    }
  },

  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="row">

            <header className="column">
              <h1>Gummicube challenge</h1>
            </header>

            <div className="column">
              {this.renderSearch()}
            </div>

            <div className="column">
              {this.renderResults()}
            </div>

          </div>
        </div>
      </div>
    );
  },

  renderSearch() {
    return <Search
      handleRequest={this.handleRequest}
      is_loading={this.state.is_loading}
      is_error={this.state.is_error}/>
  },

  renderResults() {
    if (this.state.results.length === 0) {
      return null;
    }
    return <Results results={this.state.results} />
  },

  // Can be moved on external libary
  getResults(content) {
    // Declare count pair object {'pair': count}
    var count_pairs = {};

    // Remove HTML, transform to lower case, replace new line and multiple space par single space. Finally split each words
    var words = content.replace(/<[^>]*>/g, '').toLowerCase().replace( /\n/g, " " ).replace(/ +/g, " ").split(' ');
    // Remove empty words
    words = _.filter(words, function(w) { return !!w; });
    // Calculate length before loop
    var count_word = words.length;

    // Loop on each words to calcule frequency with next one
    _.each(words, function(w, idx) {
      // Last one have no pair `N  N+1`
      if (w && (idx < count_word - 1) && words[idx + 1]) {
        // Get next word. Also, `A C <> A, C` but `A C == A C`, so remove second word punctuation
        var next_word = words[idx + 1].replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        var pair = w + ' ' + next_word;
        count_pairs[pair] = count_pairs[pair] && count_pairs[pair] + 1 || 1;
      }
    });

    var slice_count = this.state.count_displayed_results;

    // Transform {a:1, b:2, ..} to [[a, 1], [b, 2], ..], sort (highter is last), splice last ten and reverse (highter is first)
    return _.chain(count_pairs).pairs().sortBy(function(a){ return a[1] }).value().slice(-10).reverse();
  }
});