// Variables:
let childs = document.getElementById('slots').innerHTML;
let lever = document.getElementById('lever');
let modal = document.getElementById('modal');
let keys = { ESC: 27, L: 76 };
let options = {
  reel1: ['coffee-machine', 'teapot', 'espresso-machine'],
  reel2: ['coffee-filter', 'tea-strainer', 'espresso-tamper'],
  reel3: ['coffee-grounds', 'tea-bag', 'espresso-beans'],
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

//Event Listeners
document.body.addEventListener('keydown', keyNav);
lever.addEventListener('click', pullReel);
modal.addEventListener('click', dismiss);

// Key Board Navigation
function keyNav(e) {
  if (e.which === keys.L) {
    lever.checked = !lever.checked;
    pullReel();
  }
  if (e.which === keys.ESC) {
    dismiss();
  }
}

// Logic
function pullReel() {
  if (!lever.checked) {
    let luck = randomize();
    display(luck);
  } else {
    reset();
  }
}

function randomize() {
  let idx1 = Math.floor(Math.random() * (3 - 1 + 1) + 1) - 1;
  let idx2 = Math.floor(Math.random() * (3 - 1 + 1) + 1) - 1;
  let idx3 = Math.floor(Math.random() * (3 - 1 + 1) + 1) - 1;
  return [{ display: options.reel1[idx1], index: idx1 }, { display: options.reel2[idx2], index: idx2 }, { display: options.reel3[idx3], index: idx3 }];
}

function isWinner(luck) {
  return luck[0].index === luck[1].index && luck[1].index === luck[2].index;
}

// DOM Manipulation
function dismiss(e) {
  modal.classList.remove('bounceIn');
  modal.classList.add('bounceOut');
}

function display(luck) {
  modal.classList.remove('win');
  modal.classList.remove('lose');
  let luckElements = getLuckElements(luck);
  let modalMessage = '<small>You have... ' + luck[0].display + ', ' + luck[1].display + ' and ' + luck[2].display + '... </small>';
  if (isWinner(luck)) {
    modalMessage += 'Awesome! you win a ' + '<b>' + options.prize[luck[0].index].name + '</b> ' + options.prize[luck[0].index].icon + ' mmm... Enjoy!!!';
    modal.classList.add('win')
  } else {
    modalMessage += 'Nothing now, but try agin';
    modal.classList.add('lose')
  }
  paint(modalMessage, luckElements);
  modal.style.display = 'block';
  modal.classList.remove('bounceOut');
  modal.classList.add('bounceIn');
}

function getLuckElements(luck) {
  let html = '';
  luck.forEach(function (item) {
    html += '<div class="board item' + item.index + '"><div class="reel"><span class="thmbtck-cb' + item.display + '"></span></div></div>';
  });
  return html;
}

function paint(modalMessage, luckElements) {
  document.getElementById('message').innerHTML = modalMessage;
  document.getElementById('slots').innerHTML = luckElements;
}

function reset() {
  document.getElementById('slots').innerHTML = childs;
  dismiss();
}