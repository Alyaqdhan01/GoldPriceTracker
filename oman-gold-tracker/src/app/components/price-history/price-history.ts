
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { LanguageService } from '../../services/language';
import { GoldPriceService } from '../../services/gold-price';
import { GoldHistory } from '../../models/gold.model';

@Component({
  selector: 'app-price-history',
  imports: [],
  templateUrl: './price-history.html',
  styleUrl: './price-history.css'
})
export class PriceHistory implements OnInit {
  history: GoldHistory[] = [];

  loading = true;
  errorMessage = '';

  constructor(
    public language: LanguageService,
    private goldPriceService: GoldPriceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.goldPriceService.getHistory().subscribe({
      next: (history) => {
        this.history = history;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load price history:', error);
        this.errorMessage = 'Failed to load price history.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
