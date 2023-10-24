
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var level=0;
var flag=0;





$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
    if(!flag)
    {
        $("h1").text("Level "+level);
        nextSequence();
        flag=1;
    }
});

function checkAnswer(currentLevel) {

    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },250);
      $("h1").text("Game Over!");
    startOver();
    }
}

function nextSequence(){
    userClickedPattern=[]
    level+=1
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * (4 - 0) + 0);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    
    playSound(randomChosenColour);
    
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function startOver(){
    level=0;
    gamePattern=[];
    flag=0;
}