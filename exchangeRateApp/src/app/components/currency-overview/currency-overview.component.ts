import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service';
import { Country } from 'src/app/shared/Country';
import { Currency } from 'src/app/shared/Currency';

@Component({
  selector: 'app-currency-overview',
  templateUrl: './currency-overview.component.html',
  styleUrls: ['./currency-overview.component.scss']
})
export class CurrencyOverviewComponent implements OnInit, OnDestroy {


  users: Country[];

  usersToDisplay;
  maximumUsersToDisplay = 5;

  selectedCurrency: Currency = undefined;
  currencySubscription: Subscription;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencySubscription = this.currencyService.selectedCurrency.subscribe(currency => {
      this.selectedCurrency = currency;

      this.currencyService.getCountriesUsingCurrency(currency).then(users => {
        this.users = users;
        this.calculateUsersToDisplay();
      })
    })
  }

  calculateUsersToDisplay() {
    if(this.users) {
      if(this.users.length > this.maximumUsersToDisplay) {
        this.usersToDisplay = this.users.slice(0,this.maximumUsersToDisplay);
      } else {
        this.usersToDisplay = this.users;
      }
    }
  }

  increaseMaximumUsersToDisplay(amount) {
    this.maximumUsersToDisplay += amount;
    this.calculateUsersToDisplay();
  }

  ngOnDestroy() {
    this.currencySubscription.unsubscribe();
  }

}
