// ---------- hitungan hari (dibandingkan per tanggal, bukan per jam) ----------
function updateDayCounters(){
  const DAY = 24*60*60*1000;
  const today = new Date(); today.setHours(0,0,0,0);

  // parse tanggal sebagai waktu lokal (bukan UTC) supaya nggak selisih 1 hari
  const [ty, tm, td] = CONFIG.togetherSince.split('-').map(Number);
  const start = new Date(ty, tm-1, td);
  const daysTogether = Math.max(0, Math.round((today - start)/DAY));
  document.getElementById('counterNum').textContent = daysTogether.toLocaleString('id-ID');

  // ulang tahun: kalau hari ini tanggalnya, tampil "hari ini" (bukan lompat ke tahun depan)
  const [bm, bd] = CONFIG.birthdayMonthDay.split('-').map(Number);
  let next = new Date(today.getFullYear(), bm-1, bd);
  if(next < today) next = new Date(today.getFullYear()+1, bm-1, bd);
  const days = Math.round((next - today)/DAY);

  const num = document.getElementById('countdownNum');
  const label = document.getElementById('countdownLabel');
  if(days === 0){
    num.textContent = '🎂';
    label.textContent = 'hari ini ulang tahunmu! selamat ulang tahun ♡';
  } else {
    num.textContent = days.toLocaleString('id-ID');
    label.textContent = days === 1 ? 'hari lagi, besok ulang tahunmu!' : 'hari menuju ulang tahunmu';
  }
}
