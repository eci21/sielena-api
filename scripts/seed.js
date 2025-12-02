// scripts/seed.js
require("dotenv").config();
const { connectDB } = require("../src/config/db");
const Material = require("../src/models/Material");
const Video = require("../src/models/Video");
const Quiz = require("../src/models/Quiz");

async function seed() {
  await connectDB();

  console.log("Hapus data lama...");
  await Material.deleteMany({});
  await Video.deleteMany({});
  await Quiz.deleteMany({});

  console.log("Isi data MATERIALS...");

  await Material.insertMany([
    {
      title: "Pengenalan Pemilu",
      items: [
        "Pengertian Pemilu dan Pemilihan",
        "Tujuan Pemilu dalam Negara Demokrasi",
        "Asas LUBER dan JURDIL",
        "Lembaga Penyelenggara Pemilu (KPU, Bawaslu, DKPP)"
      ]
    },
    {
      title: "Pemilih Pemula",
      items: [
        "Siapa yang disebut Pemilih Pemula?",
        "Syarat menjadi pemilih (umur, administrasi kependudukan)",
        "Hak dan Kewajiban Pemilih",
        "Peran Pemilih Muda dalam Demokrasi"
      ]
    },
    {
      title: "Alur di TPS pada Hari Pemungutan Suara",
      items: [
        "Mendaftar dan mengisi daftar hadir di TPS",
        "Menerima surat suara dan pengecekan identitas",
        "Masuk bilik suara dan mencoblos",
        "Memasukkan surat suara ke kotak suara",
        "Pencelupan jari ke tinta sebagai tanda sudah memilih"
      ]
    },
    {
      title: "Anti Hoaks dan Literasi Digital",
      items: [
        "Mengenal ciri-ciri berita hoaks",
        "Cara mengecek kebenaran informasi",
        "Pentingnya mengecek sumber resmi (KPU, Bawaslu, dll.)",
        "Etika bermedia sosial jelang pemilu"
      ]
    }
  ]);

  console.log("Isi data VIDEOS...");

  await Video.insertMany([
    {
      title: "Hak & Kewajiban Pemilih",
      duration: "3:20",
      url: "https://www.youtube.com/embed/aqz-KE-bpKQ"
    },
    {
      title: "Alur Pemungutan Suara di TPS",
      duration: "4:05",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      title: "Peran Pemilih Muda dalam Demokrasi",
      duration: "5:10",
      url: "https://www.youtube.com/embed/2vjPBrBU-TM"
    },
    {
      title: "Mengenali dan Menangkal Hoaks Pemilu",
      duration: "4:30",
      url: "https://www.youtube.com/embed/oHg5SJYRHA0"
    }
  ]);

  console.log("Isi data QUIZZES (dengan soal)...");

  await Quiz.insertMany([
    {
      name: "Dasar Pemilih Pemula",
      questions: [
        {
          text: "Yang dimaksud dengan pemilu adalah...",
          options: [
            "Proses memilih wakil rakyat dan pemimpin secara berkala",
            "Proses pengangkatan pejabat oleh pemerintah",
            "Kegiatan kampanye di media sosial",
            "Kegiatan musyawarah di lingkungan RT"
          ],
          correctIndex: 0
        },
        {
          text: "Lembaga penyelenggara pemilu di Indonesia adalah...",
          options: [
            "KPU, Bawaslu, dan DKPP",
            "DPR, DPD, dan MPR",
            "MA, MK, dan KY",
            "Presiden dan Wakil Presiden"
          ],
          correctIndex: 0
        },
        {
          text: "Asas LUBER dalam pemilu berarti...",
          options: [
            "Langsung, Umum, Bebas, Rahasia",
            "Lugas, Umum, Bersih, Rapi",
            "Lancar, Umum, Berkala, Resmi",
            "Lengkap, Umum, Bebas, Resmi"
          ],
          correctIndex: 0
        },
        {
          text: "Pemilih pemula adalah warga negara yang...",
          options: [
            "Baru pertama kali ikut pemilu dan berusia minimal 17 tahun",
            "Baru pindah domisili",
            "Belum memiliki KTP-el",
            "Sudah menikah dan berusia di atas 30 tahun"
          ],
          correctIndex: 0
        },
        {
          text: "Hak utama pemilih dalam pemilu adalah...",
          options: [
            "Memilih dan dipilih sesuai ketentuan",
            "Mengatur jadwal kampanye",
            "Menentukan hari libur nasional",
            "Menetapkan hasil pemilu"
          ],
          correctIndex: 0
        }
      ]
    },
    {
      name: "Alur di TPS",
      questions: [
        {
          text: "Langkah pertama saat tiba di TPS adalah...",
          options: [
            "Mengisi daftar hadir dan menunjukkan identitas",
            "Langsung masuk ke bilik suara",
            "Mencelupkan jari ke tinta",
            "Mengambil surat suara tanpa proses apapun"
          ],
          correctIndex: 0
        },
        {
          text: "Setelah menerima surat suara, pemilih harus...",
          options: [
            "Mencoblos di bilik suara yang disediakan",
            "Mencoblos di luar TPS",
            "Memberikan surat suara ke orang lain",
            "Mencoret semua nama calon"
          ],
          correctIndex: 0
        },
        {
          text: "Setelah mencoblos, surat suara yang sudah diisi harus...",
          options: [
            "Dilipat dan dimasukkan ke kotak suara",
            "Dibawa pulang sebagai bukti",
            "Diberikan ke tetangga",
            "Dibuang ke tempat sampah"
          ],
          correctIndex: 0
        },
        {
          text: "Tanda bahwa seseorang sudah menggunakan hak pilih di TPS adalah...",
          options: [
            "Jari dicelupkan ke tinta",
            "Mendapat stiker khusus",
            "Mendapat kaos gratis",
            "Difoto oleh KPPS"
          ],
          correctIndex: 0
        },
        {
          text: "Petugas yang melayani pemilih di TPS disebut...",
          options: [
            "KPPS",
            "Bawaslu",
            "Panwascam",
            "Saksi"
          ],
          correctIndex: 0
        }
      ]
    },
    {
      name: "Anti Hoaks Pemilu",
      questions: [
        {
          text: "Hoaks adalah...",
          options: [
            "Informasi yang tidak benar atau sengaja disesatkan",
            "Informasi resmi dari KPU",
            "Berita yang sudah dipastikan kebenarannya",
            "Pengumuman hasil resmi penghitungan suara"
          ],
          correctIndex: 0
        },
        {
          text: "Langkah pertama untuk mengecek kebenaran informasi adalah...",
          options: [
            "Mengecek sumber resmi dan membandingkan dengan media kredibel",
            "Langsung menyebarkan ke grup WhatsApp",
            "Mempercayai karena dikirim teman dekat",
            "Mengira-ngira sendiri tanpa mencari tahu"
          ],
          correctIndex: 0
        },
        {
          text: "Contoh sumber resmi informasi kepemiluan adalah...",
          options: [
            "Website dan media sosial resmi KPU",
            "Akun anonim di media sosial",
            "Broadcast tanpa identitas",
            "Komentar di kolom postingan"
          ],
          correctIndex: 0
        },
        {
          text: "Sikap yang tepat jika menerima pesan mencurigakan tentang pemilu adalah...",
          options: [
            "Tidak langsung percaya dan melakukan cek fakta",
            "Langsung marah di media sosial",
            "Menyebarkan agar cepat viral",
            "Mengedit isi pesan lalu menyebarkan lagi"
          ],
          correctIndex: 0
        },
        {
          text: "Mengapa pemilih muda harus peduli pada hoaks?",
          options: [
            "Karena hoaks bisa memecah belah dan mempengaruhi pilihan secara tidak sehat",
            "Karena hoaks selalu lucu",
            "Karena hoaks wajib disebarkan",
            "Karena hoaks adalah sumber informasi utama"
          ],
          correctIndex: 0
        }
      ]
    }
  ]);

  console.log("SEED DATA SELESAI ✅");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed gagal:", err);
  process.exit(1);
});
