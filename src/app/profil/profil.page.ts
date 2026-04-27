import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: false,
})
export class ProfilPage implements OnInit {
  userName = '';
  username = '';
  streakDays = 0;
  joinDate = '';
  profileImage: string | null = null;

  healthData: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async addCustomRecipe() {
    const alert = await this.alertController.create({
      header: 'Resep Jamu Pribadi',
      message: 'Simpan resep rahasia keluargamu di sini.',
      cssClass: 'dark-alert',
      inputs: [
        { name: 'nama', type: 'text', placeholder: 'Nama Jamu (Cth: Beras Kencur Ibu)' },
        { name: 'bahan', type: 'textarea', placeholder: 'Bahan-bahan...' },
        { name: 'cara', type: 'textarea', placeholder: 'Cara Pembuatan...' }
      ],
      buttons: [
        { text: 'Batal', role: 'cancel', cssClass: 'alert-cancel' },
        {
          text: 'Simpan',
          handler: (data) => {
            if (data.nama && data.bahan && data.cara) {
              this.saveCustomRecipe(data);
              return true;
            } else {
              this.presentToast('Mohon lengkapi semua data resep.');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  saveCustomRecipe(recipe: any) {
    const user = this.authService.getCurrentUser();
    const username = user ? (user.username || 'guest') : 'guest';
    const key = `user_recipes_${username}`;
    
    const recipes = JSON.parse(localStorage.getItem(key) || '[]');
    recipes.push({
      ...recipe,
      id: Date.now(),
      created_at: new Date().toISOString()
    });
    
    localStorage.setItem(key, JSON.stringify(recipes));
    this.presentToast('Resep berhasil disimpan di koleksi pribadi!');
  }

  async shareApp() {
    const user = this.authService.getCurrentUser();
    const username = user ? (user.username || 'guest') : 'guest';
    const key = `user_recipes_${username}`;
    const recipes = JSON.parse(localStorage.getItem(key) || '[]');

    if (recipes.length === 0) {
      const alert = await this.alertController.create({
        header: 'Belum Ada Resep',
        message: 'Anda belum memiliki resep pribadi untuk dibagikan. Ayo buat satu sekarang!',
        cssClass: 'dark-alert',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const inputs = recipes.map((r: any, index: number) => ({
      name: `recipe${index}`,
      type: 'radio',
      label: r.nama,
      value: r,
      checked: index === 0
    }));

    const alert = await this.alertController.create({
      header: 'Pilih Resep Anda',
      message: 'Pilih resep yang ingin Anda bagikan ke teman:',
      cssClass: 'dark-alert',
      inputs: inputs,
      buttons: [
        { text: 'Batal', role: 'cancel', cssClass: 'alert-cancel' },
        {
          text: 'Salin Resep',
          handler: (selectedRecipe) => {
            if (selectedRecipe) {
              const textToShare = `🌿 *RESEP JAMU PRIBADI: ${selectedRecipe.nama.toUpperCase()}* 🌿\n\n` +
                                 `📍 *Bahan-bahan:*\n${selectedRecipe.bahan}\n\n` +
                                 `👨‍🍳 *Cara Pembuatan:*\n${selectedRecipe.cara}\n\n` +
                                 `_Dibagikan via aplikasi JamuKuat_`;
              
              navigator.clipboard.writeText(textToShare).then(() => {
                this.presentToast(`Resep "${selectedRecipe.nama}" berhasil disalin! Siap dikirim.`);
              });
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'middle',
      cssClass: 'custom-toast-middle',
      mode: 'ios'
    });
    toast.present();
  }

  ionViewWillEnter() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.name || user.username || 'Pengguna';
      this.username = user.username || '-';
      if (user.created_at) {
        const date = new Date(user.created_at);
        this.joinDate = date.toLocaleDateString('id-ID', {
          day: 'numeric', month: 'long', year: 'numeric'
        });
      } else {
        // Fallback jika user lama tidak punya created_at
        const date = new Date();
        this.joinDate = date.toLocaleDateString('id-ID', {
          day: 'numeric', month: 'long', year: 'numeric'
        });
      }
    }
    
    this.streakDays = this.authService.getStreak();
    this.loadHealthData();
    
    // Load foto profil dari storage (user specific)
    const username = user ? (user.username || 'guest') : 'guest';
    const savedImage = localStorage.getItem(`profileImage_${username}`);
    if (savedImage) {
      this.profileImage = savedImage;
    } else {
      this.profileImage = null; // Reset if no image for this user
    }
  }

  async changePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos // Membuka Galeri
      });

      if (image.base64String) {
        const user = this.authService.getCurrentUser();
        const username = user ? (user.username || 'guest') : 'guest';
        this.profileImage = `data:image/${image.format};base64,${image.base64String}`;
        localStorage.setItem(`profileImage_${username}`, this.profileImage);
      }
    } catch (error) {
      console.log('Batal mengambil foto atau terjadi kesalahan:', error);
    }
  }

  loadHealthData() {
    const user = this.authService.getCurrentUser();
    const username = user ? (user.username || 'guest') : 'guest';
    const key = `healthData_${username}`;
    
    const savedData = localStorage.getItem(key);
    if (savedData) {
      this.healthData = JSON.parse(savedData);
    } else {
      this.healthData = [
        { day: 'Sen', value: 0, color: '#F39C12' },
        { day: 'Sel', value: 0, color: '#F39C12' },
        { day: 'Rab', value: 0, color: '#F39C12' },
        { day: 'Kam', value: 0, color: '#F39C12' },
        { day: 'Jum', value: 0, color: '#F39C12' },
        { day: 'Sab', value: 0, color: '#F39C12' },
        { day: 'Min', value: 0, color: '#F39C12' }
      ];
    }
  }

  async updateHealthToday() {
    const alert = await this.alertController.create({
      header: 'Kesehatan Hari Ini',
      message: 'Nilai kondisi kesehatanmu dari 0 sampai 100.',
      cssClass: 'dark-alert',
      inputs: [
        { name: 'healthValue', type: 'number', min: 0, max: 100, placeholder: 'Cth: 85' }
      ],
      buttons: [
        { text: 'Batal', role: 'cancel', cssClass: 'alert-cancel' },
        {
          text: 'Simpan',
          handler: (data) => {
            const val = parseInt(data.healthValue, 10);
            if (!isNaN(val)) {
               this.setTodayHealth(val);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  setTodayHealth(val: number) {
    const user = this.authService.getCurrentUser();
    const username = user ? (user.username || 'guest') : 'guest';
    const key = `healthData_${username}`;

    const date = new Date();
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const currentDayStr = days[date.getDay()];
    const itemIndex = this.healthData.findIndex(d => d.day === currentDayStr);
    const finalVal = Math.min(Math.max(val, 0), 100);
    
    let color = '#F39C12'; 
    if (finalVal <= 40) color = '#e74c3c'; 
    else if (finalVal >= 80) color = '#2ecc71'; 

    if (itemIndex > -1) {
      this.healthData[itemIndex].value = finalVal;
      this.healthData[itemIndex].color = color;
      localStorage.setItem(key, JSON.stringify(this.healthData));
    }
  }

  async editName() {
    const alert = await this.alertController.create({
      header: 'Ganti Nama',
      cssClass: 'dark-alert',
      inputs: [
        { name: 'newName', type: 'text', placeholder: 'Masukkan nama baru', value: this.userName }
      ],
      buttons: [
        { text: 'Batal', role: 'cancel', cssClass: 'alert-cancel' },
        {
          text: 'Simpan',
          handler: (data) => {
            if (data.newName && data.newName.trim() !== '') {
              const newName = data.newName.trim();
              this.userName = newName;
              
              // Update session user
              const userStr = localStorage.getItem('user');
              if (userStr) {
                const user = JSON.parse(userStr);
                user.name = newName;
                localStorage.setItem('user', JSON.stringify(user));
                
                // Update in all_users list to persist
                const allUsersStr = localStorage.getItem('all_users');
                if (allUsersStr) {
                  const allUsers = JSON.parse(allUsersStr);
                  const userIndex = allUsers.findIndex((u: any) => u.username === user.username);
                  if (userIndex !== -1) {
                    allUsers[userIndex].name = newName;
                    localStorage.setItem('all_users', JSON.stringify(allUsers));
                  }
                }
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }

  getInitials(): string {
    if (!this.userName) return '?';
    const parts = this.userName.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return this.userName.substring(0, 2).toUpperCase();
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Logout',
      message: 'Apakah kamu yakin ingin keluar?',
      cssClass: 'dark-alert',
      buttons: [
        { text: 'Batal', role: 'cancel', cssClass: 'alert-cancel' },
        {
          text: 'Keluar',
          cssClass: 'alert-logout',
          handler: () => {
            localStorage.removeItem('user');
            localStorage.removeItem('streak');
            this.router.navigate(['/login'], { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: 'Hapus Akun Permanen?',
      message: 'Seluruh resep pribadi, pengingat, dan data kesehatan Anda akan dihapus selamanya. Tindakan ini tidak bisa dibatalkan.',
      cssClass: 'dark-alert',
      buttons: [
        { text: 'Batal', role: 'cancel', cssClass: 'alert-cancel' },
        {
          text: 'Hapus Selamanya',
          role: 'destructive',
          cssClass: 'alert-logout',
          handler: () => {
            this.performAccountDeletion();
          }
        }
      ]
    });
    await alert.present();
  }

  performAccountDeletion() {
    const user = this.authService.getCurrentUser();
    if (!user) return;
    const username = user.username;

    // 1. Hapus dari daftar all_users
    const allUsersStr = localStorage.getItem('all_users');
    if (allUsersStr) {
      let allUsers = JSON.parse(allUsersStr);
      allUsers = allUsers.filter((u: any) => u.username !== username);
      localStorage.setItem('all_users', JSON.stringify(allUsers));
    }

    // 2. Hapus data spesifik user
    localStorage.removeItem(`healthData_${username}`);
    localStorage.removeItem(`profileImage_${username}`);
    localStorage.removeItem(`jamu_reminders_${username}`);
    localStorage.removeItem(`user_recipes_${username}`);
    localStorage.removeItem(`streak_${username}`);
    
    // 3. Clear session dan logout
    localStorage.removeItem('user');
    localStorage.removeItem('streak');
    
    this.presentToast('Akun dan seluruh data Anda telah dihapus.');
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
