import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JamuService } from '../services/jamu.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  userName = 'Pengguna';
  greeting = 'Selamat pagi';
  streakDays = 7;

  heroJamu: any = { name: 'Kunyit Asam', benefit: 'Tingkatkan imun tubuh dan segarkan badanmu', image: '' };
  categories: string[] = [
    'Tambah Stamina', 'Imun Tubuh', 'Pencernaan Lancar', 'Hilangkan Pegal', 'Atasi Pilek', 
    'Kecantikan & Perawatan Kulit', 'Pelangsing / Turun Berat Badan', 
    'Detoks & Membersihkan Darah', 'Nafsu Makan & Anak', 'Kesehatan Jantung & Tekanan Darah'
  ];

  // Data Lokal
  recommendedJamu: any[] = [
    { name: 'Kencur', benefit: 'Menghilangkan pegal-pegal', image: 'assets/images/kencur.png' },
    { name: 'Temulawak', benefit: 'Penambah nafsu makan', image: 'assets/images/temulawak.jpg' },
    { name: 'Jahe', benefit: 'Menghangatkan dan menyegarkan', image: 'assets/images/jahe.jpg' },
    { name: 'Kunyit', benefit: 'Meningkatkan imun tubuh', image: 'assets/images/kunyit.jpg' },
    { name: 'Kayu Manis', benefit: 'Menjaga kadar gula darah', image: 'assets/images/kayu_manis.jpg' },
    { name: 'Daun Jambu', benefit: 'Mengatasi masalah pencernaan', image: 'assets/images/daun_jambu.jpg' }
  ];
  popularJamu: any[] = [
    { name: 'Kunyit Asam', benefit: 'Detoks & Pereda Nyeri Haid', image: 'assets/images/kunyit_asam.jpg' },
    { name: 'Sambiloto', benefit: 'Turunkan Gula Darah', image: 'assets/images/sambiloto.jpg' },
    { name: 'Pahitan', benefit: 'Bersihkan Darah', image: 'assets/images/pahitan.jpg' },
    { name: 'Kudu Laos', benefit: 'Redakan Hipertensi', image: 'assets/images/kudulaos.jpg' }
  ];

  isLoading = false;

  constructor(
    private jamuService: JamuService,
    private authService: AuthService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.userName = this.authService.getUserName();
    this.authService.initStreak();
    this.streakDays = this.authService.getStreak();
    this.setGreeting();
  }

  setGreeting() {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) {
      this.greeting = 'Selamat pagi';
    } else if (hour >= 11 && hour < 15) {
      this.greeting = 'Selamat siang';
    } else if (hour >= 15 && hour < 18) {
      this.greeting = 'Selamat sore';
    } else {
      this.greeting = 'Selamat malam';
    }
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(event?: any) {
    this.isLoading = true;
    this.jamuService.getHomeData().subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.recommended && res.recommended.length > 0) {
          this.recommendedJamu = res.recommended;
          this.heroJamu = this.recommendedJamu[0];
        }
        if (res.popular && res.popular.length > 0) {
          this.popularJamu = this.shuffleArray(res.popular);
        }
        if (event) event.target.complete();
      },
      error: (err) => {
        this.isLoading = false;
        console.warn('Mode Offline aktif.');
        this.popularJamu = this.shuffleArray(this.popularJamu);
        if (event) event.target.complete();
      }
    });
  }

  doRefresh(event: any) {
    this.loadData(event);
  }

  shuffleArray(array: any[]) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  onSearch(event: any) {
    const query = event.target.value?.toLowerCase() || '';
    if (query) {
      this.router.navigate(['/tabs/jamu'], { queryParams: { q: query } });
      event.target.value = '';
    }
  }

  filterKategori(kategori: string) {
    this.router.navigate(['/tabs/resep'], { queryParams: { kategori: kategori } });
  }

  goToDetail(item: any) {
    this.router.navigate(['/tabs/jamu'], { queryParams: { q: item.name } });
  }

  lihatDetail() {
    this.router.navigate(['/tabs/jamu'], { queryParams: { q: this.heroJamu.name } });
  }

  setPengingat() {
    this.router.navigate(['/tabs/pengingat']);
  }

  openVideo(link: string) {
    window.open(link, '_blank');
  }
}
