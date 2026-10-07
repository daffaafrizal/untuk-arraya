// ---------- efek mengetik (teks berjalan) untuk surat ----------
// Teks lengkap sudah ada di layout (tak terlihat) supaya panel tidak "melompat"
// saat huruf muncul satu per satu. Ketuk surat untuk langsung tampil semua.
function initTypewriter(host, signoff){
  const CHAR_MS = 32, PARA_PAUSE_MS = 450;
  // pecah per karakter yang terlihat, supaya emoji (mis. 🫶🏻) muncul utuh, bukan setengah
  const seg = window.Intl && Intl.Segmenter ? new Intl.Segmenter('id', { granularity:'grapheme' }) : null;
  const splitChars = s=> seg ? [...seg.segment(s)].map(x=> x.segment) : Array.from(s);
  const paras = [...host.querySelectorAll('p')].map(p=>{
    const full = p.textContent;
    const chars = splitChars(full);
    p.textContent = '';
    const typed = document.createElement('span');
    const caret = document.createElement('span');
    caret.className = 'tw-caret';
    const rest = document.createElement('span');
    rest.className = 'tw-rest';
    rest.textContent = full;
    p.append(typed, caret, rest);
    return { full, chars, typed, caret, rest };
  });
  signoff.classList.add('tw-signoff');

  // tahan tombol next sampai surat selesai diketik
  const page = host.closest('.page');
  page.dataset.wait = '1';
  page.dataset.waitLabel = 'baca dulu ya ♡';

  let started = false, done = false, timer = null;

  function finish(){
    if(done) return;
    done = true;
    clearTimeout(timer);
    paras.forEach(p=>{ p.typed.textContent = p.full; p.rest.textContent = ''; p.caret.remove(); });
    signoff.classList.add('show');
    delete page.dataset.wait;
    page.dispatchEvent(new CustomEvent('pageready'));
  }

  function typePara(i, pos){
    if(done) return;
    if(i >= paras.length){ finish(); return; }
    const p = paras[i];
    p.caret.classList.add('on');
    if(pos > p.chars.length){
      p.caret.remove();
      timer = setTimeout(()=> typePara(i+1, 0), PARA_PAUSE_MS);
      return;
    }
    p.typed.textContent = p.chars.slice(0, pos).join('');
    p.rest.textContent = p.chars.slice(pos).join('');
    // jeda sedikit lebih lama setelah tanda baca, biar terasa natural
    const ch = p.chars[pos-1] || '';
    const delay = /[.,!?—]/.test(ch) ? CHAR_MS*6 : CHAR_MS;
    timer = setTimeout(()=> typePara(i, pos+1), delay);
  }

  page.addEventListener('pageopen', ()=>{
    if(started) return;
    started = true;
    timer = setTimeout(()=> typePara(0, 0), 700);
  });
  host.closest('.letter').addEventListener('click', finish);
}
