var request = require('request');
var fs = require('fs');
var GITHUBTOKEN = require('./secrets.js').GITHUB_TOKEN;
var repoOwner = [];
repoOwner =  process.argv.slice(2);
//var repoName =  process.argv.slice(3);
//console.log(repoOwner);
//console.log(GITHUBTOKEN);

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors( cb) {
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


    parseObject.forEach(function(user) {
      //console.log(user.avatar_url);
      downloadImageByURL(user.avatar_url, "avatars/" + user.login);
    })

    //cb(parseObject[0].avatar_url);


    }
  });


}

function downloadImageByURL(url, filePath) {
    request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream('./'+ filePath));               // Note 4

  // ...


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