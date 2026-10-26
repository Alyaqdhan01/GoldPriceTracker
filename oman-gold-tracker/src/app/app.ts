
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { PriceCard } from './components/price-card/price-card';
import { GoldCalculator } from './components/gold-calculator/gold-calculator';
import { PriceTrend } from './components/price-trend/price-trend';
import { PriceHistory } from './components/price-history/price-history';
import { Footer } from './components/footer/footer';

import { LanguageService } from './services/language';
import { GoldPriceService } from './services/gold-price';
import { GoldPrice } from './models/gold.model';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Hero,
    PriceCard,
    GoldCalculator,
    PriceTrend,
    PriceHistory,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  goldPrices: GoldPrice[] = [];
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
        console.log('Prices received:', prices);

        this.goldPrices = prices;
        this.loading = false;

        this.cdr.detectChanges();

        console.log('Loading after response:', this.loading);
        console.log('Gold prices count:', this.goldPrices.length);
       },
      error: (error) => {
        console.error('Failed to load gold prices:', error);
        this.errorMessage = 'Failed to load gold prices. Please try again.';
        this.loading = false;
      }
    });
  }
}