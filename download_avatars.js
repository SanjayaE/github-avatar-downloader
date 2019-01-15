var request = require('request');
var fs = require('fs');
var GITHUBTOKEN = require('./secrets.js').GITHUB_TOKEN; //getting token
var repoOwner = [];
repoOwner =  process.argv.slice(2);  //getting command line args


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(cb) {
  var parseObject = {};
  var options = {
    url: "https://api.github.com/repos/" + repoOwner[0] + "/" + repoOwner[1] + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization' : 'token ' + GITHUBTOKEN
    }
  };

  request(options, function(err, res, body) {

    if (repoOwner[1] === undefined){
      cb("Please  specify both arguments");
      return;

    } else {
      parseObject =  JSON.parse(body);


    parseObject.forEach(function(user) { //forEach looping throgh user objects in parsed JSON

      downloadImageByURL(user.avatar_url, "avatars/" + user.login); // grabbing the url for avatar and passing url and file path to downloadImageByURL function.
    })


    }
  });


}

function downloadImageByURL(url, filePath) {
  request.get(url)               //
  .on('error', function (err) {                                   // Note 2
    throw err;
    })
  .on('response', function (response) {                           // Note 3
    console.log('Response Status Code: ', response.statusCode);
       })
  .pipe(fs.createWriteStream('./'+ filePath));               // downloading the avatar file inside specified file path with specified name (USER)


  }


// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   //console.log("Result:", result);
// });

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg", './future.jpg');

getRepoContributors(function(err, result) {
  console.log("Errors:", err);
  //console.log("Result:", result);
});

//getRepoContributors();