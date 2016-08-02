let childs = document.getElementById("slots").innerHTML;
let lever = document.getElementById('lever');
lever.addEventListener('click', pullReel);
document.body.addEventListener('keydown', checkKey);

let modal = document.getElementById('modal');
modal.addEventListener('click', dismiss);

let options = {
  reel1:['coffee-machine', 'teapot', 'espresso-machine'],
  reel2:['coffee-filter', 'tea-strainer', 'espresso-tamper'],
  reel3:['coffee-grounds', 'tea-bag', 'espresso-beans'],
  prize: [{
    name: 'cup of coffee',
    icon: '<span class="thmbtck-cbcoffee-cup"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span></span>'
  }, {
    name: 'cup of tea',
    icon: '<span class="thmbtck-cbtea-cup"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span></span>'
  }, {
    name: 'cup of espresso',
    icon: '<span class="thmbtck-cbespresso-cup"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span></span>'
  }]
};

function checkKey(e){
    if(e.which === 76){
      console.log("triggered L key");
      lever.checked = !lever.checked;
      pullReel();
    }
    if(e.which == 27){
      dismiss();
    }
}

function pullReel() {
    if(!lever.checked ){
      let luck = randomize();
      renderLuck(luck);
      var winner = isWinner(luck);
      var message = '<small>'+luck.reel1.display+', '+luck.reel2.display+' and ' +luck.reel3.display+'... </small>';
      if (winner) {
          message += buildPrize(options.prize[luck.reel1.index]);
      } else {
          message += buildLose();
      }
      document.getElementById('message').innerHTML = message;
      display(winner);
    }else{
      reset();
      dismiss();
    }
}

function display(win){
  modal.classList.remove('win');
  modal.classList.remove('lose');
  win ? modal.classList.add('win'): modal.classList.add('lose');
  modal.style.display = 'block';
  modal.classList.remove('bounceOut');
  modal.classList.add('bounceIn');
}

function dismiss(e){
  modal.classList.remove('bounceIn');
  modal.classList.add('bounceOut');
}

function reset(){
  document.getElementById("slots").innerHTML = childs;
}

function buildPrize(prize){
  return  'Awesome! you win a '+'<b>'+ prize.name + '</b> '+prize.icon + ' mmm... Enjoy!!!';
}

function buildLose(){
  return 'Nothing now, but try agin'; 
  
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
