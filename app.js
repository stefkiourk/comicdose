var express = require('express');
var app = express();
var request = require('request');
var fs = require('fs');
var comicsList = require('./comics.json');
var listenPort = 3001;

app.set('views', './views');
app.set('view engine', 'pug');
app.use("*/views", express.static(__dirname + '/views'));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/randomxkcd', function(req, res){
  var strip = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  var theReq = 'https://xkcd.com/' + strip + '/info.0.json';
  request(theReq, function (error, response, body) {
    debugRequest(theReq, error, response, body);
    //res.send('<img src="' + JSON.parse(body)["img"] + '"/>' + "<br><p>" + theReq + "</p>");
    res.send(JSON.parse(body)["img"]);
  });
});

app.get('/spikedmath', function(req, res){
  var strip = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  if (strip < 100)
    strip = "0" + strip;
  var theReq = 'http://spikedmath.com/'
  theReq = req.query["r"] == 1 ? theReq+= strip + '.html' : theReq;
  if (req.params.r == 1)
    var theReq = 'http://spikedmath.com/' + strip + '.html';
  request(theReq, function (error, response, body) {
    debugRequest(theReq, error, response, body);
    //res.send('<img src="' + JSON.parse(body)["img"] + '"/>' + "<br><p>" + theReq + "</p>");
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
  var strip = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  var theReq = 'http://abstrusegoose.com/' + strip;
  request(theReq, function (error, response, body) {
    debugRequest(theReq, error, response, body);
    if (response.statusCode != 404){
      var goose = body.indexOf("strips");
      var ret =  body.slice(goose - 32, body.length);
      var re = /(["'])(?:(?=(\\?))\2.)*?\1/;
      var match = re.exec(ret);
      //res.send("<img src=" + match[0] + "/>");
      res.send(match[0].slice(1, match[0].length - 1));
  }
  });
});

app.get('/cah', function(req, res){
  var strip = Math.floor(Math.random() * (4000 - 38 + 1)) + 38;
  var theReq = 'http://explosm.net/comics/' + strip;
  request(theReq, function (error, response, body) {
    debugRequest(theReq, error, response, body);
    var ret = body.split('og:image')[1];
    ret = ret.slice(5, ret.length);
    var re = /(["'])(?:(?=(\\?))\2.)*?\1/;
    var match = re.exec(ret);
    //res.send("<img src=" + match[0] + "/>");
    res.send(match[0].slice(1, match[0].length - 1));
  });
});

app.get('/pbf', function(req, res){
  var strip = Math.floor(Math.random() * (277 - 1 + 1)) + 1;
  var theReq = 'http://pbfcomics.com/' + strip;
    request(theReq, function (error, response, body) {
      debugRequest(theReq, error, response, body);
      if (response.statusCode != 404){
        var ret = body.split('og:image')[1];
        ret = ret.slice(5, ret.length);
        var re = /(["'])(?:(?=(\\?))\2.)*?\1/;
        var match = re.exec(ret);
        //res.send("<img src=" + match[0] + "/>");
        res.send(match[0].slice(1, match[0].length - 1));
    }
    });
});

app.get('/smbc', function(req, res){
  var strip = Math.floor(Math.random() * (277 - 1 + 1)) + 1;
  var theReq = 'http://www.smbc-comics.com/';
    request(theReq, function (error, response, body) {
      debugRequest(theReq, error, response, body);
      var goose = body.indexOf("http://www.smbc-comics.com/comics/");
      if (response.statusCode != 404){
        var ret =  body.slice(goose - 3, body.length);
        var re = /(["'])(?:(?=(\\?))\2.)*?\1/;
        var match = re.exec(ret);
        //res.send("<img src=" + match[0] + "/>");
        res.send(match[0].slice(1, match[0].length - 1));
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