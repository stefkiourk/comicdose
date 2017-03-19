$(document).ready(function(){
  $.ajax({url: "cah", success: function(result){
          postImageLoad(cah, result);
      }});

  $.ajax({url: "xkcd", success: function(result){
          postImageLoad(xkcd, result);
      }});

  $.ajax({url: "goose", success: function(result){
          postImageLoad(goose, result);
      }});

  $.ajax({url: "spikedmath", success: function(result){
          postImageLoad(spikedmath, result);
      }});

  $.ajax({url: "pbf", success: function(result){
          postImageLoad(pbf, result);
      }});

  $.ajax({url: "smbc", success: function(result){
          postImageLoad(smbc, result);
      }});

  function postImageLoad(comicDOM, result){
    $(comicDOM).attr("src", result);
    $(comicDOM).addClass("img-loaded");
  }
});
