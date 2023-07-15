const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  const button = document.querySelector('.btn');
  const timer = document.querySelector('.timer');
  let lastHole;
  let timeUp = false;
  let score = 0;
  let time;
  
  function randomTime(min, max) {
    return Math.round(Math.random() * (max-min) + min); 
  }

  function randomHole(holes){
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];

    if(hole === lastHole){
      return randomHole(holes);
    }

    lastHole = hole;
    return hole;
  }


  function peep() {
    const time = randomTime(300, 800);
    const hole = randomHole(holes);
    hole.classList.add('up');

    setTimeout( () => {
      hole.classList.remove('up');
      if(!timeUp) peep();
    }, time); 
  }

  function startGame() {
    countDown();
    scoreBoard.textContent = 0;
    button.classList.add('stop');
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => {
      timeUp = true;
      button.classList.remove('stop');
      clearInterval(time);
    }, 10000);
  }

  function countDown() {
    timer.textContent = 10;
    time = setInterval( () => {
      timer.textContent--;
    },1000);
  }


  function bonk(e) {
    if(!e.isTrusted) return;
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
  }

  moles.forEach(mole => mole.addEventListener('click', bonk));