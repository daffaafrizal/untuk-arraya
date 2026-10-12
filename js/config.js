/* ======================================================================
   SEMUA YANG PERLU KAMU EDIT ADA DI FILE INI SAJA (CONFIG).
   File lain di folder js/ murni "mesin" — nggak perlu disentuh.
====================================================================== */
const CONFIG = {

  girlfriendName: "Arraya Luthvia Rahmayadi",

  // format YYYY-MM-DD — tanggal kalian jadian, buat hitung "hari bersama"
  togetherSince: "2024-10-13",

  // PIN yang harus dimasukkan setelah amplop dibuka (angka saja).
  // Default: tanggal jadian format DDMMYY -> 13 Oktober 2026 = "131026"
  // Mau 8 digit (13102026)? Ganti saja, jumlah titik PIN otomatis menyesuaikan.
  pin: "131024",
  pinHint: "petunjuk: tanggal jadian kita",

  // format MM-DD (bulan-tanggal) — tanggal lahir  dia, buat hitung mundur ultah berikutnya
  birthdayMonthDay: "10-15",

  // amplop terkunci + hitung mundur sampai waktu ini (waktu lokal perangkat).
  // format "YYYY-MM-DDTHH:MM". Kosongkan ("") kalau mau langsung bisa dibuka.
  unlockAt: "2026-10-15T00:00",

  // nama file lagu, taruh file-nya di folder yang sama dengan index.html
  musicFile: "Music.mp3",
  musicTitle: "Music",

  // lagu yang diputar otomatis saat lilin kue ditiup (halaman penutup)
  cakeSongFile: "tiup-lilin.mp3",

  // video kenangan (tampil di halaman setelah galeri foto)
  videoFile: "Foto/Video.mp4",

  // isi surat, tiap string = 1 paragraf
  letter: [
    "Arrayaa, selamat ulang tahun yaa sayanggg 🥹❤️ Semoga di umur kamu yang baru ini, semua hal yang kamu pengenin dan rencanain bisa satu-satu tercapai. Semoga hal-hal kecil yang bikin kamu seneng juga makin sering datang ke kamu 🫶🏻✨",
    "Aku mungkin nggak selalu jago buat ngomong atau ngerangkai kata-kata, tapi aku mau kamu tahu kalau aku bersyukur banget bisa punya kamu. Kehadiran kamu bikin hari-hari biasa jadi terasa lebih seru, lebih ringan, dan tentunya lebih berarti. Makasih yaa udah jadi tempat aku cerita, tempat aku nyaman, dan tempat aku pulang ❤️",
    "Semoga tahun ini kamu selalu sehat, selalu bahagia, dan jangan lupa buat lebih sayang sama diri kamu sendiri. Semoga kamu juga selalu dikelilingi orang-orang yang tulus sayang dan peduli sama kamu. Dan salah satunya adalah aku, yang bakal terus belajar buat jadi lebih baik dan lebih ngerti kamu setiap harinya 🥹❤️",
    "Pokoknya, aku selalu bangga sama kamu, dalam keadaan apa pun. Makasih udah jadi kamu yang aku kenal sampai sekarang. Semoga kita masih bisa terus jalan bareng, bikin banyak cerita, dan ngerayain ulang tahun kamu lagi di tahun-tahun berikutnya 🫶🏻❤️"
  ],
  signoff: "— dari orang yang selalu bangga sama kamu dan sayang banget sama kamu ❤️",

  // cerita perjalanan kalian, urut dari paling lama. Tambah/kurangi item sesuka kamu.
  milestones: [
    { date: "Agustus 2024", title: "Pertama kali kenal", desc: "Aku masih inget banget dulu kita kenal dari LINE People Nearby wkwkwk 😭. Lucu juga ya kalau sekarang diinget-inget lagi 😂. Awalnya kita cuma iseng kenal-kenalan, nggak ada niatan apa-apa juga. Tapi entah kenapa waktu itu aku ngerasa cocok aja sama kamu 🥹❤️, padahal sebenarnya nggak ada alasan khusus juga.<br><br>Makin sering ngobrol, malah makin nyaman. Dari yang awalnya cuma sekadar kenal, jadi sering cerita, sering ngobrol, sampai akhirnya bisa sejauh ini sama kamu 🥹🫶🏻.<br><br>Kalau dipikir-pikir lagi, ternyata dari sesuatu yang sesimpel itu aku bisa ketemu sama seseorang yang sekarang punya arti besar banget buat aku ❤️. Siapa sangka, dari LINE People Nearby malah bisa jadi awal dari cerita kita sampai sekarang wkwkwk 😭❤️." },
    { date: "12 Oktober 2024", title: "Hal pertama yang paling berkesan", desc: "Hal pertama yang paling berkesan buat aku waktu itu tanggal 12 Oktober 2024 🥹❤️. Tepatnya hari Sabtu, aku berangkat dari Probolinggo setelah pulang magang 🏍️💨. Saat itu aku bener-bener baru pertama kali pergi ke Surabaya naik motor sendirian 😭. Rasanya campur aduk banget, antara senang, deg-degan, dan bingung harus lewat jalan mana wkwkwk 😭😂.<br><br>Sampai akhirnya, untuk pertama kalinya aku jemput dan ketemu kamu di Asrama Blok J ITS 🥹❤️. Dari situ kita naik motor, muter-muter keliling Surabaya 🏍️🌆, dan kamu sambil ngenalin aku nama jalan-jalan yang ada di Surabaya 🥰.<br><br>Terus di hari itu juga aku akhirnya memberanikan diri buat bilang kalau aku suka sama kamu dan nembak kamu 🫣❤️. Tapi ternyata jawabannya nggak langsung hari itu wkwkwk 😭. Aku malah harus nunggu sampai besoknya, tanggal 13 Oktober, setelah aku pulang dari Surabaya 😭😂.<br><br>Dan ternyata pas aku pulang, kamu ngasih jawaban yang bikin aku seneng bangettt 🥹❤️. Nggak cuma itu, aku juga dikasih snack yang banyak banget sama kamu 🍫🍪🍬. Jadi rasanya perjalanan pulang waktu itu ditutup dengan sesuatu yang manis banget 🥹🫶🏻.<br><br>Mungkin kalau dipikir-pikir semuanya sederhana, tapi buat aku, momen itu benar-benar berkesan dan sampai sekarang masih aku inget ❤️. Karena dari perjalanan Probolinggo–Surabaya, ketemu kamu, muter-muter bareng, sampai akhirnya aku berani nembak kamu dan kamu bilang mauuu 🥹❤️, semuanya jadi awal dari cerita kita sampai sekarang 🫶🏻❤️." },
    { date: "15 Oktober 2024", title: "Resmi jadian", desc: "Resmi jadian tanggal 15 Oktober 2024. Hari itu juga jadi salah satu hari yang paling aku inget dan berkesan di dalam sepanjang hidupku, karena kita awal ketemu dan kamu ngajakin aku jalan-jalan ke Tunjungan. Terus kebetulan aku juga kasih kamu hadiah kecil-kecil versi anak Teknik yang dibuat dengan penuh effort dan cinta wkwkwkwk. Kalau diinget-inget cringe juga ternyataa 😭😭 tapi waktu itu aku bikinnya bener-bener dari hati dan agar kamu bisa dapet hadiah yang bedaa dari cewe lain dan ga semua cowo bisa ngasih hadiah kaya gitu.<br><br>Terus di hari itu aku akhirnya bilang kalau aku suka sama kamu dan ngajak kamu pacaran. Eh, kamu tanpa mikir panjang dulu, kamu malah spontan jawab “mauuu” 😭😭. Di situ aku langsung salting parah akwoaokwoa. Rasanya seneng bangettt, kayak nggak nyangka kamu beneran mau sama aku.<br><br>Pokoknya hari itu love bangettt buat aku. Dari awal ketemu, jalan-jalan bareng, kasih hadiah, sampai akhirnya kita resmi jadi kitaaa. Sayang bangettt sama kamuuu 🥹❤️" },
    { date: "", title: "Momen favorit kita", desc: "Salah satu momen kita yang paling berkesan buat aku itu waktu kita jalan-jalan ke Kayutangan. Di situ aku ngerasa seneng banget, karena kamu udah mau effort jauh-jauh dari Surabaya ke Malang cuma buat nyamperin aku. 🥹❤️<br><br>Makasih ya sayang, udah selalu ada dan nemenin aku di setiap proses yang aku lewatin. Apalagi ada satu momen yang sampai sekarang masih aku inget banget, waktu kamu nyamperin aku pas sempro, bahkan sampai dua kaliii 😭❤️. Terus kamu juga dateng waktu aku wisuda.<br><br>Dari hal-hal kecil sampai momen-momen penting itu, aku bener-bener ngerasa dicintai banget sama kamu. Rasanya seneng banget punya seseorang yang mau hadir dan nemenin aku di setiap proses. Makasih yaa sayang, udah selalu ada buat aku. Aku sayang banget sama kamuuu 🥹❤️" },
    { date: "SEKARANG", title: "Hari ini", desc: "Merayakan ulang tahunmu, dan bersyukur banget karena sampai hari ini aku masih bisa terus jalan bareng kamu. 🥹❤️<br><br>Dari awal kita kenal sampai sekarang, ternyata udah banyak banget cerita, tawa, dan momen yang kita lewatin bareng. Semoga ke depannya kita masih bisa terus nemenin satu sama lain, melewati banyak hal, dan bikin lebih banyak cerita lagi. 🫶🏻✨" }
  ],

  // alasan sayang — teaser tampil di depan kartu, full text muncul saat diklik/dibalik
  reasons: [
    { teaser: "Sabar", full: "Karena kamu selalu dengerin cerita panjangku dengan sabar, bahkan yang nggak penting sekalipun." },
    { teaser: "Tulus", full: "Karena caramu peduli itu tulus, nggak dibuat-buat, dan selalu terasa hangat." },
    { teaser: "Kuat", full: "Karena kamu tetap semangat menjalani hari, walau kadang capek dan nggak bilang-bilang." },
    { teaser: "Senyum", full: "Karena senyummu itu satu dari sedikit hal yang selalu berhasil bikin harianku lebih baik." },
    { teaser: "Tumbuh", full: "Karena kamu berusaha jadi versi terbaik dari dirimu, pelan-pelan, dan itu keren banget." },
    { teaser: "Rumah", full: "Karena bersamamu, aku belajar apa artinya benar-benar diperhatikan." }
  ],

  // foto kenangan — taruh file foto di folder "Foto", lalu tulis path-nya di "src".
  // Kalau belum ada fotonya, biarkan src kosong ("") supaya tampil placeholder dulu.
  photos: [
    { src: "Foto/1.jpg", caption: "momen 1" },
    { src: "Foto/2.jpg", caption: "momen 2" },
    { src: "Foto/3.jpg", caption: "momen 3" },
    { src: "Foto/4.jpeg", caption: "momen 4" },
    { src: "Foto/5.jpg", caption: "momen 5" },
    { src: "Foto/6.jpeg", caption: "momen 6" }
  ],

  // nomor WhatsApp kamu untuk menerima pesan harapan dari toples harapan.
  // Format internasional tanpa "+" / spasi / strip, contoh: 0812-3456-7890 -> "6281234567890"
  // Kalau dikosongkan, harapan cuma melayang di layar (tidak dikirim).
  whatsappNumber: "6285156357395",

  closingMessage: "Semoga umur panjang, sehat selalu, dan segala hal baik terus menghampiri kamu. Selamat ulang tahun, Arraya. Ditunggu tiup lilinnya."
};
