import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Jamu } from './jamu.model';

@Component({
  selector: 'app-jamu-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Horizontal Mode (Rekomendasi Untukmu) -->
    <div *ngIf="!jamu.isPopular" class="min-w-[150px] max-w-[150px] bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-lg snap-start cursor-pointer hover:ring-2 hover:ring-[#E67E22] transition-all">
      <div class="h-28 bg-[#2C2C2C] flex items-center justify-center relative">
        <span class="text-3xl text-gray-600">🌱</span>
      </div>
      <div class="p-3">
        <h3 class="text-white font-bold text-sm truncate">{{ jamu.nama }}</h3>
        <p class="text-[#E67E22] text-sm font-semibold mt-1">{{ jamu.harga }}</p>
      </div>
    </div>

    <!-- List Mode (Populer Minggu Ini) -->
    <div *ngIf="jamu.isPopular" class="flex gap-4 p-3 bg-[#1E1E1E] rounded-2xl items-center cursor-pointer hover:bg-[#2C2C2C] transition-colors">
      <div class="w-16 h-16 bg-[#2C2C2C] rounded-xl flex shrink-0 items-center justify-center">
         <span class="text-2xl text-gray-500">☕</span>
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-white font-bold text-base">{{ jamu.nama }}</h3>
        <p class="text-gray-400 text-xs mt-1 truncate">{{ jamu.manfaatSingkat }}</p>
        <p class="text-[#E67E22] text-sm font-bold mt-2">{{ jamu.harga }}</p>
      </div>
      <div class="shrink-0 p-2 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  `
})
export class JamuCardComponent {
  @Input() jamu!: Jamu;
}
