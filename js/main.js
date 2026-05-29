/* ============================================================
   SERGIO GALAVIZ — main.js
   Live instruments: clock, uptime, geolocation, mouse coords
   ============================================================ */

const pad = n => String(n).padStart(2, '0');

// ── CLOCK ────────────────────────────────────────────────────
const DAYS   = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent =
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  document.getElementById('datestr').textContent =
    `${DAYS[now.getDay()]} ${pad(now.getDate())} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
}

updateClock();
setInterval(updateClock, 1000);

// ── UPTIME COUNTER ───────────────────────────────────────────
const sessionStart = Date.now();

function updateUptime() {
  const s   = Math.floor((Date.now() - sessionStart) / 1000);
  const h   = Math.floor(s / 3600);
  const m   = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  document.getElementById('uptime').textContent = `${pad(h)}:${pad(m)}:${pad(sec)}`;
}

setInterval(updateUptime, 1000);

// ── COORDINATES ──────────────────────────────────────────────
// Priority: real geolocation → mouse-mapped fallback

const coordEl = document.getElementById('coords');
let hasGeo = false;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => {
      hasGeo = true;
      const lat = pos.coords.latitude.toFixed(2);
      const lng = pos.coords.longitude.toFixed(2);
      coordEl.textContent = `LAT ${lat}° · LNG ${lng}°`;
    },
    () => { /* permission denied — mousemove fallback takes over immediately */ }
  );
}

// Mouse-mapped coordinates shown until real geo is available
document.addEventListener('mousemove', e => {
  if (hasGeo) return;
  const x = ((e.clientX / window.innerWidth)  *  360 - 180).toFixed(2);
  const y = ((e.clientY / window.innerHeight) * -180 +  90).toFixed(2);
  coordEl.textContent = `LAT ${y}° · LNG ${x}°`;
});
