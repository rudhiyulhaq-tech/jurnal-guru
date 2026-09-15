# Ruang Guru

Aplikasi pribadi guru untuk web dan Android. React + Vite, Firebase Authentication, Cloud Firestore, dan Capacitor 7. Nama aplikasi masih dapat diganti.

## Menjalankan uji coba

1. Pasang Node.js 22.
2. Buka terminal di folder proyek ini.
3. Jalankan `npm ci`, `npm run build`, lalu `npm run preview`. Pada Windows Anda juga dapat menjalankan `MULAI.cmd`.
4. Buka alamat yang ditampilkan dan pilih **Coba versi demo**.

Mode demo menggunakan data fiktif dan localStorage perangkat. Data demo tidak diunggah atau dimigrasikan otomatis ke Firebase. Jika data browser dihapus, data demo ikut hilang. Jangan gunakan mode demo sebagai penyimpanan utama data sekolah.

## Fitur versi awal

- Jenjang SD, SMP, SMA, SMK; fase A–F dapat dipilih guru.
- Beberapa kelas dan mapel per guru; satu mapel dapat ditautkan ke banyak kelas.
- Data siswa satu kali per kelas; tambah/edit siswa, kelas, dan mapel.
- Pertemuan berdasarkan kelas, mapel, tanggal, jam, tahun ajaran, dan semester.
- Snapshot daftar siswa setiap pertemuan, sehingga perubahan daftar/nama tidak mengubah arsip.
- Absensi Hadir/Sakit/Izin/Alpa, catatan, serta status belum diisi yang terpisah.
- Jurnal CP, TP, kriteria ketercapaian, memahami, mengaplikasi, merefleksi, prinsip pembelajaran mendalam, refleksi guru, dan tindak lanjut.
- Beberapa asesmen awal, formatif, dan sumatif dalam satu pertemuan; rubrik, nilai opsional 0–100, ketercapaian, dan umpan balik.
- Laporan per kelas/mapel/semester/rentang tanggal, ekspor CSV, dan cetak/PDF melalui browser.

Nilai dan tingkat ketercapaian diisi guru, tidak dihitung dengan ambang kelulusan seragam. Aplikasi bukan generator CP resmi atau e-rapor resmi. CP/TP/rubrik harus dicocokkan dengan dokumen sekolah dan mata pelajaran. Fase tidak dipaksakan otomatis agar kebutuhan sekolah dapat disesuaikan.

## Menghubungkan Firebase

1. Buat proyek Firebase dan daftarkan aplikasi **Web**.
2. Aktifkan Authentication → Email/Password. Buat akun guru secara manual di Firebase Console.
3. Buat database Cloud Firestore.
4. Di Firestore, buat collection `allowedUsers` dengan document ID UID akun guru dari Authentication. Tambahkan field `enabled: true` agar dokumen tersimpan. Aturan akses memeriksa keberadaan dokumen UID; hanya admin console yang dapat membuatnya.
5. Salin `.env.example` menjadi `.env`, lalu isi nilai konfigurasi web Firebase. Jangan menyimpan private key/service account di source.
6. Jalankan `npm run build` untuk membangun ulang aplikasi.
7. Dengan Firebase CLI: `firebase login`, lalu `firebase deploy --project ID_PROYEK --only hosting,firestore:rules`.
8. Masuk menggunakan email/password akun guru. Data setiap akun disimpan di `users/{uid}/records/{id}`.

File `.env` diabaikan Git. Konfigurasi Firebase web memang masuk ke bundle frontend; perlindungan data ada pada Authentication dan Firestore Rules. Jangan mengganti rules dengan akses publik. Tidak ada formulir registrasi terbuka.

Koneksi cloud sudah diimplementasikan, tetapi pengujian online dan pengujian rules dengan proyek nyata menunggu proyek Firebase pengguna. Pada versi awal, hindari mengedit pertemuan yang sama secara bersamaan di dua perangkat; penyimpanan terakhir berlaku. Satu dokumen per pertemuan cocok untuk uji coba pribadi, belum untuk volume data sekolah besar.

## GitHub

Buat repository privat kosong, kemudian unggah semua file source termasuk folder `android`, lockfile, dan `.github`. Jangan unggah `node_modules`, `dist`, `.env`, kunci penandatanganan, atau `android/local.properties`.

Workflow `.github/workflows/build.yml` menyiapkan build web dan APK debug. Jalankan dari tab Actions setelah source diunggah. Untuk mode cloud, isi Repository Variables `VITE_FIREBASE_*` sesuai `.env.example`. Tanpa variabel tersebut, build berjalan dalam mode demo. Workflow ini menyiapkan artifacts; tidak menerbitkan ke hosting otomatis.

## Android

**Status saat penyerahan:** proyek Android sudah dibuat, tetapi belum ada file APK karena kompilasi Java terhalang pembatasan akses SDK pada lingkungan Windows ini. Rincian ada di VALIDASI.md. Workflow GitHub dapat digunakan setelah repository tersedia.

Proyek menggunakan Capacitor 7, JDK 21, Android SDK Platform 35 dan Build Tools 34.0.0 (default AGP 8.7.2). Pasang Android Studio untuk toolchain tersebut.

```sh
npm ci
npm run build
npx cap sync android
npx cap open android
```

Di Android Studio pilih Build APK, atau jalankan `android/gradlew assembleDebug` dari folder android. APK debug dihasilkan di `android/app/build/outputs/apk/debug/app-debug.apk`. Untuk Windows gunakan `gradlew.bat assembleDebug`.

APK debug untuk pengujian pribadi. APK rilis memerlukan keystore pribadi yang harus disimpan aman oleh pemilik aplikasi. Ekspor CSV Android menggunakan dialog berbagi native melalui FileProvider; cetak menggunakan Android PrintManager. Keduanya masih memerlukan verifikasi pada perangkat Android fisik sebelum distribusi luas.

## Validasi

`npm test` memeriksa perhitungan absensi, snapshot keanggotaan, nilai kosong vs nol, batas nilai, validasi pertemuan, dan CSV. `npm run build` menghasilkan folder dist. Hasil pengujian antarmuka dicatat dalam `VALIDASI.md`.

## Acuan

- https://kurikulum.kemendikdasmen.go.id/pembelajaran-mendalam
- https://pskp.kemendikdasmen.go.id/kabar/detail/pskp-gelar-diskusi-luruskan-miskonsepsi-pembelajaran-mendalam
- https://firebase.google.com/docs/hosting
- https://firebase.google.com/docs/firestore/security/get-started
- https://capacitorjs.com/docs/v7/android

Pendekatan jurnal mengacu prinsip berkesadaran, bermakna, menggembirakan dan pengalaman memahami, mengaplikasi, merefleksi. Pengalaman tersebut boleh disusun lintas pertemuan; tidak diwajibkan selesai seluruhnya dalam satu pertemuan.


