// App component - represents the whole app
App = React.createClass({ 

  renderSearch() {
    return <Search />
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

          </div>
        </div>
      </div>
    );
  }
});