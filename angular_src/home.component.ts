import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { JamuService } from './jamu.service';
import { JamuCardComponent } from './jamu-card.component';
import { BenefitChipComponent } from './benefit-chip.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, JamuCardComponent, BenefitChipComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private jamuService = inject(JamuService);

  // User State
  userName = 'Andi';
  streakDays = 7;

  // RxJS converted to Angular 18 Signals for elegant template binding
  recommendedToday = toSignal(this.jamuService.getRecommendedToday());
  recommendedForYou = toSignal(this.jamuService.getRecommendedForYou(), { initialValue: [] });
  popularThisWeek = toSignal(this.jamuService.getPopularThisWeek(), { initialValue: [] });

  // Static Data
  categories = [
    { label: 'Tambah Stamina', icon: '💪' },
    { label: 'Imun Tubuh', icon: '🛡️' },
    { label: 'Pencernaan Lancar', icon: '🍃' },
    { label: 'Hilangkan Pegal', icon: '🧘' },
    { label: 'Atasi Pilek', icon: '😷' },
    { label: 'Segarkan Badan', icon: '✨' },
  ];

  setReminder() {
    alert('Pengingat meminum jamu telah diaktifkan!');
  }
}
