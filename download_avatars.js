var request = require('request');
var GITHUBTOKEN = require('./secrets.js').GITHUB_TOKEN;

//console.log(GITHUBTOKEN);

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var parseObject = {};
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization' : 'token ' + GITHUBTOKEN
    }


  };

  request(options, function(err, res, body) {
    cb(err);
    parseObject =  JSON.parse(body);

    parseObject.forEach(function(user) {
      console.log(user.avatar_url)
    })

    //cb(parseObject[0].avatar_url);


  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
});