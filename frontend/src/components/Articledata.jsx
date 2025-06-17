import gempa from '../img/img_bantuan_korban_gempa.jpeg'
import longsor from "../img/longsor.jpeg"
import bangunan from '../img/img_bantuan_donasi_pembangunan.jpeg'
const placeholderImg = 'https://placehold.co/800x400?text=Artikel';

export const articleData = [
  {
    id: 1,
    slug: 'perkembangan-donasi-banjir',
    title: 'Perkembangan Donasi untuk Korban Banjir',
    image: gempa,
    date: '02 - 10 - 2025',
    content: `
      <p>Terima kasih kepada para donatur yang mulia. Berkat bantuan Anda, kami telah berhasil menyalurkan bantuan tahap pertama kepada para korban banjir di wilayah Jabodetabek. Bantuan berupa makanan siap saji, air bersih, dan selimut telah diterima oleh lebih dari 500 keluarga.</p>
      <p>Proses evakuasi masih terus berlanjut dan kami masih membutuhkan uluran tangan Anda untuk membantu saudara-saudara kita yang lain. Setiap donasi, sekecil apapun, akan sangat berarti bagi mereka. Mari bersama-sama kita ringankan beban mereka.</p>
    `
  },
  {
    id: 2,
    slug: 'perkembangan-donasi-longsor',
    title: 'Update Penyaluran Bantuan Korban Longsor',
    image: longsor,
    date: '01 - 07 - 2025',
    content: `
      <p>Bantuan untuk korban longsor di Cianjur telah sampai ke lokasi. Tim relawan kami di lapangan telah mendistribusikan tenda darurat, obat-obatan, dan perlengkapan bayi kepada warga yang terdampak.</p>
      <p>Saat ini, fokus utama adalah pada penyediaan hunian sementara dan pemulihan trauma bagi anak-anak. Kami membuka kesempatan bagi para profesional untuk bergabung sebagai relawan psikososial. Bantuan Anda sangat kami harapkan.</p>
    `
  },
  {
    id: 3,
    slug: 'perkembangan-donasi-gempa',
    title: 'Laporan Perkembangan Bantuan Gempa Bumi',
    image: bangunan,
    date: '27 - 10 - 2025',
    content: `
      <p>Gempa bumi yang melanda wilayah selatan Jawa telah meninggalkan duka yang mendalam. Namun, di tengah kesulitan, semangat gotong royong masyarakat Indonesia sungguh luar biasa. Total donasi yang terkumpul telah mencapai 80% dari target.</p>
      <p>Dana tersebut telah kami gunakan untuk membangun dapur umum, memperbaiki fasilitas air bersih, dan memberikan bantuan medis darurat. Perjuangan masih panjang, dan kami akan terus memberikan laporan transparan mengenai penggunaan dana donasi.</p>
    `
  }
];