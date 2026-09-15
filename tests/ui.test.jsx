// @vitest-environment jsdom
import React from 'react';
import {test,expect,afterEach} from 'vitest';
import {render,screen,fireEvent,cleanup,within} from '@testing-library/react';
import App from '../src/main';
afterEach(()=>{cleanup();localStorage.clear()});
const click=(name)=>fireEvent.click(screen.getByRole('button',{name,exact:true}));
const fill=(label,value)=>fireEvent.change(screen.getByLabelText(label,{exact:true}),{target:{value}});
test('teacher completes meeting attendance journal assessment and subject isolation',async()=>{
 render(<App/>);click('Coba versi demo');click('Pertemuan baru');
 fill('Materi / topik pertemuan','Pecahan senilai');click('Simpan');
 await screen.findByRole('button',{name:'Simpan absensi'});
 click('Aditya Pratama: Izin');click('Isi yang kosong: hadir');click('Simpan absensi');
 await screen.findByText('Absen tersimpan sesuai pertemuan ini');
 click('Jurnal');fill('Tujuan pembelajaran (TP)','Siswa menjelaskan pecahan senilai.');fill('Memahami','Mengamati potongan kertas.');click('Simpan jurnal');
 fireEvent.click(within(screen.getByRole('navigation')).getByRole('button',{name:'Penilaian',exact:true}));click('Tambah asesmen');fill('Nama asesmen','Latihan pecahan');fill('Nilai Aditya Pratama','0');fill('Ketercapaian Aditya Pratama','Perlu bimbingan');click('Simpan penilaian');
 click('Laporan');expect(screen.getByText(/Latihan pecahan · Formatif ·/)).toBeTruthy();
 const attendanceTable=screen.getAllByRole('table')[0];const studentRow=within(attendanceTable).getByText('Aditya Pratama').closest('tr');expect(within(studentRow).getAllByRole('cell').map(x=>x.textContent)).toEqual(['Aditya Pratama','0','0','1','0','0','0%']);
 expect(screen.getAllByText('Siswa menjelaskan pecahan senilai.')).toHaveLength(2);
 fill('Pilih mapel','s2');expect(screen.getByText('Belum ada data laporan')).toBeTruthy();
 click('Pertemuan & absen');click('Pertemuan baru');fill('Materi / topik pertemuan','Membaca cerita');click('Simpan');await screen.findByRole('button',{name:'Simpan absensi'});expect(screen.getByRole('button',{name:'Aditya Pratama: Izin'}).getAttribute('aria-pressed')).toBe('false');
 click('Isi yang kosong: hadir');click('Simpan absensi');await screen.findByText('Absen tersimpan sesuai pertemuan ini');
 cleanup();render(<App/>);click('Coba versi demo');click('Laporan');expect(screen.getByRole('heading',{name:/Pecahan senilai/})).toBeTruthy();
});
test('teacher can add SMK class and assign one subject to multiple classes',async()=>{
 render(<App/>);click('Coba versi demo');click('Kelas & siswa');click('Tambah kelas');fill('Nama kelas','X TKJ');fill('Jenjang','SMK');fill('Fase','E');click('Simpan');await screen.findByRole('option',{name:'X TKJ · SMK'});
 click('Tambah siswa');fill('Nama siswa','Siswa Uji');fill('NIS / nomor induk (opsional)','0001');click('Simpan');await screen.findByText('Siswa Uji');
 click('Tambah mapel');fill('Nama mata pelajaran','Informatika');fireEvent.click(screen.getByLabelText('IV A · SD'));click('Simpan');await screen.findByRole('option',{name:'Informatika'});
 fill('Pilih kelas','c1');expect(screen.getByRole('option',{name:'Informatika'})).toBeTruthy();
});




