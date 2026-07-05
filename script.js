// ناوبری بین صفحه اصلی و زیرصفحه‌ها
const mainPanel = document.getElementById('mainPanel');
const subPanels = document.querySelectorAll('.sub-panel');

document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('click', () => {
    const target = tile.getAttribute('data-target');
    mainPanel.style.display = 'none';
    subPanels.forEach(p => p.classList.remove('active'));
    document.getElementById('sub-' + target).classList.add('active');
  });
});

document.querySelectorAll('[data-back]').forEach(btn => {
  btn.addEventListener('click', () => {
    subPanels.forEach(p => p.classList.remove('active'));
    mainPanel.style.display = 'flex';
  });
});

// دکمه خروج
document.getElementById('exitBtn').addEventListener('click', () => {
  if (window.electronAPI) window.electronAPI.quit();
  else window.close();
});
document.getElementById('closeBtn').addEventListener('click', () => {
  if (window.electronAPI) window.electronAPI.quit();
  else window.close();
});

// ---- شبیه‌سازی رفتار ماژول MODEL ----
let modelRunning = false;
let modelCh = 1;
document.querySelectorAll('#sub-model [data-ch]').forEach(b => {
  b.addEventListener('click', () => {
    modelCh = modelCh === 1 ? 2 : 1;
    document.getElementById('modelCh').textContent = modelCh;
  });
});
document.getElementById('modelBtn').addEventListener('click', function () {
  modelRunning = !modelRunning;
  this.classList.toggle('active', modelRunning);
});
setInterval(() => {
  if (!modelRunning) return;
  ['1', '2'].forEach(i => {
    const res = document.getElementById('m-res' + i);
    const diff = document.getElementById('m-diff' + i);
    let r = parseFloat(res.textContent) - Math.random() * 0.3;
    let d = parseFloat(diff.textContent) + Math.random() * 0.3;
    res.textContent = r.toFixed(1);
    diff.textContent = d.toFixed(1);
  });
}, 800);

// ---- شبیه‌سازی رفتار ماژول CONTROL ----
let ancRunning = false;
document.getElementById('ancBtn').addEventListener('click', function () {
  ancRunning = !ancRunning;
  this.classList.toggle('active', ancRunning);
});
document.getElementById('updateBtn').addEventListener('click', function () {
  this.classList.toggle('active');
});

function dbToHeightPercent(db) {
  const clamped = Math.max(-80, Math.min(0, db));
  return ((clamped + 80) / 80) * 100;
}
setInterval(() => {
  if (!ancRunning) return;
  for (let i = 1; i <= 2; i++) {
    const val = document.getElementById('cval' + i);
    const bar = document.getElementById('cbar' + i);
    let v = parseFloat(val.textContent) - Math.random() * 0.5;
    v = Math.max(v, -70);
    val.textContent = v.toFixed(1);
    bar.style.height = dbToHeightPercent(v) + '%';
  }
}, 700);

// ---- تب‌های Filters ----
document.querySelectorAll('.tab-btn').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const line = document.getElementById('plotLine');
    if (tab.getAttribute('data-tab') === 'freq') {
      line.setAttribute('points', '0,30 40,32 80,60 120,90 160,110 200,120 240,130 280,150 320,170 360,190 400,210');
    } else {
      line.setAttribute('points', '0,20 20,200 40,60 60,150 80,110 100,130 120,120 140,125 160,122 180,124 400,124');
    }
  });
});
