# Status validasi versi 0.1.0

## Berhasil

- Build produksi web (`npm run build`).
- 5 pengujian domain: rekap kehadiran, belum diisi vs alpa, keanggotaan per pertemuan, nilai kosong vs nol, batas 0–100, CSV, dan validasi pertemuan.
- 2 pengujian alur React dalam DOM simulasi: pertemuan → absen → jurnal → asesmen → laporan → pemisahan mapel → buka kembali data; tambah kelas SMK → siswa → mapel lintas kelas.
- Sinkronisasi aset web ke proyek Android Capacitor.
- Server pratinjau lokal mengembalikan HTTP 200 dengan halaman Ruang Guru.

## Batas pemeriksaan

- Pemeriksaan visual browser belum berhasil: browser bawaan Codex gagal memasang tab pratinjau. Tes DOM tidak menggantikan pemeriksaan visual/responsif.
- Firebase Authentication, Firestore, dan aturan akses sudah disiapkan di source, tetapi belum diuji terhadap proyek Firebase pengguna karena proyek belum tersedia.
- Belum ada unggahan GitHub atau publikasi Firebase Hosting.
- Cetak/berbagi laporan Android dan instalasi APK masih perlu dicoba di HP fisik.
- Paket web sekitar 954 KB JavaScript sebelum gzip (sekitar 254 KB sesudah gzip); masih dapat dioptimalkan setelah uji coba.

## Status APK

APK belum dihasilkan. Build standar mencapai tahap kompilasi Java lalu gagal karena `java.nio.file.AccessDeniedException` saat SDK JAR menjalankan `toRealPath` pada lingkungan Windows terbatas ini. File dapat dibaca, tetapi pemeriksaan nama folder induknya tetap ditolak meskipun izin baca tambahan telah diberikan. Percobaan classpath direktori tidak menyelesaikan masalah dan tidak diterapkan pada source aplikasi.

Proyek Android native dan workflow GitHub tetap disertakan. Gunakan workflow GitHub Actions atau Android Studio di lingkungan dengan akses SDK normal untuk membuat APK. Kode plugin Android belum terverifikasi melalui kompilasi penuh atau HP fisik.
