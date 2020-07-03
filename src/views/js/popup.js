const startstop = document.getElementById('startstop');
const reset = document.getElementById('reset');
const timer = document.getElementById('timer');

let timeDiff;
let timeStart;
let timeState;
let interval;

const timerUpdate = () => {
  let timeTick = new Date().getTime();
  timeDiff = timeState ? (timeTick - timeStart) + timeState : timeTick - timeStart;

  let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((timeDiff % (1000 * 60)) / 1 % 1000);
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  milliseconds = milliseconds < 100
    ? milliseconds < 10
      ? `00${milliseconds}`
      : `0${milliseconds}`
    : milliseconds;
  timer.innerHTML = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

startstop.onclick = (element) => {
  // 0 paused, 1 running
  const running = element.target.value;

  // If running
  if (running) {
    timeState = timeDiff;
    if (interval) {
      clearInterval(interval);
    }

  // If paused
  } else {
    timeStart = new Date().getTime();
    interval = setInterval(timerUpdate, 1);
  }

  element.target.value = !element.target.value;
}

reset.onclick = () => {
  timeStart = new Date().getTime();
  timeState = undefined;
  startstop.value = 0;
  timer.innerHTML = '00:00:00.000'
  if (interval) {
    clearInterval(interval);
  }
}