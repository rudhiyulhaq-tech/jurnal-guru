# Konfigurasi Firebase proyek ini

Project ID: jurnal-guru-3e9a7

Konfigurasi web telah dipasang pada file .env lokal. File tersebut sengaja tidak masuk Git maupun ZIP source. Build web terbaru menggunakan konfigurasi proyek ini. Analytics tidak diaktifkan; measurementId belum diperlukan oleh aplikasi.

Untuk GitHub Actions, isi Settings → Secrets and variables → Actions → Variables dengan keenam VITE_FIREBASE_* sesuai .env.example dan konfigurasi Firebase Anda. Source yang diunduh akan berjalan sebagai demo sampai .env dibuat atau variabel build diisi.

Langkah console yang masih perlu dipastikan:
1. Aktifkan Authentication → Email/Password, lalu buat akun guru.
2. Buat Cloud Firestore database (default).
3. Buat dokumen allowedUsers/{UID_AKUN_GURU}, dengan field enabled bertipe boolean bernilai true.
4. Terbitkan firestore.rules bersama Hosting menggunakan Firebase CLI setelah login.

Memasang konfigurasi bukan bukti bahwa login, izin database, atau hosting sudah aktif. Pengujian akun dan deployment belum dilakukan.
