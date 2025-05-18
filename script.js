let count = 0;
let clickPower = 1;
let autoclickPower = 0;
let clickPowerCost = 100;
let autoclickCost = 150;
let lastClickTime = Date.now();
let clicksPerSecond = 0;

const countElem = document.getElementById('count');
const button = document.getElementById('clicker-button');
const cpsElem = document.getElementById('cps');
const animElem = document.getElementById('click-animation');

const clickPowerCostElem = document.getElementById('clickPower-cost');
const autoclickCostElem = document.getElementById('autoclick-cost');

button.addEventListener('click', () => {
  count += clickPower;
  updateCount();
  animateClick();
  updateCPS();
});

function animateClick() {
  const anim = document.createElement("div");
  anim.textContent = "+" + clickPower;
  anim.style.position = "absolute";
  anim.style.left = Math.random() * 80 + 10 + "%";
  anim.style.top = "50%";
  anim.style.fontSize = "20px";
  anim.style.opacity = 1;
  anim.style.transition = "all 0.7s ease-out";
  document.body.appendChild(anim);

  setTimeout(() => {
    anim.style.transform = "translateY(-50px)";
    anim.style.opacity = 0;
  }, 10);

  setTimeout(() => {
    document.body.removeChild(anim);
  }, 700);
}

function updateCount() {
  countElem.textContent = count + " рублей";
  checkBackground();
}

function updateCPS() {
  const now = Date.now();
  clicksPerSecond = (1000 / (now - lastClickTime)).toFixed(1);
  lastClickTime = now;
  cpsElem.textContent = "Скорость: " + clicksPerSecond + " к/с";
}

function buyUpgrade(type) {
  if (type === 'clickPower' && count >= clickPowerCost) {
    count -= clickPowerCost;
    clickPower *= 2;
    clickPowerCost = Math.ceil(clickPowerCost * 2.3);
    clickPowerCostElem.textContent = clickPowerCost;
  }
  if (type === 'autoclick' && count >= autoclickCost) {
    count -= autoclickCost;
    autoclickPower += 1;
    autoclickCost = Math.ceil(autoclickCost * 2.3);
    autoclickCostElem.textContent = autoclickCost;
  }
  updateCount();
}

setInterval(() => {
  count += autoclickPower;
  updateCount();
}, 1000);

// Меню
document.getElementById('menu-button').onclick = () => {
  const menu = document.getElementById('side-menu');
  menu.classList.toggle('hidden');
};

document.getElementById('clicker-button').addEventListener('contextmenu', (e) => {
  e.preventDefault();
  document.getElementById('upgrade-menu').classList.toggle('hidden');
});

// Смена фона по кликам
function checkBackground() {
  let bg = "";
  if (count >= 1000) bg = "bg5.jpg";
  else if (count >= 500) bg = "bg4.jpg";
  else if (count >= 200) bg = "bg3.jpg";
  else if (count >= 100) bg = "bg2.jpg";
  else bg = "bg1.jpg";

  document.body.style.backgroundImage = `url(${bg})`;
}
