// ---------- toples harapan (interaktif, hanya di sesi ini / tidak tersimpan) ----------
function initWishJar(){
  const form = document.getElementById('wishForm');
  const input = document.getElementById('wishInput');
  const sky = document.getElementById('wishSky');
  const hint = document.getElementById('wishHint');
  if(!form) return;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const text = input.value.trim();
    if(!text) return;
    hint.style.display = 'none';
    const bubble = document.createElement('div');
    bubble.className = 'wish-bubble';
    bubble.textContent = '✦ ' + text;
    bubble.style.left = (10 + Math.random()*60) + '%';
    bubble.style.setProperty('--drift', (Math.random()*60-30)+'px');
    sky.appendChild(bubble);
    setTimeout(()=> bubble.remove(), 6000);
    input.value = '';

    // kirim harapan ke WhatsApp kamu (dia tinggal tekan tombol kirim di WA)
    const wa = String(CONFIG.whatsappNumber || '').replace(/\D/g, '');
    if(wa){
      const text2 = `✦ Harapan dari ${CONFIG.girlfriendName.split(' ')[0]} di toples harapan:\n\n"${text}"`;
      // jeda sebentar supaya animasi harapan melayang sempat terlihat dulu
      const waWin = window.open('about:blank', '_blank');
      setTimeout(()=>{
        const url = `https://wa.me/${wa}?text=${encodeURIComponent(text2)}`;
        if(waWin) waWin.location.href = url;
        else window.location.href = url;
      }, 1200);
    }
  });
}
