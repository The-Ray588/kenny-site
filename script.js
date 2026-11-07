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
  {
    name: "TheRay",
    role: "Программист · Художник · 3D-модельер",
    desc: "Очень дружелюбный и добрый. Помогает разрабатывать сайты, рисовать арты и создавать 3D-модели моего Minecraft-персонажа."
  },
  {
    name: "Csinffy",
    role: "Монтажёр",
    desc: "Помогает находить и исправлять ошибки в монтаже, а также сам монтирует видео в своей программе."
  },
  {
    name: "Timerik / Preniks",
    role: "Продюсер",
    desc: "Создаёт биты для моего музыкального творчества. Также отлично разбирается в монтаже и иногда помогает делать видео под треки с субтитрами."
  },
  {
    name: "Layz",
    role: "Интромэйкер",
    desc: "Делает стильные интро для моих видеороликов."
  },
  {
    name: "Liga",
    role: "Дизайнер",
    desc: "Создаёт превью, скины и оформления для контента."
  },
  {
    name: "Miray",
    role: "Главный менеджер · Дизайнер · Интромэйкер",
    desc: "Создаёт превью, скины, оформления и интро. Передаёт мне информацию, которую люди хотят уточнить."
  },
  {
    name: "Flady",
    role: "Актриса",
    desc: "Родная актриса, с которой мы снимаем различные коллаборации."
  },
  {
    name: "Apathyfamee",
    role: "Защитник профиля и YouTube-канала",
    desc: "Отвечает за безопасность и защиту от незаконных действий злоумышленников. Всегда готов дать отпор."
  },
];

const SOCIALS = [
  { name: "Telegram", url: "https://t.me/MsKennya", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>' },
  { name: "YouTube", url: "https://www.youtube.com/@MsKennya_MCPE", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>' },
  { name: "ВКонтакте", url: "https://vk.ru/mayni_mcpe", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.744-.576.744z"/></svg>' },
];

const BIO_FULL = "Здравствуйте! Меня зовут Екатерина, и мне 14–15 лет. Я увлекаюсь актёрским мастерством, ведением блога, музыкой и психологией.";

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
  socials.innerHTML += `<a href="${s.url}" target="_blank" rel="noreferrer">${s.icon}<span>${s.name}</span></a>`;
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
  if (e.target.closest("a, button, .avatar, input, textarea, .loader")) return;
  explodeAt(e.clientX, e.clientY);
});

document.addEventListener("touchstart", e => {
  if (e.target.closest("a, button, .avatar, input, textarea, .loader")) return;
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
  const interactive = e.target.closest("a, button, .avatar, input, textarea");
  cursor.classList.toggle("big", !!interactive);
});

const avatar = document.getElementById("avatar");
const avatarImg = document.getElementById("avatarImg");
const avatarFallback = document.getElementById("avatarFallback");
const pendulum = document.getElementById("avatarPendulum");
const wrap = avatar.parentElement.parentElement;

if (avatarImg && avatarFallback) {
  const showFallback = () => {
    avatarImg.style.display = "none";
    avatarFallback.style.display = "flex";
  };
  avatarImg.addEventListener("error", showFallback);
  if (avatarImg.complete && avatarImg.naturalWidth === 0) showFallback();
}

wrap.addEventListener("mousemove", e => {
  const r = avatar.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;

  avatar.style.transform = `rotateX(${-y * 20}deg) rotateY(${x * 20}deg) scale(1.02)`;

  const swing = x * 8;
  pendulum.style.transform = `rotate(${swing}deg)`;
  pendulum.style.animation = "none";
});

wrap.addEventListener("mouseleave", () => {
  avatar.style.transform = "rotateX(0) rotateY(0) scale(1)";
  pendulum.style.transform = "";
  pendulum.style.animation = "";
});

function boing() {
  avatar.classList.remove("boing");
  void avatar.offsetWidth;
  avatar.classList.add("boing");
  popSound();

  pendulum.style.animation = "boingPendulum 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)";
  setTimeout(() => {
    avatar.classList.remove("boing");
    pendulum.style.animation = "";
  }, 950);
}
avatar.addEventListener("click", boing);
avatar.addEventListener("touchstart", boing, { passive: true });

document.querySelectorAll(".socials a, .audio-btn, .top-btn, .share-btn, .dev-btn").forEach(el => {
  el.addEventListener("mousemove", e => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.08)`;
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
  const el = document.getElementById("bioText");
  let i = 0;
  function type() {
    if (i <= BIO_FULL.length) {
      el.innerHTML = BIO_FULL.slice(0, i) + '<span class="caret">▍</span>';
      i++;
      const ch = BIO_FULL[i - 1];
      const delay = (ch === "," || ch === "." || ch === "!" || ch === "—") ? 120 : 35;
      setTimeout(type, delay);
    } else {
      el.innerHTML = BIO_FULL;
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

const writeForm = document.getElementById("writeForm");
if (writeForm) {
  writeForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("writeName").value.trim();
    const msg = document.getElementById("writeMsg").value.trim();
    if (!name || !msg) return;
    const text = `Привет! Меня зовут ${name}.\n\n${msg}`;
    const url = `https://t.me/MsKennya?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    toast("Открываю Telegram ✨");
    writeForm.reset();
  });
}

(function() {
  const meteorCanvas = document.getElementById("meteors");
  if (!meteorCanvas) return;
  const mctx = meteorCanvas.getContext("2d");
  let mw, mh;

  function mresize() {
    mw = meteorCanvas.width = window.innerWidth;
    mh = meteorCanvas.height = window.innerHeight;
  }
  mresize();
  window.addEventListener("resize", mresize);

  const meteors = [];
  const maxMeteors = 3;

  function spawnMeteor() {
    if (meteors.length >= maxMeteors) return;
    meteors.push({
      x: Math.random() * mw,
      y: -100,
      vx: 2 + Math.random() * 2,
      vy: 4 + Math.random() * 3,
      len: 80 + Math.random() * 80,
      life: 1,
      hue: Math.random() < 0.5 ? 330 : 280,
    });
  }

  function drawMeteors() {
    mctx.clearRect(0, 0, mw, mh);

    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.x += m.vx;
      m.y += m.vy;
      m.life -= 0.003;

      if (m.y > mh + 100 || m.x > mw + 100 || m.life <= 0) {
        meteors.splice(i, 1);
        continue;
      }

      const dx = m.vx / Math.sqrt(m.vx*m.vx + m.vy*m.vy);
      const dy = m.vy / Math.sqrt(m.vx*m.vx + m.vy*m.vy);

      const grad = mctx.createLinearGradient(
        m.x, m.y,
        m.x - dx * m.len, m.y - dy * m.len
      );
      grad.addColorStop(0, `hsla(${m.hue}, 90%, 75%, ${m.life * 0.9})`);
      grad.addColorStop(1, `hsla(${m.hue}, 90%, 75%, 0)`);

      mctx.strokeStyle = grad;
      mctx.lineWidth = 2;
      mctx.beginPath();
      mctx.moveTo(m.x, m.y);
      mctx.lineTo(m.x - dx * m.len, m.y - dy * m.len);
      mctx.stroke();

      mctx.beginPath();
      mctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
      mctx.fillStyle = `hsla(${m.hue}, 90%, 85%, ${m.life})`;
      mctx.shadowBlur = 15;
      mctx.shadowColor = `hsla(${m.hue}, 90%, 75%, ${m.life})`;
      mctx.fill();
      mctx.shadowBlur = 0;
    }

    requestAnimationFrame(drawMeteors);
  }
  drawMeteors();

  setInterval(spawnMeteor, 2500);
  setTimeout(spawnMeteor, 500);
})();
