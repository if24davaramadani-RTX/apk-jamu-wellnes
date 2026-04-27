import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-benefit-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-2 px-4 py-2 bg-[#1E1E1E] rounded-full border border-gray-700/50 whitespace-nowrap cursor-pointer hover:bg-gray-800 transition-colors">
      <span class="text-xl">{{icon}}</span>
      <span class="text-white text-sm font-medium">{{label}}</span>
    </div>
  `
})
export class BenefitChipComponent {
  @Input() icon: string = '🌿';
  @Input() label: string = '';
}
