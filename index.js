const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses'); // 1.correct the Id valu
const correctMessage = document.getElementById('correct');
const Overmaxnum=document.getElementById('Over-max-num');
const lowerminnum=document.getElementById('lower-min-num');

let targetNumber;
let attempts = 0;


// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  //2.changed the let maxNumberOfAttempts = 6; from global variabl to local variable
  let maxNumberOfAttempts = 6;
  maxNumberOfAttempts --;
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  hideAllMessages();
  if (guess<0){
    lowerminnum.style.display=''; 
    tooLowMessage.style.display = 'none';
    numberOfGuessesMessage.style.display = 'none';
    submitButton.disabled = true;
    guessInput.disabled = true;
    
    
    }
    /*I tried many ways which I thought it would works logically but
     I just could display the message and disable the input and submit button!!!*/
    if (guess> 100){
     Overmaxnum.style.display='';
     submitButton.disabled = true;
     guessInput.disabled = true;
     tooHighMessage.style.display = 'none';
     numberOfGuessesMessage.style.display = 'none';
     }
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
    //3.changed the tooLowMessage to tooHighMessage
      tooHighMessage.style.display = '';
    }
   
      
    const remainingAttempts = maxNumberOfAttempts - attempts;
    
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br/> ${remainingAttempts} guesses remaining`;
    
  
  } 


  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';
  resetButton.style.display = '';
}
//4.changed the elementIndex <= messages.length to elementIndex < messages.length
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  maxNumberOfAttempts = 0;

  //5.misspell correction (disbeld) to (disabled)
  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = '';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
