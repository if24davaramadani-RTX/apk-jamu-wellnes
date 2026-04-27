import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Koneksi ke Laravel dihapus sepenuhnya

  constructor() { }

  register(data: any): Observable<any> {
    // Simpan ke local storage saja
    const users = JSON.parse(localStorage.getItem('all_users') || '[]');
    
    // Tambahkan timestamp pendaftaran
    const newUser = {
      ...data,
      created_at: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('all_users', JSON.stringify(users));
    
    return of({ success: true, message: 'Registrasi Lokal Berhasil' });
  }

  login(data: any): Observable<any> {
    const users = JSON.parse(localStorage.getItem('all_users') || '[]');
    const user = users.find((u: any) => u.username === data.username && u.password === data.password);
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return of({ success: true, data: user });
    } else {
      return of({ success: false, message: 'Username atau Password salah' });
    }
  }

  checkUsernameExists(username: string): boolean {
    const users = JSON.parse(localStorage.getItem('all_users') || '[]');
    return users.some((u: any) => u.username.toLowerCase() === username.toLowerCase());
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }

  resetPassword(data: any): Observable<any> {
    const users = JSON.parse(localStorage.getItem('all_users') || '[]');
    const index = users.findIndex((u: any) => u.username === data.username);
    
    if (index !== -1) {
      users[index].password = data.password;
      localStorage.setItem('all_users', JSON.stringify(users));
      return of({ success: true });
    }
    return of({ success: false });
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('user');
  }

  getUserName(): string {
    const user = this.getCurrentUser();
    if (!user) return 'Pengguna';
    return user.username || user.name || 'Pengguna';
  }

  getStreak(): number {
    const user = this.getCurrentUser();
    if (!user) return 0;

    const streakKey = `streak_${user.username || 'guest'}`;
    const streakData = localStorage.getItem(streakKey);
    if (!streakData) return 0;

    const { count, lastDate } = JSON.parse(streakData);
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (lastDate === today) {
      return count;
    } else if (lastDate === yesterday) {
      const newCount = count + 1;
      localStorage.setItem(streakKey, JSON.stringify({ count: newCount, lastDate: today }));
      return newCount;
    } else {
      localStorage.setItem(streakKey, JSON.stringify({ count: 1, lastDate: today }));
      return 1;
    }
  }

  initStreak() {
    const user = this.getCurrentUser();
    if (!user) return;

    const streakKey = `streak_${user.username || 'guest'}`;
    const streakData = localStorage.getItem(streakKey);
    const today = new Date().toDateString();

    if (!streakData) {
      localStorage.setItem(streakKey, JSON.stringify({ count: 1, lastDate: today }));
    } else {
      this.getStreak();
    }
  }
}
