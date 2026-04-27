import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AuthService } from './auth.service';

export interface Reminder {
  id?: number;
  jamu_name: string;
  time: string; // Format: HH:mm
  days: string[]; // Contoh: ['Senin', 'Rabu']
  active: boolean;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  constructor(private authService: AuthService) {
    this.requestPermissions();
  }

  private getStorageKey(): string {
    const user = this.authService.getCurrentUser();
    const username = user ? (user.username || 'guest') : 'guest';
    return `jamu_reminders_${username}`;
  }

  // Minta izin notifikasi ke user
  async requestPermissions() {
    const perm = await LocalNotifications.checkPermissions();
    if (perm.display !== 'granted') {
      await LocalNotifications.requestPermissions();
    }
  }

  getReminders(): Observable<Reminder[]> {
    const reminders = JSON.parse(localStorage.getItem(this.getStorageKey()) || '[]');
    return of(reminders);
  }

  addReminder(reminder: Reminder): Observable<any> {
    const key = this.getStorageKey();
    const reminders = JSON.parse(localStorage.getItem(key) || '[]');
    const newId = reminders.length > 0 ? Math.max(...reminders.map((r: any) => r.id)) + 1 : 1;
    const newReminder = { ...reminder, id: newId };
    
    reminders.push(newReminder);
    localStorage.setItem(key, JSON.stringify(reminders));
    
    if (newReminder.active) {
      this.scheduleNotification(newReminder);
    }
    
    return of({ success: true, data: newReminder });
  }

  updateReminder(id: number, reminder: Partial<Reminder>): Observable<any> {
    const key = this.getStorageKey();
    let reminders = JSON.parse(localStorage.getItem(key) || '[]');
    const index = reminders.findIndex((r: any) => r.id === id);
    
    if (index !== -1) {
      reminders[index] = { ...reminders[index], ...reminder };
      localStorage.setItem(key, JSON.stringify(reminders));
      
      const updated = reminders[index];
      if (updated.active) {
        this.scheduleNotification(updated);
      } else {
        this.cancelNotification(id);
      }
      
      return of({ success: true, data: updated });
    }
    return of({ success: false, message: 'Pengingat tidak ditemukan' });
  }

  deleteReminder(id: number): Observable<any> {
    const key = this.getStorageKey();
    let reminders = JSON.parse(localStorage.getItem(key) || '[]');
    reminders = reminders.filter((r: any) => r.id !== id);
    localStorage.setItem(key, JSON.stringify(reminders));
    
    this.cancelNotification(id);
    
    return of({ success: true });
  }

  // Menjadwalkan Notifikasi Beneran
  async scheduleNotification(reminder: Reminder) {
    // Batalkan dulu jika sudah ada jadwal lama dengan ID yang sama
    await this.cancelNotification(reminder.id!);

    const [hours, minutes] = reminder.time.split(':').map(Number);
    
    // Kita buat notifikasi harian sesuai jam yang ditentukan
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Waktunya Minum Jamu! 🌿',
          body: `Jangan lupa minum ${reminder.jamu_name} agar tubuh tetap bugar.`,
          id: reminder.id!,
          schedule: { 
            on: { hour: hours, minute: minutes },
            repeats: true,
            allowWhileIdle: true
          },
          sound: 'default',
          smallIcon: 'ic_stat_jamu', // Siapkan ikon ic_stat_jamu.png di Android Studio
          largeIcon: 'res://drawable/ic_launcher',
          channelId: 'jamu_reminders',
          extra: {
            jamuId: reminder.id
          }
        }
      ]
    });
    console.log(`Notifikasi dijadwalkan untuk ${reminder.jamu_name} pada ${reminder.time}`);
  }

  async cancelNotification(id: number) {
    await LocalNotifications.cancel({ notifications: [{ id }] });
  }
}
