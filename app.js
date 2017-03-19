var express = require('express');
var app = express();
var request = require('request');
var fs = require('fs');
var comicsList = require('./comics.json');
var listenPort = 3001;

app.set('views', './views');
app.set('view engine', 'pug');
app.use("*/views", express.static(__dirname + '/views'));
app.use("*/resources", express.static(__dirname + '/resources'));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/xkcd', function(req, res){
  var theReq = "https://xkcd.com/info.0.json";
  request(theReq, function (error, response, body) {
    debugRequest(theReq, error, response, body);
    if (req.query["r"] == 1){
      var strip = Math.floor(Math.random() * (JSON.parse(body)["num"] - 1 + 1)) + 1;
      console.log(JSON.parse(body)["num"]);
      theReq = 'https://xkcd.com/' + strip + '/info.0.json';
      request(theReq, function (error, response, body) {
        res.send(JSON.parse(body)["img"]);
      });
    }else
      res.send(JSON.parse(body)["img"]);
  });
});

app.get('/spikedmath', function(req, res){
  var theReq = 'http://spikedmath.com/';
  request(theReq, function (error, response, body) {
    debugRequest(theReq, error, response, body);
    var ret = body.split('asset-body')[1];
    ret = ret.slice(5, ret.length);
    var match = ret.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
    if (req.query["pretty"] == 1)
      res.send('<img src="' + match + '"/>');
    else
      res.send(match);
  });
});

app.get('/goose', function(req, res){
  var theReq = 'http://abstrusegoose.com/';
  request(theReq, function (error, response, body) {
    debugRequest(theReq, error, response, body);
    if (response.statusCode != 404){
      var goose = body.indexOf("strips");
      var ret =  body.slice(goose - 32, body.length);
      var match = ret.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
      res.send(match);
    }
  });
});

app.get('/cah', function(req, res){
  var theReq = 'http://explosm.net/comics/latest';
  request(theReq, function (error, response, body) {
    debugRequest(theReq, error, response, body);
    var ret = body.split('og:image')[1];
    ret = ret.slice(5, ret.length);
    var match = ret.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
    res.send(match);
  });
});

app.get('/pbf', function(req, res){
  var theReq = 'http://pbfcomics.com';
    request(theReq, function (error, response, body) {
      debugRequest(theReq, error, response, body);
      var ret = body.split('<a name=')[1];
      ret = ret.slice(5, ret.length);
      var re = /(["'])(?:(?=(\\?))\2.)*?\1/;
      var match = ret.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
      request(theReq + match, function (error, response, body) {
        debugRequest(theReq, error, response, body);
        var ret = body.split('og:image')[1];
        ret = ret.slice(5, ret.length);
        var re = /(["'])(?:(?=(\\?))\2.)*?\1/;
        var match = ret.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
        res.send(match);
      });
    });
});

app.get('/smbc', function(req, res){
  var theReq = 'http://www.smbc-comics.com/';
    request(theReq, function (error, response, body) {
      debugRequest(theReq, error, response, body);
      var ret = body.indexOf("http://www.smbc-comics.com/comics/");
      if (response.statusCode != 404){
        ret =  body.slice(ret - 3, body.length);
        var re = /(["'])(?:(?=(\\?))\2.)*?\1/;
        var match = ret.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
        res.send(match);
      }
    });
});

app.get("/comics", function(req, res){
  var html = "";
  theList = comicsList["comics"];
  for (var i = 0; i < theList.length; i++){
    var comic = theList[i];
    html+= comic.name.link(comic.url) + '<br>';
    if (i == theList.length -1)
      res.send(html);
    }
});

function debugRequest(theReq, error, response, body){
  console.log(theReq);
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  //console.log('body:', body);
}

app.listen(listenPort, function(){
  console.log('Listening on port ' + listenPort + '...');
});
