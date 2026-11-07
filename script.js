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

const pc = document.getElementById("particles");
for (let i = 0; i < 40; i++) {
  const p = document.createElement("span");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "%";
  p.style.top = Math.random() * 100 + "%";
  p.style.animationDelay = Math.random() * 10 + "s";
  p.style.animationDuration = (10 + Math.random() * 10) + "s";
  pc.appendChild(p);
}

const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
document.addEventListener("mouseover", e => {
  const interactive = e.target.closest("a, button");
  cursor.classList.toggle("big", !!interactive);
});

const avatar = document.getElementById("avatar");
const wrap = avatar.parentElement;
wrap.addEventListener("mousemove", e => {
  const r = avatar.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  avatar.style.transform = `rotateX(${-y * 20}deg) rotateY(${x * 20}deg)`;
});
wrap.addEventListener("mouseleave", () => {
  avatar.style.transform = "rotateX(0) rotateY(0)";
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
