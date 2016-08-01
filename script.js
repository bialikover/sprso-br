var lever = document.getElementById('lever');
lever.addEventListener('click', pullReel);

let options = {
  reel1:['coffe-machine', 'teapot', 'espresso-machine'],
  reel2:['coffe-filter', 'tea-strainer', 'espresso-tamper'],
  reel3:['coffe-grounds', 'tea-bag', 'espresso-beans'],
  prize: ['coffee-cup', 'tea-cup', 'espresso-cup']
};

function pullReel(e) {
    if(!e.currentTarget.checked){
      let luck = randomize();
      var winner = isWinner(luck);
      console.log(winner);
      //stopAnimation();
      //renderLuck();
      if (winner) {
        alert('Cool! you win a ' + options.prize[luck.reel1.index]);
      } else {
        alert('Sorry, Try again!');
      }
    }else{
     // reset();
      //startAnimation();
    }
}

function randomize() {
  let idx1 = Math.floor(Math.random() * (2));
  let idx2 = Math.floor(Math.random() * (2));
  let idx3 = Math.floor(Math.random() * (2));
  console.log(options.reel1[idx1]);
  console.log(options.reel2[idx2]);
  console.log(options.reel3[idx3]);
  return {
    reel1: { display: options.reel1[idx1], index: idx1 },
    reel2: { display: options.reel2[idx2], index: idx2 },
    reel3: { display: options.reel3[idx3], index: idx3 }
  };
}

function isWinner(luck){  
 return (luck.reel1.index === luck.reel2.index && luck.reel1.index === luck.reel3.index);
}