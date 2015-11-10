if (Meteor.isServer) {

  Meteor.methods({
    makeRequest: function (url) {
      console.log(" -> Url :  ", url);
      HTTP.call("GET", url, function(err, result) {

        console.log(" -- -> err :  ", err);
        console.log(" -- -> Object.keys(result):  ", Object.keys(result));

      });
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