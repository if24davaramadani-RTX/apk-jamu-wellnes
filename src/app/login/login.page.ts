import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  showPassword = false;
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (!this.username || !this.password) {
      this.presentToast('Mohon isi username dan password');
      return;
    }

    this.authService.login({ username: this.username, password: this.password }).subscribe(
      (res: any) => {
        if (res.success) {
          this.presentToast('Login berhasil!');
          this.authService.initStreak();
          this.router.navigate(['/tabs/home']);
        } else {
          this.presentToast(res.message);
        }
      },
      (error) => {
        this.presentToast('Gagal terhubung ke sistem login.');
      }
    );
  }

  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Lupa Kata Sandi',
      message: 'Masukkan username dan password baru Anda untuk mereset secara lokal.',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Username'
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'Kata Sandi Baru'
        }
      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Reset',
          handler: (data) => {
            if (!data.username || !data.newPassword) {
              this.presentToast('Mohon isi semua data');
              return false;
            }
            this.authService.resetPassword({ 
              username: data.username, 
              password: data.newPassword 
            }).subscribe(
              (res: any) => {
                if (res.success) {
                  this.presentToast('Password berhasil direset!');
                } else {
                  this.presentToast('Username tidak ditemukan.');
                }
              }
            );
            return true;
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
}
