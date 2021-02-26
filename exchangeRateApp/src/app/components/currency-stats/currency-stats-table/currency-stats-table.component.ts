import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service';
import { Currency } from 'src/app/shared/Currency';
import { Exchange } from 'src/app/shared/Exchange';

@Component({
  selector: 'app-currency-stats-table',
  templateUrl: './currency-stats-table.component.html',
  styleUrls: ['./currency-stats-table.component.scss']
})

export class CurrencyStatsTableComponent implements OnInit, OnChanges, OnDestroy {

  exchangeRates: Exchange[];
  exchangeRatesTable1: Exchange[];
  exchangeRatesTable2: Exchange[];

  currencies: Currency[];

  exchangeRatesError : string = undefined;

  @Input() selectedCurrency: Currency;

  exchangeRatesSubscription: Subscription;
  currenciesSubscription: Subscription;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.exchangeRatesSubscription = this.currencyService.exchangeRates.subscribe({
      next: result =>
      {
        this.exchangeRates = result;
        this.splitTable();
        if(result.length === 0) {
          this.exchangeRatesError = "Not supported.";
        } else {
          this.exchangeRatesError = undefined;
        }
      },
    });
    this.currenciesSubscription = this.currencyService.availableCurrencies.subscribe({
      next: result => {
        this.currencies = result;
      }
    })
  }

  getCurrencyName(code: string) {
    console.log(`code: ${code}`);
    if(this.currencies) {
      return this.currencies.find(currency => currency.code === code).name;
    }
  }

  ngOnChanges() {
    this.currencyService.getExchangeRates(this.selectedCurrency);
  }

  ngOnDestroy() {
    this.exchangeRatesSubscription.unsubscribe();
    this.currenciesSubscription.unsubscribe();
  }

  splitTable() {
    let length = this.exchangeRates.length;
    this.exchangeRatesTable1 = this.exchangeRates.slice(0, (length / 2));
    this.exchangeRatesTable2 = this.exchangeRates.slice((length / 2) + 1, length - 1)
  }


}
