// App component - represents the whole app
App = React.createClass({ 

  getInitialState() {
    return {
      content: '',
      results: []
    }
  },

  handleNewContent: function(content) {
    console.log ("handleNewContent : ", content);
    this.setState({
      content: content,
      results: this.getResults(content)
    })
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
              {this.state.content}
            </div>

          </div>
        </div>
      </div>
    );
  },

  renderSearch() {
    return <Search handleNewContent={this.handleNewContent}/>
  },


  getResults(content) {
    // Declare count pair object {'pair': count}
    var count_pairs = {}; 
    // Split each new line and word
    var words = content.toLowerCase().replace( /\n/g, " " ).split(' '); 
    // Remove empty (between multi space for example)
    words = _.filter(words, function(w) { return !!w; });
    // Calculate length before loop
    var length = words.length;

    // Loop on each words to calcule frequency with next one
    _.each(words, function(w, idx) {
      // Last one have no pair `N  N+1`
      if (w && (idx < length - 1) && words[idx + 1]) {
        // Get next word. Also, `A C <> A, C` but `A C == A C`, so remove second word punctuation
        var next_word = words[idx + 1].replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        var pair = w + ' ' + next_word;
        count_pairs[pair] = count_pairs[pair] && count_pairs[pair] + 1 || 1;
      }
    });

    var slice_count = this.state.count_displayed_results;
    // Transform {a:1, b:2, ..} to [[a, 1], [b, 2], ..], sort, get last elements (higher) and reverse 
    var results = _.chain(count_pairs).pairs().sortBy(function(a){ return a[1] }).value().slice(-slice_count).reverse();
  
    console.log("Results : ", results);
    return results;
  }
});