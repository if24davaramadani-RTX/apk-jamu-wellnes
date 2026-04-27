import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  showPassword = false;
  name = '';
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async register() {
    const cleanUsername = this.username.trim();
    
    // 1. Validasi Field Kosong
    if (!this.name || !cleanUsername || !this.password) {
      this.presentToast('Mohon isi semua data');
      return;
    }

    // 2. Validasi Spasi di Username
    if (cleanUsername.includes(' ')) {
      this.presentToast('Username tidak boleh mengandung spasi');
      return;
    }

    // 3. Validasi Panjang Password
    if (this.password.length < 6) {
      this.presentToast('Password minimal harus 6 karakter');
      return;
    }

    // 4. Cek Username Unik
    if (this.authService.checkUsernameExists(cleanUsername)) {
      this.presentToast('Username sudah digunakan, cari yang lain ya!');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Sedang mendaftarkan...',
      spinner: 'crescent'
    });
    await loading.present();

    this.authService.register({ 
      name: this.name, 
      username: cleanUsername, 
      password: this.password 
    }).subscribe({
      next: (res: any) => {
        loading.dismiss();
        if (res.success) {
          this.presentToast('Registrasi berhasil! Silakan login.');
          this.router.navigate(['/login']);
        } else {
          this.presentToast(res.message || 'Registrasi gagal');
        }
      },
      error: (error) => {
        loading.dismiss();
        this.presentToast('Terjadi kesalahan saat pendaftaran.');
      }
    });
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
}
