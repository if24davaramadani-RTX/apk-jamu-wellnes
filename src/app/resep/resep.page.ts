import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-resep',
  templateUrl: './resep.page.html',
  styleUrls: ['./resep.page.scss'],
  standalone: false,
})
export class ResepPage implements OnInit {
  isLoading = true;
  searchQuery = '';
  selectedCategory = 'Semua';

  categories = [
    'Semua',
    'Resep Saya',
    'Tambah Stamina',
    'Imun Tubuh',
    'Pencernaan Lancar',
    'Hilangkan Pegal',
    'Atasi Pilek',
    'Kecantikan & Perawatan Kulit',
    'Pelangsing / Turun Berat Badan',
    'Detoks & Membersihkan Darah',
    'Nafsu Makan & Anak',
    'Kesehatan Jantung & Tekanan Darah'
  ];

  resepList = [
    {
      id: 1,
      name: 'Jamu Jahe Madu',
      benefit: 'Menambah energi, menghangatkan tubuh, dan dukung sirkulasi darah sehat.',
      ingredients: 'Jahe 2 ruas, Madu 1 sdm, 250 ml air',
      steps: 'Rebus jahe 10 menit, saring, tambahkan madu.',
      tags: ['Tambah Stamina', 'Imun Tubuh', 'Pencernaan Lancar', 'Kecantikan & Perawatan Kulit', 'Detoks & Membersihkan Darah', 'Nafsu Makan & Anak', 'Kesehatan Jantung & Tekanan Darah']
    },
    {
      id: 2,
      name: 'Jamu Kunyit Asam',
      benefit: 'Menyegarkan badan, antioksidan tinggi untuk membersihkan darah.',
      ingredients: 'Kunyit 2 ruas, Asam jawa, Gula merah, 500 ml air',
      steps: 'Rebus semua bahan 15 menit lalu saring.',
      tags: ['Tambah Stamina', 'Imun Tubuh', 'Pencernaan Lancar', 'Hilangkan Pegal', 'Kecantikan & Perawatan Kulit', 'Pelangsing / Turun Berat Badan', 'Detoks & Membersihkan Darah']
    },
    {
      id: 3,
      name: 'Jamu Temulawak',
      benefit: 'Membantu stamina, pencernaan, dan kebugaran jantung harian.',
      ingredients: 'Temulawak 2 ruas, Gula aren/Madu, 400-500 ml air',
      steps: 'Iris tipis lalu rebus 15 menit.',
      tags: ['Tambah Stamina', 'Imun Tubuh', 'Pencernaan Lancar', 'Hilangkan Pegal', 'Atasi Pilek', 'Kecantikan & Perawatan Kulit', 'Pelangsing / Turun Berat Badan', 'Detoks & Membersihkan Darah', 'Nafsu Makan & Anak', 'Kesehatan Jantung & Tekanan Darah']
    },
    {
      id: 4,
      name: 'Jamu Beras Kencur',
      benefit: 'Mengurangi lelah, menambah tenaga, dan sangat disukai anak-anak.',
      ingredients: 'Beras, Kencur 2 ruas, Gula merah',
      steps: 'Rendam beras, haluskan dengan kencur, rebus sebentar.',
      tags: ['Tambah Stamina', 'Hilangkan Pegal', 'Pencernaan Lancar', 'Kecantikan & Perawatan Kulit', 'Nafsu Makan & Anak']
    },
    {
      id: 5,
      name: 'Jamu Jahe Kayu Manis',
      benefit: 'Menghangatkan badan, stamina, dan bantu metabolisme jantung.',
      ingredients: 'Jahe, Kayu manis',
      steps: 'Rebus 10 menit.',
      tags: ['Tambah Stamina', 'Pencernaan Lancar', 'Hilangkan Pegal', 'Atasi Pilek', 'Kecantikan & Perawatan Kulit', 'Pelangsing / Turun Berat Badan', 'Detoks & Membersihkan Darah', 'Kesehatan Jantung & Tekanan Darah']
    },
    {
      id: 6,
      name: 'Jamu Lemon Jahe Madu',
      benefit: 'Menyegarkan, kaya vitamin C, dan bantu detoks harian.',
      ingredients: 'Lemon 1 buah, Jahe, Madu',
      steps: 'Seduh jahe, tambahkan perasan lemon dan madu.',
      tags: ['Tambah Stamina', 'Imun Tubuh', 'Pencernaan Lancar', 'Hilangkan Pegal', 'Atasi Pilek', 'Kecantikan & Perawatan Kulit', 'Pelangsing / Turun Berat Badan', 'Detoks & Membersihkan Darah', 'Nafsu Makan & Anak', 'Kesehatan Jantung & Tekanan Darah']
    },
    {
      id: 7,
      name: 'Jamu Pegagan',
      benefit: 'Mengurangi lelah, bantu fokus, dan membersihkan darah.',
      ingredients: 'Pegagan segenggam, Air 300 ml',
      steps: 'Rebus 10 menit lalu saring.',
      tags: ['Tambah Stamina', 'Imun Tubuh', 'Detoks & Membersihkan Darah']
    },
    {
      id: 8,
      name: 'Jamu Serai Jahe',
      benefit: 'Badan segar, relaksasi tubuh, dan dukung sirkulasi harian.',
      ingredients: 'Serai 2 batang, Jahe',
      steps: 'Rebus bersama 10 menit.',
      tags: ['Tambah Stamina', 'Imun Tubuh', 'Pencernaan Lancar', 'Hilangkan Pegal', 'Atasi Pilek', 'Pelangsing / Turun Berat Badan', 'Detoks & Membersihkan Darah', 'Nafsu Makan & Anak', 'Kesehatan Jantung & Tekanan Darah']
    },
    {
      id: 9,
      name: 'Jamu Daun Sirih Madu',
      benefit: 'Menjaga kebugaran dan kebersihan tubuh.',
      ingredients: 'Daun sirih 5 lembar, Madu',
      steps: 'Rebus daun sirih, saring, tambah madu.',
      tags: ['Tambah Stamina', 'Kecantikan & Perawatan Kulit']
    },
    {
      id: 10,
      name: 'Jamu Kencur Madu',
      benefit: 'Menambah tenaga, nafsu makan, dan badan tetap segar.',
      ingredients: 'Kencur, Madu',
      steps: 'Haluskan kencur, seduh air hangat, tambah madu.',
      tags: ['Tambah Stamina', 'Imun Tubuh', 'Pencernaan Lancar', 'Hilangkan Pegal', 'Nafsu Makan & Anak']
    },
    {
      id: 11,
      name: 'Jamu Kurma Susu',
      benefit: 'Energi cepat, cocok saat capek dan untuk pertumbuhan anak.',
      ingredients: 'Kurma 5 buah, Susu',
      steps: 'Blender kurma dan susu.',
      tags: ['Tambah Stamina', 'Nafsu Makan & Anak']
    },
    {
      id: 12,
      name: 'Jamu Kopi Jahe',
      benefit: 'Menambah semangat saat badan capek dan pegal.',
      ingredients: 'Kopi, Jahe',
      steps: 'Seduh kopi, tambahkan rebusan jahe.',
      tags: ['Tambah Stamina', 'Hilangkan Pegal']
    },
    {
      id: 13,
      name: 'Jamu Madu Telur',
      benefit: 'Menambah tenaga.',
      ingredients: 'Madu, Telur matang/pasteurisasi',
      steps: 'Campur madu dengan telur matang/pasteurisasi.',
      tags: ['Tambah Stamina']
    },
    {
      id: 14,
      name: 'Jamu Wedang Uwuh',
      benefit: 'Kaya rempah, cocok saat meriang dan pilek.',
      ingredients: 'Jahe, Kayu manis, Cengkeh, Gula batu',
      steps: 'Rebus semua bahan 15 menit.',
      tags: ['Imun Tubuh', 'Hilangkan Pegal', 'Atasi Pilek']
    },
    {
      id: 15,
      name: 'Jamu Daun Meniran',
      benefit: 'Secara tradisional digunakan untuk daya tahan tubuh.',
      ingredients: 'Meniran secukupnya, Air 300 ml',
      steps: 'Rebus 10 menit lalu saring.',
      tags: ['Imun Tubuh']
    },
    {
      id: 16,
      name: 'Jamu Jeruk Nipis Madu',
      benefit: 'Vitamin C alami untuk daya tahan dan menyegarkan.',
      ingredients: 'Jeruk nipis 1 buah, Madu',
      steps: 'Campur perasan jeruk nipis dengan air hangat and madu.',
      tags: ['Imun Tubuh', 'Pencernaan Lancar', 'Atasi Pilek', 'Kecantikan & Perawatan Kulit', 'Pelangsing / Turun Berat Badan', 'Detoks & Membersihkan Darah', 'Nafsu Makan & Anak']
    },
    {
      id: 17,
      name: 'Jamu Bawang Putih Madu',
      benefit: 'Tradisional dikaitkan dengan kesehatan pembuluh darah.',
      ingredients: 'Bawang putih 1 siung kecil, Madu',
      steps: 'Haluskan bawang putih, campur madu, konsumsi sedikit.',
      tags: ['Imun Tubuh', 'Atasi Pilek', 'Kesehatan Jantung & Tekanan Darah']
    },
    {
      id: 18,
      name: 'Jamu Daun Sambiloto',
      benefit: 'Secara tradisional dipakai menjaga kebugaran.',
      ingredients: 'Sambiloto secukupnya, Air 300 ml',
      steps: 'Rebus lalu saring.',
      tags: ['Imun Tubuh']
    },
    {
      id: 19,
      name: 'Jamu Jahe Hangat',
      benefit: 'Membantu sirkulasi dan menghangatkan tubuh harian.',
      ingredients: 'Jahe 2 ruas, 300 ml air',
      steps: 'Rebus jahe 10 menit, saring lalu minum hangat.',
      tags: ['Pencernaan Lancar', 'Hilangkan Pegal', 'Atasi Pilek', 'Pelangsing / Turun Berat Badan', 'Nafsu Makan & Anak', 'Kesehatan Jantung & Tekanan Darah']
    },
    {
      id: 20,
      name: 'Jamu Kunyit',
      benefit: 'Membantu peradangan ringan dan kebugaran jantung.',
      ingredients: 'Kunyit 2 ruas, 300 ml air',
      steps: 'Parut/iris kunyit, rebus 10–15 menit, saring.',
      tags: ['Pencernaan Lancar', 'Nafsu Makan & Anak', 'Kesehatan Jantung & Tekanan Darah']
    },
    {
      id: 21,
      name: 'Jamu Kencur',
      benefit: 'Membantu perut begah dan mual ringan.',
      ingredients: 'Kencur 2 ruas, Air hangat 250 ml',
      steps: 'Haluskan kencur, seduh air hangat, saring.',
      tags: ['Pencernaan Lancar']
    },
    {
      id: 22,
      name: 'Jamu Asam Jawa Hangat',
      benefit: 'Membantu rasa penuh di perut.',
      ingredients: 'Asam jawa secukupnya, Gula merah, 300 ml air',
      steps: 'Rebus semua bahan 10 menit.',
      tags: ['Pencernaan Lancar']
    },
    {
      id: 23,
      name: 'Jamu Daun Pepaya Madu',
      benefit: 'Tradisional dipakai bantu pencernaan dan nafsu makan.',
      ingredients: 'Daun pepaya muda secukupnya, Madu',
      steps: 'Rebus daun pepaya, ambil airnya, tambahkan madu.',
      tags: ['Pencernaan Lancar', 'Nafsu Makan & Anak']
    },
    {
      id: 24,
      name: 'Jamu Lemon Madu Hangat',
      benefit: 'Membantu hidrasi dan menyegarkan tubuh.',
      ingredients: 'Lemon 1/2 buah, Madu',
      steps: 'Campur perasan lemon ke air hangat, tambah madu.',
      tags: ['Pencernaan Lancar', 'Kecantikan & Perawatan Kulit', 'Pelangsing / Turun Berat Badan', 'Nafsu Makan & Anak', 'Kesehatan Jantung & Tekanan Darah']
    },
    {
      id: 25,
      name: 'Jamu Peppermint Hangat',
      benefit: 'Membantu kram perut, begah, dan rasa lega di hidung.',
      ingredients: 'Peppermint / daun mint, Air panas',
      steps: 'Seduh 5–10 menit.',
      tags: ['Pencernaan Lancar', 'Atasi Pilek']
    },
    {
      id: 26,
      name: 'Jamu Lidah Buaya',
      benefit: 'Membantu BAB lancar dan proses detoksifikasi.',
      ingredients: 'Lidah buaya gel secukupnya, Air',
      steps: 'Bersihkan gel, blender dengan air.',
      tags: ['Pencernaan Lancar', 'Kecantikan & Perawatan Kulit', 'Pelangsing / Turun Berat Badan', 'Detoks & Membersihkan Darah']
    },
    {
      id: 27,
      name: 'Jamu Kunyit Jahe',
      benefit: 'Membantu meredakan pegal dan tubuh terasa nyaman.',
      ingredients: 'Kunyit 2 ruas, Jahe 1 ruas',
      steps: 'Rebus bersama 15 menit.',
      tags: ['Hilangkan Pegal', 'Atasi Pilek']
    },
    {
      id: 28,
      name: 'Jamu Daun Salam Jahe',
      benefit: 'Tradisional digunakan untuk pegal linu.',
      ingredients: 'Daun salam 5 lembar, Jahe',
      steps: 'Rebus 10–15 menit.',
      tags: ['Hilangkan Pegal']
    },
    {
      id: 29,
      name: 'Jamu Madu Hangat',
      benefit: 'Menenangkan tenggorokan.',
      ingredients: 'Madu 1 sdm, Air hangat',
      steps: 'Campur dan minum.',
      tags: ['Atasi Pilek', 'Nafsu Makan & Anak']
    },
    {
      id: 30,
      name: 'Jamu Kencur Jahe',
      benefit: 'Membantu badan tidak enak dan meriang.',
      ingredients: 'Kencur, Jahe',
      steps: 'Rebus bersama.',
      tags: ['Atasi Pilek']
    },
    {
      id: 31,
      name: 'Jamu Daun Sirih',
      benefit: 'Tradisional dipakai menjaga kebersihan tubuh.',
      ingredients: 'Daun sirih 5 lembar, Air 400 ml',
      steps: 'Rebus 10 menit, saring.',
      tags: ['Kecantikan & Perawatan Kulit']
    },
    {
      id: 32,
      name: 'Jamu Tomat Madu',
      benefit: 'Menyegarkan dan kaya antioksidan untuk kulit.',
      ingredients: 'Tomat, Madu',
      steps: 'Blender tomat, tambahkan madu.',
      tags: ['Kecantikan & Perawatan Kulit']
    },
    {
      id: 33,
      name: 'Jamu Wortel Jeruk',
      benefit: 'Mendukung kesehatan mata and kulit dari dalam.',
      ingredients: 'Wortel, Jeruk',
      steps: 'Blender wortel, campur perasan jeruk.',
      tags: ['Kecantikan & Perawatan Kulit', 'Nafsu Makan & Anak']
    },
    {
      id: 34,
      name: 'Jamu Mentimun Lemon',
      benefit: 'Menyegarkan dan membantu hidrasi tubuh.',
      ingredients: 'Mentimun, Lemon',
      steps: 'Blender mentimun, tambah lemon.',
      tags: ['Kecantikan & Perawatan Kulit', 'Pelangsing / Turun Berat Badan', 'Detoks & Membersihkan Darah']
    },
    {
      id: 35,
      name: 'Jamu Rosella',
      benefit: 'Kaya antioksidan dan mendukung gaya hidup sehat.',
      ingredients: 'Rosella kering, Air panas',
      steps: 'Seduh 10 menit.',
      tags: ['Kecantikan & Perawatan Kulit', 'Pelangsing / Turun Berat Badan', 'Detoks & Membersihkan Darah', 'Kesehatan Jantung & Tekanan Darah']
    },
    {
      id: 36,
      name: 'Jamu Cuka Apel Encer',
      benefit: 'Sebagian orang memakainya untuk kontrol makan.',
      ingredients: 'Cuka apel 1 sdt, 250 ml air',
      steps: 'Campur dan minum setelah makan. Jangan diminum pekat.',
      tags: ['Pelangsing / Turun Berat Badan']
    },
    {
      id: 37,
      name: 'Jamu Teh Hijau Jahe',
      benefit: 'Alternatif minuman harian yang kaya antioksidan.',
      ingredients: 'Teh hijau, Jahe',
      steps: 'Seduh teh hijau, tambah irisan jahe.',
      tags: ['Pelangsing / Turun Berat Badan', 'Kesehatan Jantung & Tekanan Darah']
    },
    {
      id: 38,
      name: 'Jamu Tomat Wortel',
      benefit: 'Nutrisi baik untuk gaya hidup sehat harian.',
      ingredients: 'Tomat, Wortel',
      steps: 'Blender hingga halus.',
      tags: ['Detoks & Membersihkan Darah', 'Kesehatan Jantung & Tekanan Darah']
    },
    {
      id: 39,
      name: 'Jamu Daun Salam',
      benefit: 'Tradisional dipakai untuk kebugaran tubuh.',
      ingredients: 'Daun salam secukupnya',
      steps: 'Rebus 10 menit.',
      tags: ['Detoks & Membersihkan Darah']
    },
    {
      id: 40,
      name: 'Jamu Jeruk Hangat',
      benefit: 'Menyegarkan dan kaya vitamin C untuk si kecil.',
      ingredients: 'Jeruk manis, Air hangat',
      steps: 'Campur perasan jeruk ke air hangat.',
      tags: ['Nafsu Makan & Anak']
    },
    {
      id: 41,
      name: 'Jamu Temulawak Jeruk',
      benefit: 'Rasa lebih segar agar anak mau minum jamu.',
      ingredients: 'Temulawak, Jeruk',
      steps: 'Rebus temulawak, dinginkan, tambah sedikit jeruk.',
      tags: ['Nafsu Makan & Anak']
    },
    {
      id: 42,
      name: 'Jamu Pisang Susu',
      benefit: 'Sumber kalori dan energi yang lezat untuk anak.',
      ingredients: 'Pisang matang, Susu',
      steps: 'Blender hingga lembut.',
      tags: ['Nafsu Makan & Anak']
    },
    {
      id: 43,
      name: 'Jamu Delima',
      benefit: 'Buah kaya antioksidan untuk kesehatan harian.',
      ingredients: 'Buah Delima segar',
      steps: 'Blender atau peras buah segar.',
      tags: ['Kesehatan Jantung & Tekanan Darah']
    },
    {
      id: 44,
      name: 'Jamu Oat Kayu Manis',
      benefit: 'Serat baik untuk pola makan sehat jantung.',
      ingredients: 'Oat matang, Kayu manis',
      steps: 'Seduh oat hangat, tabur kayu manis.',
      tags: ['Kesehatan Jantung & Tekanan Darah']
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['kategori']) {
        this.selectedCategory = params['kategori'];
      }
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 800);
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
  }

  get filteredResep() {
    const query = this.searchQuery.toLowerCase();

    // Jika kategori "Resep Saya" dipilih, ambil dari LocalStorage
    if (this.selectedCategory === 'Resep Saya') {
      const user = this.authService.getCurrentUser();
      const username = user ? (user.username || 'guest') : 'guest';
      const key = `user_recipes_${username}`;
      const userRecipes = JSON.parse(localStorage.getItem(key) || '[]');

      // Map ke format yang sama dengan resep bawaan
      const formattedUserRecipes = userRecipes.map((r: any) => ({
        id: r.id,
        name: r.nama,
        benefit: 'Resep Pribadi',
        ingredients: r.bahan,
        steps: r.cara,
        tags: ['Resep Saya']
      }));

      return formattedUserRecipes.filter((r: any) =>
        r.name.toLowerCase().includes(query)
      );
    }

    let list = this.resepList;

    if (this.selectedCategory !== 'Semua') {
      list = list.filter(r => r.tags.includes(this.selectedCategory));
    }

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.benefit.toLowerCase().includes(q)
      );
    }

    return list;
  }

  async deleteUserRecipe(id: number, event: Event) {
    event.stopPropagation(); // Mencegah klik pada card jika ada navigasi detail

    const alert = await this.alertController.create({
      header: 'Hapus Resep',
      message: 'Apakah Anda yakin ingin menghapus resep pribadi ini?',
      cssClass: 'dark-alert',
      buttons: [
        { text: 'Batal', role: 'cancel', cssClass: 'alert-cancel' },
        {
          text: 'Hapus',
          role: 'destructive',
          handler: () => {
            const user = this.authService.getCurrentUser();
            const username = user ? (user.username || 'guest') : 'guest';
            const key = `user_recipes_${username}`;

            let recipes = JSON.parse(localStorage.getItem(key) || '[]');
            recipes = recipes.filter((r: any) => r.id !== id);
            localStorage.setItem(key, JSON.stringify(recipes));

            // Refresh list (Angular akan otomatis update karena get filteredResep reaktif)
          }
        }
      ]
    });
    await alert.present();
  }
}
