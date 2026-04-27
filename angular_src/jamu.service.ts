import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Jamu } from './jamu.model';

@Injectable({
  providedIn: 'root'
})
export class JamuService {
  private http = inject(HttpClient);
  // private apiUrl = 'http://127.0.0.1:8000/api/jamu';

  // Using Mock Data as fallback for layout testing
  getRecommendedToday(): Observable<Jamu> {
    // return this.http.get<Jamu>(`${this.apiUrl}/recommended-today`);
    return of({
      id: 1,
      nama: 'Kunyit Asam',
      foto: 'assets/kunyit_asam.jpg',
      manfaatSingkat: 'Tingkatkan imun tubuh dan segarkan badanmu'
    });
  }

  getRecommendedForYou(): Observable<Jamu[]> {
    // return this.http.get<Jamu[]>(`${this.apiUrl}/recommended-for-you`);
    return of([
      { id: 2, nama: 'Beras Kencur', foto: 'assets/beras_kencur.jpg', manfaatSingkat: 'Penambah Nafsu Makan', harga: 'Rp 15.000' },
      { id: 3, nama: 'Temulawak', foto: 'assets/temulawak.jpg', manfaatSingkat: 'Penyegar Tubuh', harga: 'Rp 12.000' }
    ]);
  }

  getPopularThisWeek(): Observable<Jamu[]> {
    // return this.http.get<Jamu[]>(`${this.apiUrl}/popular`);
    return of([
      { id: 4, nama: 'Wedang Jahe', foto: 'assets/jahe.jpg', manfaatSingkat: 'Penghangat Tubuh', harga: 'Rp 10.000', isPopular: true },
      { id: 5, nama: 'Jamu Pahitan', foto: 'assets/pahitan.jpg', manfaatSingkat: 'Membersihkan Darah', harga: 'Rp 15.000', isPopular: true }
    ]);
  }
}
