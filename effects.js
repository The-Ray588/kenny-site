const canvas = document.getElementById("constellation");
if (canvas) {
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
}

const cursor = document.getElementById("cursor");
if (cursor) {
  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
  document.addEventListener("mouseover", e => {
    const interactive = e.target.closest("a, button, .avatar, input, textarea");
    cursor.classList.toggle("big", !!interactive);
  });
}

const avatar = document.getElementById("avatar");
const avatarImg = document.getElementById("avatarImg");
const avatarFallback = document.getElementById("avatarFallback");
const pendulum = document.getElementById("avatarPendulum");

if (avatar) {
  if (avatarImg && avatarFallback) {
    const showFallback = () => {
      avatarImg.style.display = "none";
      avatarFallback.style.display = "flex";
    };
    avatarImg.addEventListener("error", showFallback);
    if (avatarImg.complete && avatarImg.naturalWidth === 0) showFallback();
  }

  const wrap = avatar.parentElement.parentElement;

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
    if (window.popSound) window.popSound();

    pendulum.style.animation = "boingPendulum 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)";
    setTimeout(() => {
      avatar.classList.remove("boing");
      pendulum.style.animation = "";
    }, 950);
  }
  avatar.addEventListener("click", boing);
  avatar.addEventListener("touchstart", boing, { passive: true });
}

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
  if (!el) return;
  const BIO = "Здравствуйте! Меня зовут Екатерина, и мне 14–15 лет. Я увлекаюсь актёрским мастерством, ведением блога, музыкой и психологией.";
  let i = 0;
  function type() {
    if (i <= BIO.length) {
      el.innerHTML = BIO.slice(0, i) + '<span class="caret">▍</span>';
      i++;
      const ch = BIO[i - 1];
      const delay = (ch === "," || ch === "." || ch === "!" || ch === "—") ? 120 : 35;
      setTimeout(type, delay);
    } else {
      el.innerHTML = BIO;
    }
  }
  type();
}

const audioBtn = document.getElementById("audioBtn");
if (audioBtn) {
  const audio = new Audio("track.m4a");
  audio.loop = true;
  audio.volume = 0.2;
  let playing = false;
  audioBtn.addEventListener("click", () => {
    if (playing) audio.pause(); else audio.play();
    playing = !playing;
    audioBtn.textContent = playing ? "🔊" : "🔇";
  });
}

const topBtn = document.getElementById("topBtn");
if (topBtn) {
  window.addEventListener("scroll", () => {
    topBtn.classList.toggle("show", window.scrollY > 400);
  });
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const shareBtn = document.getElementById("shareBtn");
if (shareBtn) {
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
        if (window.toast) window.toast("Ссылка скопирована ✨");
      } catch (e) {
        if (window.toast) window.toast("Не удалось скопировать");
      }
    }
  });
}

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
    if (window.toast) window.toast("Открываю Telegram ✨");
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
