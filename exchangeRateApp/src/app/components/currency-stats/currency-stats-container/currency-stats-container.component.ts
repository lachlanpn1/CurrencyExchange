import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service';
import { Currency } from 'src/app/shared/Currency';

@Component({
  selector: 'app-currency-stats-container',
  templateUrl: './currency-stats-container.component.html',
  styleUrls: ['./currency-stats-container.component.scss']
})
export class CurrencyStatsContainerComponent implements OnInit, OnDestroy {

  constructor(private currencyService: CurrencyService) { }

  currencySubscription: Subscription
  selectedCurrency: Currency;

  ngOnInit(): void {
    this.currencySubscription = this.currencyService.selectedCurrency.subscribe(currency => {
      this.selectedCurrency = currency;
    })
  }

  ngOnDestroy() {
    this.currencySubscription.unsubscribe();
  }

}
