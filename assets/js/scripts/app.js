// Accessing the Quotes - How to work with APIs based on this tutorial https://www.taniarascia.com/how-to-use-the-javascript-fetch-api-to-get-json-data
let quote;
let quoteTextElem = document.querySelector(".quotetext");
let quoteAuthorElem = document.querySelector(".author");

// Fetch JSON feed from type.fit
fetch("https://type.fit/api/quotes")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    quote = data[Math.floor(Math.random() * 100) + 1];
    quoteTextElem.innerHTML = `"${quote.text}"`;
    quoteAuthorElem.innerHTML = quote.author;
  });

// Building a Timer
/**
 * Define the meditation Time
 * Define the warmup time
 * define the cool down time
 * calculate total length
 * press play -> switch icon to pause & show reset button
 * count down 3 seconds
 * play start sound
 * run through first timer
 * play start sound
 * start main timer
 * play start sound
 * after main timer ends start cool down timer
 * play end bell
 * display text "seize the day"
 * store successfully finished session to local storage
 */

const outline = document.querySelector(".moving-outline circle");
const outlineLength = outline.getTotalLength();

let meditationTimeElem = document.querySelector(".meditationtime");
let meditationDuration = 10;
let meditationProgress = meditationDuration;
let meditationTimer;
let medTimeSetBtn = document.querySelectorAll(".meditationduration button");
let startStopButton = document.querySelector(".starttimer");
let startStopBtnIcon = startStopButton.querySelector("i");
let timeLeft;
let currentTime = 0;
let progress;
let status = startStopButton.getAttribute("data-status");

init();

// Circle

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

function animateCircle() {}

// Updating the Meditation Duration based on settings‚

function init() {
  timerSettings();
  controlTimer();
}

// Timer Settings

function timerSettings() {
  meditationTimeElem.textContent = `${Math.floor(
    meditationDuration / 60
  )}:${Math.floor(meditationDuration % 60)}`;
  medTimeSetBtn.forEach((option) => {
    option.addEventListener("click", function () {
      stopTimer();
      removeActive(medTimeSetBtn);
      outline.style.strokeDashoffset = outlineLength;
      meditationDuration = this.getAttribute("data-time");
      meditationProgress = meditationDuration;
      meditationTimeElem.innerHTML = `${Math.floor(
        meditationDuration / 60
      )}:${Math.floor(meditationDuration % 60)}`;
      option.classList.add("active");
    });
  });
}

// Control Start Stop Button

function controlTimer() {
  startStopButton.addEventListener("click", function () {
    if (status === "playing") {
      pauseTimer();
      startStopButton.dataset.status = "stopped";
      status = startStopButton.getAttribute("data-status");
      startStopBtnIcon.classList.remove("fa-pause");
      startStopBtnIcon.classList.add("fa-play");
    } else {
      startStopButton.dataset.status = "playing";
      status = startStopButton.getAttribute("data-status");
      startTimer();
      startStopBtnIcon.classList.remove("fa-play");
      startStopBtnIcon.classList.add("fa-pause");
    }
  });
}

// Reset Active State on none chosen Settings

function removeActive(settingsTimer) {
  settingsTimer.forEach((setting) => {
    setting.classList.remove("active");
  });
}

// Counting down the meditationduration (Solution based on https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown)

function startTimer() {
  meditationTimer = setInterval(function () {
    if (meditationProgress <= 0) {
      progress =
        outlineLength - (currentTime / meditationDuration) * outlineLength;
      outline.style.strokeDashoffset = progress;
      clearInterval(meditationTimer);
      meditationTimeElem.innerHTML = `Seize the day!`;
    } else {
      progress =
        outlineLength - (currentTime / meditationDuration) * outlineLength;
      outline.style.strokeDashoffset = progress;
      console.log(progress);
      console.log(currentTime);
      console.log(meditationProgress);
      console.log(meditationTimer);
      meditationTimeElem.innerHTML = `${Math.floor(
        meditationProgress / 60
      )}:${Math.floor(meditationProgress % 60)}`;
    }
    meditationProgress -= 1;
    currentTime += 1;
  }, 1000);
}

function stopTimer() {
  clearInterval(meditationTimer);
  currentTime = 0;
  meditationProgress = 0;
  progress = 0;
  status = startStopButton.dataset.status = "stopped";
  startStopButton.getAttribute("data-status");
  startStopBtnIcon.classList.remove("fa-pause");
  startStopBtnIcon.classList.add("fa-play");
}
function pauseTimer() {
  clearInterval(meditationTimer);
  timeLeft = meditationProgress;
  progressStatus = progress;
  meditationTimeElem.innerHTML = `${Math.floor(timeLeft / 60)}:${Math.floor(
    timeLeft % 60
  )}`;
}

/** Build a Streak Recording for past 7 days
 * Look if meditation was done yesterday
 * if yes
 * check date before yesterday
 * if yes check the day before yesterday
 * if no clear local storage
 * mark square with an "x"
 * if 7 days in a row State "You are on a roll" & clear for the next week
 */
