//window load
window.addEventListener("load", function () {
  //find
  let welcomeScreen = document.querySelector(".welcome");
  let startBtn = document.querySelector(".start");
  let nameValue = document.querySelector(".result");
  let welcomeValue = document.querySelector(".welcomeName");
  let playbtn = document.querySelector(".playBtn");
  let getFinalScore = document.querySelector(".getLastScore");
  let getFinalVisit = document.querySelector(".getLastVisit");
  //fetch user data from local storage
  let getName = localStorage.getItem("name");
  let getScore = localStorage.getItem("yourLastScore");
  let getVisit = localStorage.getItem("yourLastVisit");
  nameValue.innerText = getName;
  welcomeValue.innerText = getName;
  getFinalScore.innerText = "Your Final Score " + getScore;
  getFinalVisit.innerText = "Your Final Visit " + getVisit;
  //start 
  startBtn.onclick = function () {
    welcomeScreen.classList.add("hidden");
    let birdsTimer = setInterval(CreateBirds, 2000);
    let bombTimer = setInterval(bombCreate, 1800);
    startTimer();
    setTimeout(function () {
      clearInterval(birdsTimer);
    }, 49700);
    setTimeout(function () {
      clearInterval(bombTimer);
    }, 60000);
  };
  playbtn.onclick = function () {
    location.reload();
  };
});
