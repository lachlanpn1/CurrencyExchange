import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Currency } from 'src/app/shared/Currency';
import {CurrencyService} from '../../services/currency.service';

@Component({
  selector: 'app-currency-picker',
  templateUrl: './currency-picker.component.html',
  styleUrls: ['./currency-picker.component.scss']
})
export class CurrencyPickerComponent implements OnInit, OnDestroy {

  currency = new FormControl();
  currencies: Currency[] = [];
  selectedCurrency: Currency;
  currencySubscription: Subscription;


  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencySubscription = this.currencyService.availableCurrencies.subscribe({next: availableCurrencies => {
      this.currencies = availableCurrencies;
    }});
  }

  setSelectedCurrency() {
    this.currencyService.selectedCurrency.next(this.selectedCurrency);
  }

  ngOnDestroy() {
    this.currencySubscription.unsubscribe();
  }

}
