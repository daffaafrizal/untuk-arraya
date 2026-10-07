// ---------- pemutar video (kontrol ala YouTube) ----------
// Video diputar -> lagu latar berhenti. Video di-pause/selesai -> lagu lanjut lagi.
function initVideoPlayer(bgMusic){
  const wrap = document.getElementById('vplayer');
  const video = document.getElementById('memoryVideo');
  if(!wrap || !video) return;
  const bigBtn = document.getElementById('vpBig');
  const playBtn = document.getElementById('vpPlay');
  const fullBtn = document.getElementById('vpFull');
  const progress = document.getElementById('vpProgress');
  const played = document.getElementById('vpPlayed');
  const buffered = document.getElementById('vpBuf');
  const curEl = document.getElementById('vpCur');
  const durEl = document.getElementById('vpDur');
  const musicDock = document.getElementById('musicDock');

  video.src = CONFIG.videoFile;

  // tahan tombol next sampai video selesai ditonton
  const page = wrap.closest('.page');
  page.dataset.wait = '1';
  page.dataset.waitLabel = 'tonton sampai habis ya ♡';
  const unlockNext = ()=>{
    if(page.dataset.wait !== '1') return;
    delete page.dataset.wait;
    page.dispatchEvent(new CustomEvent('pageready'));
  };
  video.addEventListener('ended', unlockNext);

  const fmt = t=>{
    if(!isFinite(t)) return '0:00';
    t = Math.floor(t);
    const h = Math.floor(t/3600), m = Math.floor(t%3600/60), s = t%60;
    return (h ? h + ':' + String(m).padStart(2,'0') : m) + ':' + String(s).padStart(2,'0');
  };

  const toggle = ()=> video.paused || video.ended ? video.play() : video.pause();
  bigBtn.addEventListener('click', toggle);
  playBtn.addEventListener('click', toggle);
  video.addEventListener('click', toggle);

  // --- lagu latar diam selama berada di halaman video ---
  // masuk halaman video -> lagu berhenti & video autoplay
  // pindah ke lembar lain -> video berhenti & lagu lanjut lagi
  let musicWasPlaying = false;
  const stopMusic = ()=>{
    if(!bgMusic.paused){ musicWasPlaying = true; bgMusic.pause(); }
    musicDock.classList.remove('playing');
  };
  const resumeMusic = ()=>{
    if(musicWasPlaying && !bgMusic.muted){
      bgMusic.play().then(()=> musicDock.classList.add('playing')).catch(()=>{});
    }
    musicWasPlaying = false;
  };

  video.addEventListener('play', ()=>{
    stopMusic();
    wrap.classList.add('is-playing');
    playBtn.textContent = '❚❚'; playBtn.setAttribute('aria-label', 'jeda');
    showControls();
  });
  const onStop = ()=>{
    wrap.classList.remove('is-playing');
    playBtn.textContent = '▶'; playBtn.setAttribute('aria-label', 'putar');
    showControls();
  };
  video.addEventListener('pause', onStop);
  video.addEventListener('ended', onStop);
  // kalau lagu dinyalakan manual (tombol ♪) saat video main, video yang di-jeda
  bgMusic.addEventListener('play', ()=>{ if(!video.paused){ musicWasPlaying = false; video.pause(); } });

  page.addEventListener('pageopen', ()=>{
    stopMusic();
    if(video.ended) video.currentTime = 0;
    // autoplay; kalau browser menolak, tombol ▶ besar tetap ada untuk diputar manual
    video.play().catch(err=> console.warn('[video] Autoplay diblokir browser, ketuk ▶ untuk memutar.', err));
  });

  // --- waktu & progress bar ---
  video.addEventListener('loadedmetadata', ()=> durEl.textContent = fmt(video.duration));
  // sebelum video pernah selesai, cuma boleh loncat sampai bagian yang sudah ditonton
  let maxWatched = 0;
  video.addEventListener('timeupdate', ()=>{
    if(!dragging && !video.seeking && video.currentTime - maxWatched < 1.5){
      maxWatched = Math.max(maxWatched, video.currentTime);
    }
    curEl.textContent = fmt(video.currentTime);
    if(!dragging && video.duration) played.style.width = (video.currentTime/video.duration*100) + '%';
  });
  video.addEventListener('progress', ()=>{
    if(video.buffered.length && video.duration){
      buffered.style.width = (video.buffered.end(video.buffered.length-1)/video.duration*100) + '%';
    }
  });

  // --- geser/klik progress bar untuk loncat ---
  let dragging = false;
  const seekTo = (clientX)=>{
    const r = progress.getBoundingClientRect();
    let ratio = Math.min(1, Math.max(0, (clientX - r.left)/r.width));
    if(page.dataset.wait === '1' && video.duration){
      ratio = Math.min(ratio, maxWatched / video.duration);
    }
    played.style.width = (ratio*100) + '%';
    if(video.duration){
      video.currentTime = ratio * video.duration;
      curEl.textContent = fmt(video.currentTime);
    }
  };
  progress.addEventListener('pointerdown', (e)=>{
    dragging = true;
    progress.setPointerCapture(e.pointerId);
    wrap.classList.add('seeking');
    seekTo(e.clientX);
  });
  progress.addEventListener('pointermove', (e)=>{ if(dragging) seekTo(e.clientX); });
  const endDrag = ()=>{ dragging = false; wrap.classList.remove('seeking'); };
  progress.addEventListener('pointerup', endDrag);
  progress.addEventListener('pointercancel', endDrag);

  // --- layar penuh ---
  fullBtn.addEventListener('click', ()=>{
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if(fsEl){ (document.exitFullscreen || document.webkitExitFullscreen).call(document); return; }
    if(wrap.requestFullscreen) wrap.requestFullscreen();
    else if(wrap.webkitRequestFullscreen) wrap.webkitRequestFullscreen();
    else if(video.webkitEnterFullscreen) video.webkitEnterFullscreen(); // iPhone
  });

  // --- kontrol menghilang sendiri saat video main (seperti YouTube) ---
  let hideTimer = null;
  function showControls(){
    wrap.classList.remove('hide-controls');
    clearTimeout(hideTimer);
    if(!video.paused) hideTimer = setTimeout(()=> wrap.classList.add('hide-controls'), 2500);
  }
  wrap.addEventListener('pointermove', showControls);
  wrap.addEventListener('pointerdown', showControls);

  // pindah ke halaman berikutnya -> video otomatis di-jeda (lagu lanjut)
  page.addEventListener('pageleave', ()=>{
    video.pause();
    resumeMusic();
  });

  video.addEventListener('error', ()=>{
    console.warn(`[video] Gagal memuat "${CONFIG.videoFile}". Cek nama file & foldernya.`);
    unlockNext(); // jangan sampai pacarmu terjebak kalau videonya gagal dimuat
  });
}
