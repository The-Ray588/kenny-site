(function() {
  const loader = document.getElementById("loader");
  const fill = document.getElementById("loaderFill");
  const percent = document.getElementById("loaderPercent");
  const text = document.getElementById("loaderText");
  const particlesBox = document.getElementById("loaderParticles");

  if (!loader) return;

  if (particlesBox) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement("span");
      p.className = "loader-particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDelay = Math.random() * 3 + "s";
      p.style.animationDuration = (2 + Math.random() * 3) + "s";
      if (Math.random() < 0.5) {
        p.style.background = "var(--purple)";
        p.style.boxShadow = "0 0 12px var(--purple), 0 0 24px rgba(168,85,247,0.6)";
      }
      particlesBox.appendChild(p);
    }
  }

  const phrases = ["Загрузка", "Созвездие", "Команда", "Готово"];
  let progress = 0;
  let phraseIdx = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress > 100) progress = 100;

    fill.style.width = progress + "%";
    percent.textContent = Math.round(progress) + "%";

    const newIdx = Math.min(Math.floor(progress / 33), phrases.length - 1);
    if (newIdx !== phraseIdx) {
      phraseIdx = newIdx;
      text.textContent = phrases[phraseIdx];
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add("hidden");
        setTimeout(() => loader.remove(), 1000);
      }, 400);
    }
  }, 180);
})();

const TEAM = [
  { name: "TheRay", role: "Программист · Художник · 3D-модельер", desc: "Очень дружелюбный и добрый. Помогает разрабатывать сайты, рисовать арты и создавать 3D-модели моего Minecraft-персонажа." },
  { name: "Csinffy", role: "Монтажёр", desc: "Помогает находить и исправлять ошибки в монтаже, а также сам монтирует видео в своей программе." },
  { name: "Timerik / Preniks", role: "Продюсер", desc: "Создаёт биты для моего музыкального творчества. Также отлично разбирается в монтаже и иногда помогает делать видео под треки с субтитрами." },
  { name: "Layz", role: "Интромэйкер", desc: "Делает стильные интро для моих видеороликов." },
  { name: "Liga", role: "Дизайнер", desc: "Создаёт превью, скины и оформления для контента." },
  { name: "Miray", role: "Главный менеджер · Дизайнер · Интромэйкер", desc: "Создаёт превью, скины, оформления и интро. Передаёт мне информацию, которую люди хотят уточнить." },
  { name: "Flady", role: "Актриса", desc: "Родная актриса, с которой мы снимаем различные коллаборации." },
  { name: "Apathyfamee", role: "Защитник профиля и YouTube-канала", desc: "Отвечает за безопасность и защиту от незаконных действий злоумышленников. Всегда готов дать отпор." },
];

const SOCIALS = [
  { name: "Telegram", url: "https://t.me/MsKennya", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>' },
  { name: "YouTube", url: "https://www.youtube.com/@MsKennya_MCPE", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>' },
  { name: "ВКонтакте", url: "https://vk.ru/mayni_mcpe", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.744-.576.744z"/></svg>' },
];

const BIO_FULL = "Здравствуйте! Меня зовут Екатерина, и мне 14–15 лет. Я увлекаюсь актёрским мастерством, ведением блога, музыкой и психологией.";

const teamGrid = document.getElementById("teamGrid");
if (teamGrid) {
  TEAM.forEach(m => {
    teamGrid.innerHTML += `
      <div class="card">
        <div class="name">${m.name}</div>
        <div class="role">${m.role}</div>
        <div class="desc">${m.desc}</div>
      </div>`;
  });
}

const socialsEl = document.getElementById("socials");
if (socialsEl) {
  SOCIALS.forEach(s => {
    socialsEl.innerHTML += `<a href="${s.url}" target="_blank" rel="noreferrer">${s.icon}<span>${s.name}</span></a>`;
  });
}

const clockEl = document.getElementById("clock");
function updateClock() {
  if (!clockEl) return;
  const now = new Date();
  const msk = new Date(now.getTime() + (3 * 60 + now.getTimezoneOffset()) * 60000);
  const hh = String(msk.getHours()).padStart(2, "0");
  const mm = String(msk.getMinutes()).padStart(2, "0");
  clockEl.textContent = `🕐 ${hh}:${mm} МСК`;
}
updateClock();
setInterval(updateClock, 1000);

const toastEl = document.getElementById("toast");
let toastTimer;
function toast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
}
window.toast = toast;

let audioCtx;
function popSound() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(600, audioCtx.currentTime);
    o.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.15);
    g.gain.setValueAtTime(0.25, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + 0.2);
  } catch (e) {}
}
window.popSound = popSound;
