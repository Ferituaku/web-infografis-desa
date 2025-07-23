import { Poster } from "../types";

// Data poster menggunakan path gambar lokal dari direktori /public.
// ThumbnailPath dan imagePath sekarang menggunakan file yang sama,
// dan ukuran diatur oleh komponen Card dan Modal.
export const posterData: Poster[] = [
  {
    id: 1,
    title: "Siaga Bencana Mulai Dari Warga",
    shortDescription: "Fakta kesiapsiagaan warga dan tips siaga bencana.",
    longDescription:
      "Infografis ini menyajikan data kesiapsiagaan warga dalam menghadapi bencana. Mencakup statistik mengenai pengetahuan, rencana evakuasi, dan partisipasi dalam pelatihan. Juga dilengkapi dengan tips praktis seperti menyiapkan tas siaga darurat dan menyimpan nomor penting.",
    imagePath: "/posters/infografis_siagabencana.jpg",
    thumbnailPath: "/posters/infografis_siagabencana.jpg",
  },
  {
    id: 2,
    title: "Panduan Kesiapsiagaan Bencana",
    shortDescription: "Panduan visual untuk menghadapi keadaan darurat.",
    longDescription:
      "Poster ini adalah sebuah infografis dalam bahasa Jepang yang secara spesifik membahas kesiapsiagaan dan pencegahan bencana kebakaran. Dengan judul 'Cahaya Api, Cahaya Aksi', infografis ini menyajikan berbagai informasi penting, mulai dari data statistik perbandingan penyebab kebakaran antara tahun 2023 dan 2024, hingga peta visual yang menunjukkan tingkat risiko kebakaran di suatu wilayah (disebutkan area Denpasar). Selain itu, dibahas pula mengenai dasar hukum penanggulangan bencana dan peran berbagai pihak. Secara keseluruhan, materi ini ditujukan untuk mengedukasi komunitas Jepang, kemungkinan yang tinggal di Indonesia, agar lebih waspada terhadap bahaya kebakaran.",
    imagePath: "/posters/infografis_siagabencana_jepang.jpg",
    thumbnailPath: "/posters/infografis_siagabencana_jepang.jpg",
  },
];
