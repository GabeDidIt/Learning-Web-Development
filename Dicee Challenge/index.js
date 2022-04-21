//random number gen 1-6 on load
var randomNumber1 = Math.floor(Math.random()*6)+1;
var randomNumber2 = Math.floor(Math.random()*6)+1;

//set dice to random number
document.querySelector(".img1").src = "images/dice"+randomNumber1+".png";
document.querySelector(".img2").src = "images/dice"+randomNumber2+".png";

//conditional to set title to result
if(randomNumber1 > randomNumber2)
  document.querySelector("h1").innerHTML = "Player 1 Wins!";
else if(randomNumber1 < randomNumber2)
  document.querySelector("h1").innerHTML = "Player 2 Wins!";
else
  document.querySelector("h1").innerHTML = "Draw!";
