import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ReminderService, Reminder } from '../services/reminder.service';

@Component({
  selector: 'app-pengingat',
  templateUrl: './pengingat.page.html',
  styleUrls: ['./pengingat.page.scss'],
  standalone: false,
})
export class PengingatPage implements OnInit {
  reminders: Reminder[] = [];
  nextReminder: Reminder | null = null;
  isLoading = false;

  constructor(
    private reminderService: ReminderService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadReminders();
  }

  loadReminders() {
    this.isLoading = true;
    this.reminderService.getReminders().subscribe({
      next: (data) => {
        this.reminders = data;
        this.updateNextReminder();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Gagal memuat pengingat', err);
        this.isLoading = false;
      }
    });
  }

  updateNextReminder() {
    const activeReminders = this.reminders.filter(r => r.active);
    if (activeReminders.length === 0) {
      this.nextReminder = null;
      return;
    }

    // Cari yang terdekat dengan jam sekarang (simpel)
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const futureReminders = activeReminders.filter(r => r.time > currentTime);
    if (futureReminders.length > 0) {
      this.nextReminder = futureReminders.sort((a, b) => a.time.localeCompare(b.time))[0];
    } else {
      // Jika tidak ada yang di masa depan hari ini, ambil yang paling pagi besok
      this.nextReminder = activeReminders.sort((a, b) => a.time.localeCompare(b.time))[0];
    }
  }

  toggleActive(item: Reminder) {
    const newStatus = !item.active;
    this.reminderService.updateReminder(item.id!, { active: newStatus }).subscribe({
      next: (res) => {
        if (res.success) {
          item.active = newStatus;
          this.updateNextReminder();
          this.presentToast(newStatus ? 'Pengingat diaktifkan' : 'Pengingat dimatikan');
        }
      }
    });
  }

  async deleteReminder(id: number) {
    const alert = await this.alertController.create({
      header: 'Hapus Pengingat',
      message: 'Apakah Anda yakin ingin menghapus pengingat ini?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Hapus',
          handler: () => {
            this.reminderService.deleteReminder(id).subscribe({
              next: (res) => {
                if (res.success) {
                  this.reminders = this.reminders.filter(r => r.id !== id);
                  this.updateNextReminder();
                  this.presentToast('Pengingat berhasil dihapus');
                }
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async addReminder() {
    const alert = await this.alertController.create({
      header: 'Tambah Pengingat',
      inputs: [
        { name: 'jamu_name', type: 'text', placeholder: 'Nama Jamu (misal: Kunyit Asam)' },
        { name: 'time', type: 'time', placeholder: 'Waktu' },
        { name: 'notes', type: 'textarea', placeholder: 'Catatan (opsional)' }
      ],
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Simpan',
          handler: (data) => {
            if (!data.jamu_name || !data.time) {
              this.presentToast('Nama jamu dan waktu harus diisi');
              return false;
            }

            const newReminder: Reminder = {
              jamu_name: data.jamu_name,
              time: data.time,
              days: ['Setiap Hari'],
              active: true,
              notes: data.notes
            };

            this.reminderService.addReminder(newReminder).subscribe({
              next: (res) => {
                if (res.success) {
                  this.reminders.push(res.data);
                  this.updateNextReminder();
                  this.presentToast('Pengingat berhasil ditambahkan');
                }
              }
            });
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
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
