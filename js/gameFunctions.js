let finalLabel = document.getElementById("finalLabel");
let messageInFinal = document.querySelector(".h1Img");
let imgSrc = document.querySelector(".emojiImg");
let nameObject = document.getElementById(".txt");
let birdImage = document.querySelector(".birdImage");
let bomb = document.querySelector(".bombImage");
let time = document.querySelector(".time");
let images = ["imgBirds/bird1.gif", "imgBirds/bird2.gif", "imgBirds/bird3.gif"];
let birdsKilled = 0;
let scores = 0;

//Bird Creation//
function CreateBirds() {
    let birdRandom = Math.floor(Math.random() * images.length + 1);
    let myBird = document.createElement("img");
    myBird.setAttribute("src", `imgBirds/bird${birdRandom}.gif`);
    myBird.classList.add("bird");
    birdImage.append(myBird);
    let top = Math.random() * (innerHeight - myBird.height);
    myBird.style.top = top + "px";
    myBird.style.left = "0px";
    moveRight(myBird, 0);
}
//Bird Movement
const moveRight = function (image, left) {
    let id = setInterval(function () {
        left += 20;
        if (left < window.innerWidth - image.width) {
            image.style.left = left + "px";
        } else {
            clearInterval(id);
            image.remove();
        }
    }, 150);
};
/////  bomb creation   ////
function bombCreate() {
    let imageOfbomb = document.createElement("img");
    imageOfbomb.setAttribute("src", `images/bomb.png`);
    imageOfbomb.classList.add("bomb");
    bomb.append(imageOfbomb);
    let left = Math.random() * (innerWidth - imageOfbomb.width);
    imageOfbomb.style.top = "0px";
    imageOfbomb.style.left = left + "px";
    let startFall = moveDown(imageOfbomb, 0, left);
    imageOfbomb.addEventListener("click", function () {
        let allBirds = document.querySelectorAll(".bird");
        let bombedBirds = [];
        let startScore = document.querySelector(".startScore");
        let KilledBirds = document.querySelector(".KilledBirds");
        clearInterval(startFall);
        let firedBomb = this;
        firedBomb.src = "images/boom.png";
        firedBomb.style.width = "200px";
        firedBomb.style.height = "200px";
        let bombLeft = +firedBomb.style.left.replace("px", "");
        let bombTop = +firedBomb.style.top.replace("px", "");
        let bombWidth = firedBomb.width;
        let bombHeight = firedBomb.height;

        setTimeout(function () {
            firedBomb.remove();
        }, 500);

        allBirds.forEach(function (myImg) {
            let birdLeft = +myImg.style.left.replace("px", "");
            let birdTop = +myImg.style.top.replace("px", "");
            let birdWidth = myImg.width;
            let birdHeight = myImg.height;
            if (
                birdLeft + birdWidth >= bombLeft &&
                birdLeft <= bombLeft + bombWidth &&
                birdTop + birdHeight >= bombTop &&
                birdTop <= bombTop + bombHeight
            ) {
                bombedBirds.push(myImg.src.slice(-9, -4));
                myImg.remove();
            }
        });
        bombedBirds.forEach(function (bombed) {
            if (bombed == "bird1") scores -= 10;
            else if (bombed == "bird2") scores += 10;
            else if (bombed == "bird3") scores += 5;
        });
        birdsKilled += bombedBirds.length;
        startScore.innerText = scores;
        KilledBirds.innerText = birdsKilled;
        setTimeout(() => {
            if (scores > 50) {
                finalLabel.classList.remove("finalWindow");
                messageInFinal.innerText = "You Win";
                imgSrc.src = "images/happybird.png";
            } else {
                finalLabel.classList.remove("finalWindow");
                messageInFinal.innerText = "You Lose";
                imgSrc.src = "images/sadbird.png";
            }
        }, 60000);
    });
}
//Bomb Movemnet
const moveDown = (bomb, top, left) => {
    let id = setInterval(function () {
        if (top + 10 < window.innerHeight - bomb.height) {
            top += 10;
            bomb.style.top = top + "px";
        } else {
            bomb.remove();
        }
        return id;
    }, 100);
}
//game timer
function startTimer() {
    let seconds = 60;
    let timerId = setInterval(() => {
        seconds--;
        if (seconds == 0) {
            clearInterval(timerId);
            localStorage.setItem("yourLastScore", scores);
            localStorage.setItem("yourLastVisit", new Date().toLocaleString());
        }
        time.innerText = "Timer :" + seconds;
    }, 1000);
}