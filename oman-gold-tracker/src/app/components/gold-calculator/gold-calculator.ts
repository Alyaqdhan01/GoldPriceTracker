
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LanguageService } from '../../services/language';
import { GoldPriceService } from '../../services/gold-price';
import { GoldPrice } from '../../models/gold.model';

@Component({
  selector: 'app-gold-calculator',
  imports: [FormsModule],
  templateUrl: './gold-calculator.html',
  styleUrl: './gold-calculator.css'
})
export class GoldCalculator implements OnInit {

  goldPrices: GoldPrice[] = [];

  selectedKarat: string = '24K';

  weight: number | null = null;

  result: number | null = null;

  loading = true;

  errorMessage = '';

  constructor(
    public language: LanguageService,
    private goldPriceService: GoldPriceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.goldPriceService.getAllPrices().subscribe({
      next: (prices) => {
        this.goldPrices = prices;
        this.loading = false;

        this.calculate();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load calculator prices:', error);
        this.errorMessage = 'Failed to load gold prices.';
        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }

  calculate(): void {
    const selectedGold = this.goldPrices.find(
      gold => gold.karat === this.selectedKarat
    );

    if (
      selectedGold &&
      this.weight !== null &&
      this.weight > 0
    ) {
      this.result = selectedGold.price * this.weight;
    } else {
      this.result = null;
    }
  }
}
