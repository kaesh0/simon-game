function playSound(name){
    var ad=new Audio("./sounds/"+name+".mp3")
    ad.play()
}
function startGame(){
    $("h1").text("LEVEL "+clevel)
    choosingBlock();
}
function choosingBlock(){
    var colors=["red","green","yellow","blue"];
    var genRand=Math.floor(Math.random()*4);
    compPt.push(colors[genRand])
    for(let i=0;i<compPt.length;i++){
       setTimeout(function(){
        playSound(compPt[i])
        $("#"+compPt[i]).addClass("pressed")
        setTimeout(function(){
            $("#"+compPt[i]).removeClass("pressed")
        },100)
       },i*500)
    }
    setTimeout(function(){
        userTurn=true;
    },compPt.length * 500);
}
function userChoice(){
    if(gameOver){
        var b=$(this)
        b.addClass("pressed")
        $("body").css("background-color","red")
        playSound("wrong")
        setTimeout(function(){
            $("body").css("background-color","#01203F")
            b.removeClass("pressed")
        },200)
        return
    }
    if(!started) return
    if(!userTurn) return
    var button=$(this)
    userPt.push(button.attr("id"));
    var cindex=userPt.length-1;
    if(compPt[cindex]===userPt[cindex]){
        button.addClass("pressed");
        setTimeout(function(){
            button.removeClass("pressed");
        },100)
        playSound(button.attr("id"))
    }
    else{
        playSound("wrong")
        gameOver=true
        userTurn=false;
        started=false;
        userPt=[]
        compPt=[]
        clevel=1;
        $(".headline").text("Game Over, Press Any Key or Tap to Restart");
        button.addClass("pressed");
        setTimeout(function(){
            button.removeClass("pressed")
        },100)
        $("body").css("background-color","red")
        setTimeout(function(){
            $("body").css("background-color","#01203F")
        },200)
        return
    }
    if(userPt.length===compPt.length){
        userTurn=false;
        userPt=[];
        clevel++;
        $("h1").text("LEVEL "+clevel)
        setTimeout(choosingBlock,1000)
    }
}
function handleStart(){
    if(!started){
        started=true;
        gameOver=false;
        setTimeout(startGame,1000);
    }
}
var started=false;
var compPt=[]
var userPt=[];
var clevel=1;
var gameOver=false;
var userTurn=false;
$(document).keydown(handleStart);
$(".headline").click(handleStart);
$(".block").click(userChoice);
