// DATA MATERI
let materials = [
  {
    id: 1,
    title: "Pengenalan Pemilu",
    items: [
      "Apa itu Pemilu & Pemilihan",
      "Asas LUBER JURDIL",
      "Penyelenggara Pemilu"
    ]
  },
  {
    id: 2,
    title: "Pemilih Pemula",
    items: [
      "Hak & Kewajiban",
      "Cerdas Memilih",
      "Anti Hoaks"
    ]
  }
];

// DATA VIDEO
// DATA VIDEO (PAKAI LINK LUAR)
let videos = [
  { 
    id: 1,
    title: "Hak & Kewajiban Pemilih",
    duration: "3:20",
    url: "https://drive.google.com/file/d/1G1xg6AtxkapM80TVMfX-sZZlVSotasbB/view?usp=sharing"
  },
  { 
    id: 2,
    title: "Alur di TPS",
    duration: "4:05",
    url: "https://www.youtube.com/embed/aqz-KE-bpKQ"
  },
  { 
    id: 3,
    title: "Anti Hoaks",
    duration: "5:10",
    url: "https://www.youtube.com/embed/2vjPBrBU-TM"
  }
];

// DATA PAKET KUIS
let quizzes = [
  { id: 1, name: "Dasar Pemilih Pemula", questions: 10 },
  { id: 2, name: "Alur di TPS", questions: 8 }
];

// DATA SESI KUIS
let quizSessions = [];

// DATA NILAI PESERTA
let quizResults = [];

// ID Generator
function id(prefix = "") {
  return prefix + Math.random().toString(36).substr(2, 8);
}

module.exports = {
  materials,
  videos,
  quizzes,
  quizSessions,
  quizResults,
  id
};
