// ---------- boneka-boneka lucu (file SVG di folder Boneka/) ----------
// pos: tl/tr/bl/br = pojok, lm/rm = tengah kiri/kanan, peek-l/peek-r = mengintip dari tepi.
// size: s (kecil) / l (besar). img 'kue' = kue tart dengan lilin menyala.
const PLUSH_LAYOUT = {
  gate: [ {img:'lotso', pos:'bl', size:'l'}, {img:'kelinci', pos:'br'}, {img:'balon', pos:'tl', size:'s'}, {img:'kue', pos:'tr'} ],
  pages: [
    // 0 pembuka
    [ {img:'lotso', pos:'br', size:'l'}, {img:'kelinci', pos:'bl'}, {img:'balon', pos:'tl'}, {img:'kue', pos:'tr'}, {img:'stroberi', pos:'lm', size:'s'} ],
    // 1 surat
    [ {img:'lotso-intip', pos:'peek-r'}, {img:'kue', pos:'bl'}, {img:'balon', pos:'tl', size:'s'}, {img:'stroberi', pos:'tr', size:'s'} ],
    // 2 cerita kita
    [ {img:'teddy', pos:'br'}, {img:'balon', pos:'tl', size:'s'}, {img:'lotso-intip', pos:'peek-l'}, {img:'kue', pos:'tr', size:'s'} ],
    // 3 alasan
    [ {img:'kelinci', pos:'br'}, {img:'lotso-intip', pos:'peek-l'}, {img:'kue', pos:'tr'}, {img:'stroberi', pos:'bl', size:'s'} ],
    // 4 kenangan
    [ {img:'lotso', pos:'bl'}, {img:'stroberi', pos:'tr', size:'s'}, {img:'teddy', pos:'br', size:'s'}, {img:'kue', pos:'tl', size:'s'} ],
    // 5 video: sedikit saja supaya tidak menutupi video
    [ {img:'balon', pos:'tl', size:'s'}, {img:'kue', pos:'br', size:'s'} ],
    // 6 angka-angka
    [ {img:'teddy', pos:'bl'}, {img:'lotso-intip', pos:'peek-r'}, {img:'balon', pos:'tl', size:'s'}, {img:'kue', pos:'br'} ],
    // 7 penutup
    [ {img:'lotso', pos:'br', size:'l'}, {img:'teddy', pos:'bl'}, {img:'kue', pos:'tl'}, {img:'kelinci', pos:'tr', size:'s'}, {img:'balon', pos:'rm', size:'s'} ]
  ]
};

function initPlushies(){
  function makeDecor(items){
    const layer = document.createElement('div');
    layer.className = 'page-decor';
    layer.setAttribute('aria-hidden', 'true');
    items.forEach(it=>{
      const img = document.createElement('img');
      img.src = `Boneka/${it.img}.svg`;
      img.alt = '';
      img.className = `plush p-${it.img} ${it.pos} ${it.size || ''}`;
      img.style.animationDelay = (-Math.random()*3.6).toFixed(2) + 's';
      layer.appendChild(img);
    });
    return layer;
  }

  const gate = document.getElementById('gate');
  gate.prepend(makeDecor(PLUSH_LAYOUT.gate));

  document.querySelectorAll('#book .page-front').forEach((front,i)=>{
    const items = PLUSH_LAYOUT.pages[i % PLUSH_LAYOUT.pages.length];
    front.prepend(makeDecor(items));
  });
}
