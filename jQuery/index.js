$("button").click(function() {
  if($("h1").css("color") == "rgb(0, 0, 0)")
    $("h1").css("color","red");
  else
    $("h1").css("color", "black");
});

$(document).keypress(function(e) {
  $("h1").animate({opacity: 0.5});
});
