import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jamu',
  templateUrl: './jamu.page.html',
  styleUrls: ['./jamu.page.scss'],
  standalone: false,
})
export class JamuPage implements OnInit {

  isLoading: boolean = true;
  searchQuery: string = '';
  selectedJamu: any = null;
  showModal: boolean = false;
  showOnlyFavorites: boolean = false;
  favorites: string[] = [];

  jamuList: any[] = [
    { name: 'Kunyit', khasiat: 'anti-radang, maag, kesehatan kulit', image: 'assets/images/kunyit.jpg' },
    { name: 'Jahe', khasiat: 'menghangatkan tubuh, masuk angin, batuk', image: 'assets/images/jahe.jpg' },
    { name: 'Kencur', khasiat: 'batuk, pegal, meningkatkan nafsu makan', image: 'assets/images/kencur.png' },
    { name: 'Temulawak', khasiat: 'meningkatkan nafsu makan, kesehatan hati', image: 'assets/images/temulawak.jpg' },
    { name: 'Temu kunci', khasiat: 'pencernaan, antibakteri', image: 'assets/images/temukunci.jpg' },
    { name: 'Temu ireng', khasiat: 'cacingan, meningkatkan nafsu makan', image: 'assets/images/temuireng.jpg' },
    { name: 'Lengkuas (Laos)', khasiat: 'antioksidan, pencernaan', image: 'assets/images/lengkuas.jpg' },
    { name: 'Lempuyang', khasiat: 'pegal linu, meningkatkan stamina', image: 'assets/images/lempuyang.jpg' },
    { name: 'Bangle', khasiat: 'demam, sakit kepala', image: 'assets/images/bangle.jpg' },
    { name: 'Kunyit putih', khasiat: 'tumor, antioksidan', image: 'assets/images/kunyit_putih.jpg' },
    { name: 'Daun sirih', khasiat: 'antiseptik, kesehatan mulut', image: 'assets/images/daun_sirih.jpg' },
    { name: 'Daun jambu biji', khasiat: 'diare', image: 'assets/images/daun_jambu.jpg' },
    { name: 'Daun sambiloto', khasiat: 'imun, demam, menurunkan gula darah', image: 'assets/images/sambiloto.jpg' },
    { name: 'Daun kumis kucing', khasiat: 'batu ginjal, saluran kemih', image: 'assets/images/daun_kumis_kucing.jpg' },
    { name: 'Daun meniran', khasiat: 'meningkatkan imun', image: 'assets/images/daun_meniran.jpg' },
    { name: 'Daun pegagan', khasiat: 'daya ingat, luka', image: 'assets/images/daun_pegagan.jpg' },
    { name: 'Daun kelor', khasiat: 'nutrisi tinggi, anemia', image: 'assets/images/daun_kelor.jpg' },
    { name: 'Daun salam', khasiat: 'kolesterol, diabetes', image: 'assets/images/daun_salam.jpg' },
    { name: 'Daun binahong', khasiat: 'luka, stamina', image: 'assets/images/daun_binahong.jpg' },
    { name: 'Daun beluntas', khasiat: 'bau badan, pencernaan', image: 'assets/images/daun_beluntas.jpg' },
    { name: 'Daun sirsak', khasiat: 'daya tahan tubuh', image: 'assets/images/daun_sirsak.jpg' },
    { name: 'Daun pandan', khasiat: 'menenangkan, darah tinggi', image: 'assets/images/daun_pandan.jpg' },
    { name: 'Daun mint', khasiat: 'pencernaan, mual', image: 'assets/images/daun_mint.jpg' },
    { name: 'Daun kemangi', khasiat: 'bau badan, pencernaan', image: 'assets/images/daun_kemangi.jpg' },
    { name: 'Daun tempuyung', khasiat: 'batu ginjal', image: 'assets/images/daun_tempuyung.jpg' },
    { name: 'Kayu manis', khasiat: 'diabetes, kolesterol', image: 'assets/images/kayu_manis.jpg' },
    { name: 'Daun secang', khasiat: 'antioksidan, darah', image: 'assets/images/daun_secang.jpg' },
    { name: 'Akar alang-alang', khasiat: 'panas dalam', image: 'assets/images/akar_alang_alang.jpg' },
    { name: 'Kulit manggis', khasiat: 'antioksidan', image: 'assets/images/kulit_manggis.jpg' },
    { name: 'Serai', khasiat: 'flu, relaksasi', image: 'assets/images/serai.jpg' },
    { name: 'Lidah buaya', khasiat: 'pencernaan, kulit', image: 'assets/images/lidah_buaya.jpg' },
    { name: 'Tapak dara', khasiat: 'diabetes', image: 'assets/images/tapak_dara.jpg' },
    { name: 'Ciplukan', khasiat: 'diabetes', image: 'assets/images/ciplukan.jpg' },
    { name: 'Daun insulin', khasiat: 'gula darah', image: 'assets/images/daun_insulin.jpg' },
    { name: 'Ginseng jawa', khasiat: 'stamina', image: 'assets/images/ginseng_jawa.jpg' },
    { name: 'Daun Afrika', khasiat: 'diabetes', image: 'assets/images/daun_afrika.jpg' },
    { name: 'Brotowali', khasiat: 'diabetes, demam', image: 'assets/images/brotowali.jpg' },
    { name: 'Asam jawa', khasiat: 'pencernaan, panas dalam', image: 'assets/images/asam_jawa.jpg' },
    { name: 'Mengkudu', khasiat: 'tekanan darah', image: 'assets/images/mengkudu.jpg' },
    { name: 'Buah mahkota dewa', khasiat: 'imun tubuh', image: 'assets/images/buah_mahkota_dewa.jpg' },
    { name: 'Kapulaga', khasiat: 'batuk, pencernaan', image: 'assets/images/kapulaga.jpg' },
    { name: 'Pala', khasiat: 'tidur, relaksasi', image: 'assets/images/pala.jpg' },
    { name: 'Adas', khasiat: 'perut kembung', image: 'assets/images/adas.jpg' },
    { name: 'Ketumbar', khasiat: 'pencernaan', image: 'assets/images/ketumbar.jpg' },
    { name: 'Lada hitam', khasiat: 'menghangatkan tubuh', image: 'assets/images/lada_hitam.jpg' },
    { name: 'Kemukus', khasiat: 'batuk', image: 'assets/images/kemukus.jpg' },
    { name: 'Belimbing wuluh', khasiat: 'batuk, tekanan darah', image: 'assets/images/belimbing_wuluh.jpg' },
    { name: 'Rosella', khasiat: 'tekanan darah, antioksidan', image: 'assets/images/rosella.jpg' },
    { name: 'Bunga telang', khasiat: 'kesehatan mata, antioksidan', image: 'assets/images/bunga_telang.jpg' },
    { name: 'Chamomile', khasiat: 'tidur, relaksasi', image: 'assets/images/chamomile.jpg' },
    { name: 'Bunga melati', khasiat: 'menenangkan', image: 'assets/images/bunga_melati.jpg' },
    { name: 'Kenanga', khasiat: 'relaksasi', image: 'assets/images/bunga_kenanga.jpg' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loadFavorites();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ionViewWillEnter() {
    const q = this.route.snapshot.queryParamMap.get('q');
    if (q) {
      this.searchQuery = q;
    }
  }

  loadFavorites() {
    try {
      const saved = localStorage.getItem('jamu_favorites');
      this.favorites = saved ? JSON.parse(saved) : [];
    } catch (e) {
      this.favorites = [];
    }
  }

  isJamuFavorite(name: string): boolean {
    return this.favorites && this.favorites.includes(name);
  }

  toggleFavorite(event: any, name: string) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    if (!this.favorites) this.favorites = [];
    
    const index = this.favorites.indexOf(name);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(name);
    }
    localStorage.setItem('jamu_favorites', JSON.stringify(this.favorites));
  }

  toggleFavoriteFilter() {
    this.showOnlyFavorites = !this.showOnlyFavorites;
  }

  get filteredJamu() {
    let list = this.jamuList || [];
    
    if (this.showOnlyFavorites) {
      list = list.filter(item => this.isJamuFavorite(item.name));
    }

    if (!this.searchQuery || !this.searchQuery.trim()) return list;
    
    const q = this.searchQuery.toLowerCase();
    return list.filter(
      item => item.name.toLowerCase().includes(q) || item.khasiat.toLowerCase().includes(q)
    );
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value || '';
  }

  clearSearch() {
    this.searchQuery = '';
  }

  openDetail(item: any) {
    this.selectedJamu = item;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedJamu = null;
  }

}
