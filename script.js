//free API that give you a random quote
const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';

//Get access to the elements from index.html
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');

/* The Event Listener waits for the quote from api.quotable.io
then multiple arrays are created (lines 12, 13) */
quoteInputElement.addEventListener('input', () => {

  // separates each character into its own array
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  /* Checks whether or not the input from the user is correct or incorrect, 
   this algorythm will check each character one by one */
  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false;
    }

    /* If the input for a character is true then the class defined as 
      correct will be applied. (items affected by correct will turn green) */
    else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {

      /* If the input for a character is false then the class defined as 
        incorrrect will be applied. (items affected by incorrect will turn 
        red)*/
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false;
    }
  })

  /* If the previous quote was completed wihtout any mistakes then a new
    quote will be rendered in the last ones place. */
  if (correct) renderNewQuote()
})

/*This function generates a random quote from 
'https://api.quotable.io/random' */
function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

/* This async function takes the generated quote and inserts the message
  into html. */
async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplayElement.innerText = '';
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  startTimer();
}

/* Creates a timer starting at 0. The timer runs until the quote is 
complete which will result in the expiration of the timer and a new timer
and quote will be rendered. */
let startTime;
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timerElement.innerText = getTimerTime();
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}
renderNewQuote();

/*This Typing game was a tutorial I have used to learn how 
manipulate user intput to turn it into something. Whether that be a typing 
game or a blogging site. */