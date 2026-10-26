
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoldPrice, GoldHistory } from '../models/gold.model';

@Injectable({
  providedIn: 'root'
})
export class GoldPriceService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5244/api/GoldPrices';

  // Get current prices for all karats
  getAllPrices(): Observable<GoldPrice[]> {
    return this.http.get<GoldPrice[]>(this.apiUrl);
  }

  // Get the price for a specific karat
  getPriceByKarat(karat: number): Observable<GoldPrice> {
    return this.http.get<GoldPrice>(`${this.apiUrl}/${karat}`);
  }

  // Get historical gold prices
  getHistory(): Observable<GoldHistory[]> {
    return this.http.get<GoldHistory[]>(
      `${this.apiUrl}/history`
    );
  }
}
