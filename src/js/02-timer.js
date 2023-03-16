import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dataInput = document.querySelector('#datetime-picker');
const textTimer = document.querySelector('.timer');
const buttonStart = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      buttonStart.disabled = true;
    } else {
      buttonStart.disabled = false;
    }
  }
};

flatpickr(dataInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};

buttonStart.addEventListener('click', onTimerStart);
  
function onTimerStart () {
  let currentTimer = setInterval(() => {
    let countdown = new Date(dataInput.value) - new Date();
    buttonStart.disabled = true;
    if (countdown >= 0) {
      let timerArray = convertMs(countdown);
      days.textContent = addLeadingZero(timerArray.days);
      hours.textContent = addLeadingZero(timerArray.hours);
      minutes.textContent = addLeadingZero(timerArray.minutes);
      seconds.textContent = addLeadingZero(timerArray.seconds);      
    } else {
      Notiflix.Notify.success('Countdown finished');
      clearInterval(currentTimer);
    }
  }, 1000);
};