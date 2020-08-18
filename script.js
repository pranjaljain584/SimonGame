var heading = $("#level-title");
var buttons = document.querySelectorAll('.btn') ;
var colors = ['green' , 'red' , 'yellow' , 'blue'] ;
var sequence = [] ;
var userPattern = [] ;
var level=-1;
var started= false ;

document.addEventListener('keypress', function(){

    if(!started){
        started= true ;
        $("#demo").text("") ;
        heading.text("Level " + level) ;
        gamePatternNext() ;
    }

}) ;

function gamePatternNext(){
    userPattern=[] ;
    level++ ;
    heading.text("Level " + level) ;
    var divNum = getRandomNum() ;
    highlight(colors[divNum]) ;
    sequence.push(colors[divNum]) ;
}

$(".btn").click(function(){
    var btnId = $(this).attr("id") ;
    userPattern.push(btnId) ;
    highlight(btnId) ;

    checkUser(userPattern.length -1) ;

}) ;

function checkUser(index){

    if(userPattern[index] === sequence[index]){
        if(userPattern.length === sequence.length){
            setTimeout(function(){
                gamePatternNext() ;
            },1000) ;
        }

    }else{
        makeSound("wrong") ;
        gameOver() ;
    }
};

function gameOver(){
    started=false;
    $('body').addClass('game-over') ;

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    heading.text("Game Over , Press Any Key To Play Again !" );
    $("#demo").text("your score was : " + level) ;
    startOver() ;

}

function startOver() {
    userPattern = [] ;
    sequence = [] ;
    level = -1 ;
}

function getRandomNum(){
    var random = Math.random() ;
    var num = Math.floor(random*4) ;
    return num ;
}

function highlight(input){

    document.getElementsByClassName(input)[0].classList.add('pressed') ;

    makeSound(input) ;

    setTimeout(function(){
        document.getElementsByClassName(input)[0].classList.remove('pressed') ;
    },200) ;

}

function makeSound (key){

    switch(key){
        case "green" :
            var green = new Audio("sounds/green.mp3");
            green.play() ;
            break ;

        case "red" :
            var red = new Audio("sounds/red.mp3");
            red.play() ;
            break ;

        case "yellow" :
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play() ;
            break ;

        case "blue" :
            var blue = new Audio("sounds/blue.mp3");
            blue.play() ;
            break ;

        case "wrong" :
            var over = new Audio("sounds/wrong.mp3") ;
            over.play() ;
            break ;
    }

} ;
