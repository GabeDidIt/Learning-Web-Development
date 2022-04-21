
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var guessing = false;

//add new random color to the sequence and animate
function nextSequence() {

  level++;

  userClickedPattern = [];

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  for(var i = 0; i < gamePattern.length; i++) {

    delayButtonAnimation(i);

  }

  guessing = true;

}

//adds delay to button animation
function delayButtonAnimation(i) {

  setTimeout(function() {

    animatePressPlaySound(gamePattern[i]);

  }, 500 *i);

}

//checks user input against known game sequence
$(".btn").click(function(event) {

  var userChosenColor = event.target.id;

  if(guessing) {

    userClickedPattern.push(userChosenColor);

    animatePressPlaySound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

  }

});

//animates the button and plays corresponding sound
function animatePressPlaySound(color) {

  playSound(color);

  $("."+color).addClass("pressed");
  setTimeout(function() {

    $("."+color).removeClass("pressed");

  }, 100);

}

//plays {name}.mp3 from the sounds/ folder
function playSound(name) {

  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();

}

//listens for keypress to start game
$(document).keypress(function() {

  if(started == false) {

    started = true;
    nextSequence();

  }

});

//checks current answer against the corresponding sequence answer
function checkAnswer(index) {

  if(gamePattern[index] != userClickedPattern[index]) {

    gameOver();

  } else if(userClickedPattern.length == gamePattern.length) {

    guessing = false;

    setTimeout(function() {
      nextSequence();
    }, 1000 );

  }

}

//resets variables and plays animation and sound indicating game over
function gameOver() {

  gamePattern = [];
  level = 0;
  started = false;
  guessing = false;

  $("#level-title").text("Game Over, Press Any Key to Restart");

  playSound("wrong");

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

}
