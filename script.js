const words = [
  "ability","access","action","activity","advice","amount","animal","answer","area","artist",
  "attack","author","balance","beauty","benefit","career","cause","center","chance","change",
  "choice","client","color","common","company","control","cost","country","course","culture",
  "damage","danger","dealer","debate","decade","decision","degree","design","detail","device",
  "difference","direction","doctor","driver","effect","effort","energy","engine","event","example",
  "family","feature","feeling","field","figure","finance","focus","force","future","growth",
  "health","history","impact","income","industry","interest","issue","job","knowledge","language",
  "school","science","section","service","skill","society","source","space","staff","stage",
  "standard","state","story","strategy","structure","student","success","system","table","task",
  "teacher","team","technology","term","theory","thing","time","trade","training","trend",
  "value","view","vision","voice","volume","weather","window","winner","worker","world",
  "writing","youth","zone",

  "active","actual","amazing","ancient","annual","anxious",
  "basic","beautiful","better","bigger","bright","brilliant",
  "calm","careful","central","certain",
  "clear","clever","close","complete","correct","creative",
  "daily","deep","direct",
  "great","happy","hard","healthy","high",

  "morning","evening","night","daylight","shadow","bridge","building","street","market","people",
  "friends","office","college","university","power","wisdom","courage","strength",
  "dream","reality","present","moment","reaction",
  "failure","result","spirit","heart","soul","mind",
  "body","wealth","peace","joy","love","kindness","respect","trust","honesty",
  "truth","nature","math","logic","art","music","dance","play",
  "game","sport","win","lose","work","study","learn","teach",
  "create","imagine","explore","travel","city","village","home","house",
  "room","chair","book","pen","paper","computer","mobile","internet","signal",
  "data","privacy","security","process","function","style","shape",

  "how","what","who","whom","whose","which","that","this","those","these",
  "some","any","every","all","each","both","either","neither"
];

const textContainer = document.getElementById('text-container');
const timerElement = document.getElementById('timer');
const tryAgainButton = document.getElementById('try-again');
const finalScoreElement = document.getElementById('final-score');


  let totalTyped = '';
  let currentCharIndex = 0;
  let errors = 0;
  let longText = generateLongText();
  let timeLeft = 60;
  let timerInterval;
  let typingStarted = false;

// shuffle the word of array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// console.log(shuffleArray(words));

// combine shuffle words into one long string with spaces
  function generateLongText() {
    const shuffleWords = shuffleArray([...words]);
    return shuffleWords.join(' ');
  }

  // start countdown timer
  function startTimer() {
    if (!typingStarted) {
      typingStarted = true;
      timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          endTest();
        }
      }, 1000);
    }
  }

  // End the test and final display score
  function endTest() {
    timerElement.textContent = `Time's up!`;
    finalScoreElement.textContent = `Final WPM: ${CalculateWPM()}`;
    textContainer.style.display = 'none';
    tryAgainButton.style.display = 'block';
   
  }

// Calculate the words-per-min with error adjustment
function CalculateWPM() {
  const wordsTyped = totalTyped.trim().split(/\s+/).length;
  const baseWPM = Math.round((wordsTyped / 60) * 60);
  const adjustedWPM = Math.max(baseWPM - errors, 0);
  return adjustedWPM;
  
}

// Handle typing over the displayed text and scrolling 
document.addEventListener('keydown', (e) => {
    startTimer();
  if (e.key === 'backspace') {
    if (totalTyped.length > 0){
      currentCharIndex = Math.max(currentCharIndex - 1, 0);
      totalTyped = totalTyped.slice(0, -1);
    }
  } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    totalTyped += e.key;
    currentCharIndex ++;
  }

  // console.log('e.key', e.key, 'totalTyped', totalTyped, 'currentCharIndex', currentCharIndex);

   const textArray = longText.split('');
   console.log(textArray);
   textContainer.innerText = '';

   errors = 0;

   for (let i = 0; i < textArray.length; i++) {
     const span = document.createElement('span');

     if (i < totalTyped.length){
       if (totalTyped[i] === textArray[i]) {
        span.classList.add('correct');
       } else {
        span.classList.add('error');
        errors++;
       }
     }

     span.textContent = textArray[i];
     textContainer.appendChild(span);
   }
  
  // scroll the container only after 20 characters
  if (totalTyped.length >= 20) {
    const scrollAmount = (totalTyped.length - 20) * 14;
    textContainer.scrollLeft = scrollAmount;
  }

});

// Reset the test
function resetTest(){
  clearInterval(timerInterval);
  timeLeft = 60;
  timerElement.textContent = `Time left: ${timeLeft}s`;
  finalScoreElement.textContent = '';
  textContainer.style.display = 'block';
  tryAgainButton.style.display = 'none';
  totalTyped = '';
  typingStarted = false;
  currentCharIndex = 0;
  errors = 0;
  textContainer.scrollLeft = 0;
  longText = generateLongText();
  init();
}

// Initialize the test
function init(){
  if (isMobileDevice()) {
    showMobileMessage();
  } else {
       textContainer.innerText = longText;
       timerElement.textContent = `Time left: ${timeLeft}s`;
  }
}

// try again button lister
tryAgainButton.addEventListener('click', resetTest);

// detect if the device is mobile
function isMobileDevice() {
  return /Mobile|Android/i.test(navigator.userAgent) || window.innerWidth < 800;
}

// show message for mobile user
 function showMobileMessage() {
  textContainer.textContent = 'This typing test is designed for desktop use only';
 }

//startup
init();
  
  
