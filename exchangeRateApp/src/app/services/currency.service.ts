import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { EnvironmentService } from '../services/environment.service';
import { Currency } from '../shared/Currency';
import { CurrencyResponse } from '../shared/CurrencyResponse';
import { BehaviorSubject, Subject } from 'rxjs';
import { Country } from '../shared/Country';
import { Exchange } from '../shared/Exchange';
import ExchangeResponse from '../shared/ExchangeResponse';


@Injectable({
  providedIn: 'root'
})

export class CurrencyService {


  public selectedCurrency: Subject<Currency> = new Subject<Currency>();
  selectedCurrency$ = this.selectedCurrency.asObservable();

  public exchangeRates: Subject<Exchange[]> = new Subject<Exchange[]>();
  exchangeRates$ = this.exchangeRates.asObservable();

  public availableCurrencies: BehaviorSubject<Currency[]> = new BehaviorSubject<Currency[]>([]);
  availableCurrencies$ = this.availableCurrencies.asObservable();


  constructor(private http: HttpClient, private environmentService: EnvironmentService) {
    this.getAvailableCurrencies();
  }

  currencyIsValid({code, name, symbol}) {
    return ((code && code !== "(none)") && name)
  }

  getAvailableCurrencies() {
    const url = `${this.environmentService.countryApiUrl}/all?fields=currencies`;

    return this.http.get<CurrencyResponse[]>(url).toPromise().then(res => {
      let result: Currency[] = [];
      res.map(array => array.currencies.map(
        currency => {
          if(result.findIndex(existingCurrency => existingCurrency.name === currency.name) === -1) {
            if(this.currencyIsValid(currency)) {
              result.push(currency);
            }
          } else {
          }
        }
      ))
      return result.sort((a,b) => {
       return (a.name < b.name) ? -1 : 1;
      })
    }).then(res => {
      this.availableCurrencies.next(res as Currency[]);
    });
  }

  getCountriesUsingCurrency(currency: Currency) {
    const url = `${this.environmentService.countryApiUrl}/currency/${currency.code}?fields=name;flag`;

    return this.http.get<Country[]>(url).toPromise();
  }

  getExchangeRates(base: Currency) {
    let result: Exchange[] = [];
    const url = `${this.environmentService.currencyApiUrl}base=${base.code}`
    this.http.get<ExchangeResponse>(url).toPromise().then(res => {
      console.log(res.rates);
      for( const [code, exchangeRate] of Object.entries(res.rates)) {
        let rate = exchangeRate as number;
        result.push({code, rate});
      }
      this.exchangeRates.next(result);
    })
    .catch((err: HttpErrorResponse) => {
      this.exchangeRates.next(result);
    })
  }

}
