if (Meteor.isServer) {

  Meteor.methods({
    makeRequest: function (url) {
      return HTTP.call("GET", url, {timeout: 5000}); // max 5sec
    }
  });
}

if (Meteor.isClient) {
  // This code is executed on the client only

  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}