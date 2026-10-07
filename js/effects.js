// ---------- cursor kilau ----------
function initSparkleCursor(){
  let last = 0;
  window.addEventListener('pointermove', (e)=>{
    const now = Date.now();
    if(now - last < 90) return;
    last = now;
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.textContent = Math.random() > 0.5 ? '✦' : '·';
    s.style.left = e.clientX + 'px';
    s.style.top = e.clientY + 'px';
    document.body.appendChild(s);
    setTimeout(()=> s.remove(), 900);
  });
}

// ---------- kelopak melayang ----------
function initPetals(){
  const host = document.getElementById('petals');
  const chars = ['🍓','🧸','♡','✿','🍓','♡'];
  for(let i=0;i<22;i++){
    const p = document.createElement('div');
    p.className='petal';
    p.textContent = chars[Math.floor(Math.random()*chars.length)];
    p.style.left = Math.random()*100+'vw';
    p.style.fontSize = (10+Math.random()*10)+'px';
    p.style.animationDuration = (9+Math.random()*10)+'s';
    p.style.animationDelay = (Math.random()*10)+'s';
    host.appendChild(p);
  }
}

// ---------- bintang latar hero ----------
function initStars(){
  const host = document.getElementById('stars');
  if(!host) return;
  for(let i=0;i<70;i++){
    const s = document.createElement('div');
    s.className='star';
    s.style.left = Math.random()*100+'%';
    s.style.top = Math.random()*100+'%';
    s.style.animationDuration = (2+Math.random()*3)+'s';
    s.style.animationDelay = (Math.random()*3)+'s';
    host.appendChild(s);
  }
}
