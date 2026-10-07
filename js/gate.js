// ---------- amplop + trigger musik + PIN ----------
function initEnvelope(bgMusic){
  const envelope = document.getElementById('envelope');
  const wrap = document.getElementById('envelopeWrap');
  const gate = document.getElementById('gate');
  const intro = document.getElementById('gateIntro');
  const pinScreen = document.getElementById('pinScreen');
  const musicDock = document.getElementById('musicDock');
  const muteBtn = document.getElementById('muteBtn');

  const isLocked = initLockCountdown();

  wrap.addEventListener('click', ()=>{
    if(isLocked()){
      wrap.classList.remove('locked-shake');
      void wrap.offsetWidth; // restart animasi goyang
      wrap.classList.add('locked-shake');
      return;
    }
    if(envelope.classList.contains('open')) return;
    envelope.classList.add('open');

    // amplop terbuka -> intro memudar -> layar PIN muncul
    setTimeout(()=>{
      intro.classList.add('hide');
      setTimeout(()=>{
        intro.style.display = 'none';
        pinScreen.classList.add('show');
      }, 600);
    }, 900);
  });

  // PIN benar -> musik diputar, lalu gate dibuka & buku bisa dibaca.
  // play() dipanggil langsung (bukan di dalam setTimeout) supaya masih
  // terhitung sebagai aksi pengguna dan tidak diblokir autoplay browser.
  initPinLock(()=>{
    bgMusic.volume = 0.55;
    bgMusic.play().then(()=>{
      musicDock.classList.add('playing');
    }).catch((err)=>{
      console.warn('[musik] Autoplay diblokir atau gagal diputar. Klik tombol ♪ untuk memutar manual.', err);
    });
    musicDock.classList.add('show');

    setTimeout(()=> gate.classList.add('hidden'), 800);
  });

  muteBtn.addEventListener('click', ()=>{
    bgMusic.muted = !bgMusic.muted;
    muteBtn.textContent = bgMusic.muted ? '✕' : '♪';
    musicDock.classList.toggle('playing', !bgMusic.muted);

    // kalau musik belum pernah kepitar (autoplay diblokir), coba play() lagi
    if(!bgMusic.muted && bgMusic.paused){
      bgMusic.play().catch((err)=>{
        console.warn('[musik] Masih gagal diputar.', err);
      });
    }
  });
}

// ---------- hitung mundur: amplop terkunci sampai CONFIG.unlockAt ----------
// mengembalikan fungsi isLocked() yang selalu cek jam saat ini
function initLockCountdown(){
  const box = document.getElementById('lockCountdown');
  const hint = document.getElementById('gateHint');
  if(!CONFIG.unlockAt) return ()=> false;

  // parse sebagai waktu lokal (bukan UTC)
  const [datePart, timePart='00:00'] = CONFIG.unlockAt.split('T');
  const [y, mo, d] = datePart.split('-').map(Number);
  const [h, mi] = timePart.split(':').map(Number);
  const target = new Date(y, mo-1, d, h, mi);

  // mode cek: buka website dengan tambahan "?cek" di akhir alamat
  // (contoh: index.html?cek) supaya kunci dilewati. Pacarmu tidak akan tahu.
  if(new URLSearchParams(location.search).has('cek')) return ()=> false;

  const isLocked = ()=> Date.now() < target.getTime();
  if(!isLocked()) return isLocked;

  document.getElementById('lockNote').textContent =
    'bisa dibuka ' + target.toLocaleDateString('id-ID', { weekday:'long', day:'numeric', month:'long', year:'numeric' }) +
    (h || mi ? ', pukul ' + String(h).padStart(2,'0') + '.' + String(mi).padStart(2,'0') : '');
  box.hidden = false;
  hint.textContent = 'sabar ya, sebentar lagi ♡';
  document.getElementById('envelopeWrap').classList.add('locked');

  const pad = n=> String(n).padStart(2,'0');
  function tick(){
    const diff = target.getTime() - Date.now();
    if(diff <= 0){
      clearInterval(timer);
      box.hidden = true;
      hint.textContent = 'ketuk amplopnya, sayang';
      document.getElementById('envelopeWrap').classList.remove('locked');
      return;
    }
    const s = Math.floor(diff/1000);
    document.getElementById('cdDays').textContent = Math.floor(s/86400);
    document.getElementById('cdHours').textContent = pad(Math.floor(s%86400/3600));
    document.getElementById('cdMins').textContent = pad(Math.floor(s%3600/60));
    document.getElementById('cdSecs').textContent = pad(s%60);
  }
  const timer = setInterval(tick, 1000);
  tick();
  return isLocked;
}

// ---------- layar PIN ----------
function initPinLock(onUnlock){
  const pin = String(CONFIG.pin);
  const screen = document.getElementById('pinScreen');
  const dotsHost = document.getElementById('pinDots');
  const keypad = document.getElementById('pinKeypad');
  const msg = document.getElementById('pinMsg');
  document.getElementById('pinHint').textContent = CONFIG.pinHint || '';

  for(let i=0;i<pin.length;i++) dotsHost.appendChild(document.createElement('span'));

  let entered = '';
  let busy = false;

  function render(){
    [...dotsHost.children].forEach((d,i)=> d.classList.toggle('filled', i < entered.length));
  }

  function check(){
    busy = true;
    if(entered === pin){
      screen.classList.add('ok');
      msg.textContent = 'benar ♡ selamat datang';
      onUnlock();
    } else {
      screen.classList.add('shake');
      msg.textContent = 'belum tepat, coba ingat lagi ya';
      setTimeout(()=>{
        entered = '';
        render();
        screen.classList.remove('shake');
        busy = false;
      }, 700);
    }
  }

  function press(d){
    if(busy || !screen.classList.contains('show')) return;
    if(entered.length >= pin.length) return;
    msg.textContent = '';
    entered += d;
    render();
    if(entered.length === pin.length) check();
  }

  function del(){
    if(busy || !screen.classList.contains('show')) return;
    entered = entered.slice(0, -1);
    render();
  }

  // keypad: 1-9, kosong, 0, hapus
  ['1','2','3','4','5','6','7','8','9','','0','del'].forEach(k=>{
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'pin-key' + (k==='' ? ' ghost' : '') + (k==='del' ? ' del' : '');
    b.textContent = k==='del' ? '⌫' : k;
    if(k==='del') b.addEventListener('click', del);
    else if(k!=='') b.addEventListener('click', ()=> press(k));
    keypad.appendChild(b);
  });

  // keyboard fisik
  window.addEventListener('keydown', (e)=>{
    if(/^[0-9]$/.test(e.key)) press(e.key);
    else if(e.key === 'Backspace') del();
  });
}
