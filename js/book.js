// ---------- buku: pindah halaman ke samping dengan efek balik kertas ----------
function initBook(){
  const TURN_MS = 1100; // samakan dengan durasi transition .page di style.css
  const pages = [...document.querySelectorAll('#book .page')];
  const nextBtn = document.getElementById('nextPage');
  const nextLabel = document.getElementById('nextLabel');
  const prevBtn = document.getElementById('prevPage');
  const prevLabel = document.getElementById('prevLabel');
  let finished = false; // jadi true setelah sampai lembar terakhir -> baru boleh kembali
  // judul tiap halaman untuk tombol next: pakai data-title kalau ada, kalau tidak pakai teks kicker
  const titleOf = i=>{
    const p = pages[i];
    if(p.dataset.title) return p.dataset.title;
    const k = p.querySelector('.kicker');
    return k ? k.textContent.trim() : 'lanjut';
  };
  const indicator = document.getElementById('pageIndicator');
  const bar = document.getElementById('progressBar');
  const gate = document.getElementById('gate');

  // halaman pertama paling atas; tiap halaman dapat bayangan + sisi belakang kertas
  pages.forEach((p,i)=>{
    p.style.zIndex = pages.length - i;
    const shade = document.createElement('div');
    shade.className = 'page-shade';
    const back = document.createElement('div');
    back.className = 'page-back';
    p.append(shade, back);
  });

  let current = 0;
  let animating = false;

  function revealPage(i){
    pages[i].querySelectorAll('.reveal').forEach((el,k)=>{
      el.style.transitionDelay = (k*0.08)+'s';
      el.classList.add('in');
    });
  }
  function resetReveal(i){
    pages[i].querySelectorAll('.reveal').forEach(el=>{
      el.style.transitionDelay = '0s';
      el.classList.remove('in');
    });
  }

  // halaman dengan data-wait (mis. surat yang sedang diketik) menahan tombol next
  const isWaiting = i=> pages[i].dataset.wait === '1';
  pages.forEach((p,i)=> p.addEventListener('pageready', ()=>{
    if(i !== current) return;
    update();
    // kilau ekstra sebentar saat tombol next baru saja aktif
    nextBtn.classList.remove('just-ready');
    void nextBtn.offsetWidth;
    nextBtn.classList.add('just-ready');
    setTimeout(()=> nextBtn.classList.remove('just-ready'), 2400);
  }));

  function update(){
    const last = current === pages.length-1;
    indicator.textContent = last ? 'selesai ♡' : `${current+1} / ${pages.length}`;
    if(last) finished = true;
    nextBtn.hidden = last;
    nextBtn.disabled = last || isWaiting(current);
    if(!last){
      nextLabel.textContent = isWaiting(current) ? (pages[current].dataset.waitLabel || 'tunggu dulu ya ♡') : titleOf(current+1);
      nextBtn.setAttribute('aria-label', 'lanjut ke: ' + titleOf(current+1));
    }
    prevBtn.hidden = !finished || current === 0;
    if(!prevBtn.hidden){
      prevLabel.textContent = current-1 === 0 ? 'awal' : titleOf(current-1);
      prevBtn.setAttribute('aria-label', 'kembali ke: ' + prevLabel.textContent);
    }
    bar.style.width = (pages.length > 1 ? current/(pages.length-1)*100 : 100) + '%';
    pages.forEach((p,i)=> p.inert = i !== current);
  }

  // hanya bisa maju (tidak bisa kembali ke halaman sebelumnya)
  function goNext(){
    const n = current + 1;
    if(animating || n >= pages.length || isWaiting(current)) return;
    animating = true;
    const prev = current;

    pages[prev].dispatchEvent(new CustomEvent('pageleave'));
    pages[prev].classList.add('turned','turning');
    current = n;
    pages[n].querySelector('.page-front').scrollTop = 0;
    update();

    setTimeout(()=>{
      revealPage(n);
      pages[n].dispatchEvent(new CustomEvent('pageopen'));
    }, 300);
    setTimeout(()=>{
      pages.forEach(p=> p.classList.remove('turning'));
      resetReveal(prev);
      animating = false;
    }, TURN_MS);
  }

  // kembali: hanya terbuka setelah sampai di lembar terakhir
  function goPrev(){
    const n = current - 1;
    if(animating || !finished || n < 0) return;
    animating = true;
    const prev = current;

    pages[prev].dispatchEvent(new CustomEvent('pageleave'));
    pages[n].classList.remove('turned');
    pages[n].classList.add('turning');
    current = n;
    pages[n].querySelector('.page-front').scrollTop = 0;
    update();

    setTimeout(()=>{
      revealPage(n);
      pages[n].dispatchEvent(new CustomEvent('pageopen'));
    }, 600);
    setTimeout(()=>{
      pages.forEach(p=> p.classList.remove('turning'));
      resetReveal(prev);
      animating = false;
    }, TURN_MS);
  }

  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);

  // panah kanan di keyboard (kecuali sedang mengetik / masih di layar amplop-PIN)
  window.addEventListener('keydown', (e)=>{
    if(!gate.classList.contains('hidden')) return;
    if(e.target.closest && e.target.closest('input, textarea')) return;
    if(e.key === 'ArrowRight') goNext();
    else if(e.key === 'ArrowLeft') goPrev();
  });

  // geser ke kiri di HP = lanjut — abaikan kalau mulai di galeri foto, video, atau kolom input
  const book = document.getElementById('book');
  let sx = null, sy = 0, ignore = false;
  book.addEventListener('touchstart', (e)=>{
    const t = e.touches[0];
    sx = t.clientX; sy = t.clientY;
    ignore = !!e.target.closest('.carousel, .vplayer, input, textarea');
  }, { passive:true });
  book.addEventListener('touchend', (e)=>{
    if(sx === null || ignore){ sx = null; return; }
    const t = e.changedTouches[0];
    const dx = t.clientX - sx, dy = t.clientY - sy;
    sx = null;
    if(Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)*1.4){
      if(dx < 0) goNext(); else goPrev();
    }
  });

  update();
  revealPage(0);
}
