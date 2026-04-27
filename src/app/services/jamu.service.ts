import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JamuService {
  // Koneksi ke Laravel dihapus

  constructor() {}

  getHomeData(): Observable<any> {
    // Kembalikan data dummy lokal
    return of({
      success: true,
      data: {
        recommended: [
          { name: 'Kunyit Asam', benefit: 'Menyegarkan tubuh', image: 'assets/jamu/kunyit.jpg' },
          { name: 'Beras Kencur', benefit: 'Menghilangkan pegal', image: 'assets/jamu/beras_kencur.jpg' }
        ],
        popular: [
          { name: 'Temulawak', benefit: 'Menambah nafsu makan', image: 'assets/jamu/temulawak.jpg' }
        ]
      }
    });
  }
}
