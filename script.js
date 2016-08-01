let childs = document.getElementById("slots").innerHTML;
let lever = document.getElementById('lever');
lever.addEventListener('click', pullReel);

let options = {
  reel1:['coffee-machine', 'teapot', 'espresso-machine'],
  reel2:['coffee-filter', 'tea-strainer', 'espresso-tamper'],
  reel3:['coffee-grounds', 'tea-bag', 'espresso-beans'],
  prize: ['coffee-cup', 'tea-cup', 'espresso-cup']
};

function pullReel(e) {
    if(!e.currentTarget.checked){
      let luck = randomize();
      renderLuck(luck);
      var winner = isWinner(luck);
      console.log(winner);
      if (winner) {
        alert('Cool! you win a ' + options.prize[luck.reel1.index]);
      } else {
        alert('Sorry, Try again!');
      }
    }else{
      reset();
    }
}

function reset(){
  document.getElementById("slots").innerHTML = childs;
}

function renderLuck(luck){
  let html = '';
  html+='<div class="board item'+ luck.reel1.index +'"><div class="reel"><span class="thmbtck-cb'+luck.reel1.display+'"></span></div></div>';
  html+='<div class="board item'+ luck.reel2.index +'"><div class="reel"><span class="thmbtck-cb'+luck.reel2.display+'"></span></div></div>';
  html+='<div class="board item'+ luck.reel3.index +'"><div class="reel"><span class="thmbtck-cb'+luck.reel3.display+'"></span></div></div>';
  document.getElementById("slots").innerHTML = html;
}

function randomize() {
  let idx1 = Math.floor(Math.random() * (3 - 1 + 1) + 1) - 1;
  let idx2 = Math.floor(Math.random() * (3 - 1 + 1) + 1) - 1;
  let idx3 = Math.floor(Math.random() * (3 - 1 + 1) + 1) - 1;
  console.log(options.reel1[idx1], options.reel2[idx2], options.reel3[idx3]);
  return {
    reel1: { display: options.reel1[idx1], index: idx1 },
    reel2: { display: options.reel2[idx2], index: idx2 },
    reel3: { display: options.reel3[idx3], index: idx3 }
  };
}

function isWinner(luck){  
 return (luck.reel1.index === luck.reel2.index && luck.reel1.index === luck.reel3.index);
}
