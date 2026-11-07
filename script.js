const TEAM = [
  { name: "TheRay", role: "Программист · Художник · 3D-модельер", desc: "Очень дружелюбный, добрый. Помогает мне разрабатывать сайты, рисовать арты, делать модель моего Minecraft-персонажа." },
  { name: "Csinffy", role: "Монтажёр", desc: "Помогает мне осознать ошибки в монтаже, и сам монтирует в своей программе для монтажа." },
  { name: "Timerik / Preniks", role: "Продюсер", desc: "Создаёт биты для моего музыкального творчества. Также хорош в монтаже, иногда помогает делать видео под треки с субтитрами." },
  { name: "Layz", role: "Интромэйкер", desc: "Делает интро для процесса моих видеороликов." },
  { name: "Liga", role: "Дизайнер", desc: "Создаёт превью, скины, оформления." },
  { name: "Miray", role: "Главный менеджер · Дизайнер · Интромэйкер", desc: "Создаёт превью, скины, оформления, интро. Передаёт мне информацию, которую люди желают уточнить у меня." },
  { name: "Flady", role: "Актриса", desc: "Родная актриса, с которой снимаем различные коллаборации." },
  { name: "Apathyfamee", role: "Защитник профиля и YouTube-канала", desc: "Отвечает за незаконные дела злоумышленников и всегда готов дать им отпор." },
];

const SOCIALS = [
  { name: "Telegram-канал", url: "https://t.me/MsKennya" },
  { name: "YouTube",        url: "https://www.youtube.com/@MsKennya_MCPE" },
  { name: "ВКонтакте",      url: "https://vk.ru/mayni_mcpe" },
];

const BIO_FIRST = "Здравствуйте! Меня зовут Екатерина, и мне 14–15 лет.";

const teamGrid = document.getElementById("teamGrid");
TEAM.forEach(m => {
  teamGrid.innerHTML += `
    <div class="card">
      <div class="name">${m.name}</div>
      <div class="role">${m.role}</div>
      <div class="desc">${m.desc}</div>
    </div>`;
});

const socials = document.getElementById("socials");
SOCIALS.forEach(s => {
  socials.innerHTML += `<a href="${s.url}" target="_blank" rel="noreferrer">${s.name}</a>`;
});

const clockEl = document.getElementById("clock");
function updateClock() {
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
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
}

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

const canvas = document.getElementById("constellation");
const ctx = canvas.getContext("2d");
let stars = [];
let w, h;
let shockwaves = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  const count = Math.floor((w * h) / 18000);
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.6,
      twinkle: Math.random() * Math.PI * 2,
      hue: Math.random() < 0.5 ? 330 : 280,
    });
  }
}
resize();
window.addEventListener("resize", resize);

const mouse = { x: -1000, y: -1000 };
window.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });

function explodeAt(px, py) {
  shockwaves.push({ x: px, y: py, r: 0, life: 1 });
  stars.forEach(s => {
    const dx = s.x - px;
    const dy = s.y - py;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d < 400 && d > 0) {
      const force = (400 - d) / 400;
      s.vx += (dx / d) * force * 8;
      s.vy += (dy / d) * force * 8;
    }
  });
}

document.addEventListener("click", e => {
  if (e.target.closest("a, button, .avatar")) return;
  explodeAt(e.clientX, e.clientY);
});

document.addEventListener("touchstart", e => {
  if (e.target.closest("a, button, .avatar")) return;
  const t = e.touches[0];
  explodeAt(t.clientX, t.clientY);
}, { passive: true });

function draw() {
  ctx.clearRect(0, 0, w, h);

  shockwaves = shockwaves.filter(sw => sw.life > 0);
  shockwaves.forEach(sw => {
    sw.r += 6;
    sw.life -= 0.025;
    ctx.beginPath();
    ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(330, 90%, 70%, ${sw.life * 0.6})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        const alpha = (1 - dist / 130) * 0.25;
        ctx.strokeStyle = `hsla(${stars[i].hue}, 90%, 70%, ${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }
    }
  }

  stars.forEach(s => {
    s.twinkle += 0.02;
    const glow = 0.6 + Math.sin(s.twinkle) * 0.4;

    const mdx = mouse.x - s.x;
    const mdy = mouse.y - s.y;
    const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
    if (mdist < 150 && mdist > 0) {
      s.vx += (mdx / mdist) * 0.02;
      s.vy += (mdy / mdist) * 0.02;
    }

    s.x += s.vx;
    s.y += s.vy;
    s.vx *= 0.97;
    s.vy *= 0.97;

    if (s.x < 0 || s.x > w) s.vx *= -1;
    if (s.y < 0 || s.y > h) s.vy *= -1;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${s.hue}, 90%, 75%, ${glow})`;
    ctx.shadowBlur = 12;
    ctx.shadowColor = `hsla(${s.hue}, 90%, 70%, 0.9)`;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  requestAnimationFrame(draw);
}
draw();

const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
document.addEventListener("mouseover", e => {
  const interactive = e.target.closest("a, button, .avatar");
  cursor.classList.toggle("big", !!interactive);
});

const avatar = document.getElementById("avatar");
const wrap = avatar.parentElement;

wrap.addEventListener("mousemove", e => {
  const r = avatar.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  avatar.style.transform = `rotateX(${-y * 20}deg) rotateY(${x * 20}deg) scale(1.02)`;
});
wrap.addEventListener("mouseleave", () => {
  avatar.style.transform = "rotateX(0) rotateY(0) scale(1)";
});

function boing() {
  avatar.classList.remove("boing");
  void avatar.offsetWidth;
  avatar.classList.add("boing");
  popSound();
  setTimeout(() => avatar.classList.remove("boing"), 650);
}
avatar.addEventListener("click", boing);
avatar.addEventListener("touchstart", boing, { passive: true });

document.querySelectorAll(".socials a, .audio-btn, .top-btn, .share-btn").forEach(el => {
  el.addEventListener("mousemove", e => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.06)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      if (e.target.id === "about") startTyping();
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll("section").forEach(s => observer.observe(s));

let typed = false;
function startTyping() {
  if (typed) return;
  typed = true;
  const el = document.getElementById("bioFirst");
  const second = document.getElementById("bioSecond");
  let i = 0;
  function type() {
    if (i <= BIO_FIRST.length) {
      el.innerHTML = BIO_FIRST.slice(0, i) + '<span class="caret">▍</span>';
      i++;
      setTimeout(type, 35);
    } else {
      el.innerHTML = BIO_FIRST;
      setTimeout(() => second.classList.add("show"), 300);
    }
  }
  type();
}

const audioBtn = document.getElementById("audioBtn");
const audio = new Audio("track.m4a");
audio.loop = true;
audio.volume = 0.2;
let playing = false;
audioBtn.addEventListener("click", () => {
  if (playing) audio.pause(); else audio.play();
  playing = !playing;
  audioBtn.textContent = playing ? "🔊" : "🔇";
});

const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  topBtn.classList.toggle("show", window.scrollY > 400);
});
topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const shareBtn = document.getElementById("shareBtn");
shareBtn.addEventListener("click", async () => {
  const data = {
    title: "Екатерина — актриса, блогер, музыкант",
    text: "Загляни на мой сайт ✨",
    url: location.href,
  };
  if (navigator.share) {
    try { await navigator.share(data); } catch (e) {}
  } else {
    try {
      await navigator.clipboard.writeText(location.href);
      toast("Ссылка скопирована ✨");
    } catch (e) {
      toast("Не удалось скопировать");
    }
  }
});
