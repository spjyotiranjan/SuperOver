var strikeButton = document.querySelector("#strike")
var resetButton = document.querySelector("#reset")

var run_ind_total = document.querySelector("#run-ind")
var run_pak_total = document.querySelector("#run-pak")

var wick_ind_total = document.querySelector("#wick-ind")
var wick_pak_total = document.querySelector("#wick-pak")

var strikeAudio = new Audio("http://bit.ly/so-ball-hit")
var gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer")

var ind_score = 0
var pak_score = 0
var ind_wick = 0
var pak_wick = 0
var ind_Ballfaced = 0
var pak_Ballfaced = 0
var turn = 1

var possibleOutcomes = [0,1,2,3,4,5,6,"W"]
function strikeButtonCalled() {
    strikeAudio.pause();
    strikeAudio.currentTime = 0;
    strikeAudio.play();

    var randomness = Math.random();
    var randomindex = Math.floor(randomness*possibleOutcomes.length);
    
    random_score = possibleOutcomes[randomindex];
    if(turn==1){
        ind_Ballfaced++;
        var ind_ball = document.querySelector(`#ind div:nth-child(${ind_Ballfaced})`);
        ind_ball.innerHTML = random_score;
        if(random_score == "W"){
            ind_wick++;

        }else{
            ind_score = ind_score + random_score;
        }
        updateScore();
        if(ind_Ballfaced==6||ind_wick==2){
            turn=2;
        }
        
    }
    else if(turn==2){
        pak_Ballfaced++;
        var pak_ball = document.querySelector(`#pak div:nth-child(${pak_Ballfaced})`);
        pak_ball.innerHTML = random_score;
        if(random_score == "W"){
            pak_wick++;

        }else{
            pak_score = pak_score + random_score;
        }
        updateScore();
        if(pak_score>ind_score||pak_Ballfaced==6||pak_wick==2){
            turn=3;
            setTimeout(() => {
                gameOver();
                
            }, 1000);
        }

    }
    function updateScore() {
        run_ind_total.innerHTML = ind_score;
        wick_ind_total.innerHTML = ind_wick;
        run_pak_total.innerHTML = pak_score;
        wick_pak_total.innerHTML = pak_wick;
    }
    function gameOver() {
        gameOverAudio.play();
        if(ind_score>pak_score){
            alert("India Wins")
        }
        else if(pak_score>ind_score){
            alert("Pakistan Won")
        }
        else{
            alert("Game Tied between India and Pakistan")
        }
        document.querySelectorAll(".circle").forEach(e=>{
            if (e.innerHTML=="") {
                e.innerHTML="X"
            }
        })
    }
}
function resetFunction() {
    window.location.reload()
}
strikeButton.addEventListener("click",strikeButtonCalled)
resetButton.addEventListener("click",resetFunction)
    
