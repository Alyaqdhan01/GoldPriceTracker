
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { LanguageService } from '../../services/language';
import { GoldPriceService } from '../../services/gold-price';
import { GoldHistory } from '../../models/gold.model';

@Component({
  selector: 'app-price-trend',
  imports: [],
  templateUrl: './price-trend.html',
  styleUrl: './price-trend.css'
})
export class PriceTrend implements OnInit {
  history: GoldHistory[] = [];

  selectedKarat: '18K' | '21K' | '22K' | '24K' = '24K';

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

  selectKarat(
    karat: '18K' | '21K' | '22K' | '24K'
  ): void {
    this.selectedKarat = karat;
  }

  get prices(): number[] {
    return this.history.map((day) => {
      switch (this.selectedKarat) {
        case '18K':
          return day.price18;
        case '21K':
          return day.price21;
        case '22K':
          return day.price22;
        case '24K':
          return day.price24;
      }
    });
  }

  get currentPrice(): number {
    return this.prices.at(-1) ?? 0;
  }

  get previousPrice(): number {
    return this.prices.at(-2) ?? 0;
  }

  get highestPrice(): number {
    return this.prices.length
      ? Math.max(...this.prices)
      : 0;
  }

  get lowestPrice(): number {
    return this.prices.length
      ? Math.min(...this.prices)
      : 0;
  }

  get priceChange(): number {
    return this.currentPrice - this.previousPrice;
  }

  get chartPoints(): string {
    const prices = this.prices;

    if (prices.length < 2) {
      return '';
    }

    const width = 800;
    const height = 250;
    const padding = 20;

    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;

    return prices.map((price, index) => {
      const x =
        padding +
        (index / (prices.length - 1)) *
          (width - padding * 2);

      const y =
        height -
        padding -
        ((price - min) / range) *
          (height - padding * 2);

      return `${x},${y}`;
    }).join(' ');
  }
}
