const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button')
const stopButton = document.getElementById('stop-button');
const textInput = document.getElementById('text');
const speedInput = document.getElementById('speed');
const randomButton = document.getElementById('random-button');




function getApiComment() {
  let number = 500;

const numberRandom = Math.floor(Math.random() * number)

  fetch(`https://jsonplaceholder.typicode.com/comments/${numberRandom}`)
  .then(res => res.json())
  .then(data => {
   console.log(data)
   textInput.value = data.body;
  });
}


let currentCharacter;

pauseButton.addEventListener('click', pauseText);
stopButton.addEventListener('click', stopText);

playButton.addEventListener('click', () => {
  playText(textInput.value);
});

randomButton.addEventListener('click', () => {
  getApiComment();
});

speedInput.addEventListener('input', () => {
  stopText()
  playText(utterance.text.substring(currentCharacter))
})

const utternace = new SpeechSynthesisUtterance(text);


function playText(text) {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume()
  }
  if (speechSynthesis.speaking) return

  utternace.addEventListener('end', () => {
    textInput.disabled = false;
  });
  utternace.addEventListener('boundray', (e) => {
    currentCharacter = e.charIndex
  });
  utternace.text = text;
  utternace.rate = speedInput.value || 1;
  textInput.disabled = true;
  speechSynthesis.speak(utternace)

}

function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause()
}

function stopText() {
  speechSynthesis.resume();
  speechSynthesis.cancel();
}
