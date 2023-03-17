import Notiflix from 'notiflix';
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const btnCreatePromise = document.querySelector('button[type="submit"]');

btnCreatePromise.addEventListener('click', onCreatePromise);

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
  
function onCreatePromise(e) {

  e.preventDefault();
  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);

  let loopAmount = Number(amount.value);
  document.getElementsByClassName("form")[0].reset();

  for (let i = 0; i < loopAmount; i++)  {
    createPromise(1 + i, firstDelay + i * delayStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }  
};
