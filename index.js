//Variables of the game
var gamePattern =[];
var buttonColours =["red" , "blue" , "green", "yellow"];
var userClickedPattern =[];
var started = false;
var level = 0;

// To start the Game
$(document).keydown(function()
{
  if(!started)
  {
    $("#level-title").text("level " +level);
    nextSequence();
    started= true;
  }

});

// User Inputs to select the buttons generated
$(".btn").click(function()
{
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function nextSequence()
{
  userClickedPattern = [];
    level+=1;
    $("#level-title").text("level " +level);
  var randomNumber = Math.floor(Math.random() *4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

// Sounds of the Button
function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

//Animation of Buttons
function animatePress(currentColour)
{
  $("#" + currentColour).addClass(".pressed");

  setTimeout(function ()
  {
    $("#" + currentColour).removeClass(".pressed");
  } ,100);
}

// Checking if the user is following the game rules
function checkAnswer(currentlevel)
{
  if(gamePattern [currentlevel] === userClickedPattern [currentlevel])
  {
    if (userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function ()
      {
        nextSequence()
      } , 1000);
    }
  }
  else
  {
    console.log("wrong");
    var audio = new Audio ("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, press any key to restart");
    setTimeout(function ()
    {
      $("body").removeClass("game-over");
    } ,2000);
    startover();

  }
}

// Restarting the game
function startover()
{
  level =0;
  gamePattern= [];
  started = false;
}
