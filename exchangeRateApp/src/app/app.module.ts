import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {CurrencyPickerComponent } from './components/currency-picker/currency-picker.component';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EnvironmentService } from './services/environment.service';
import { CurrencyOverviewComponent } from './components/currency-overview/currency-overview.component';
import { CurrencyStatsContainerComponent } from './components/currency-stats/currency-stats-container/currency-stats-container.component';
import { CurrencyStatsTableComponent } from './components/currency-stats/currency-stats-table/currency-stats-table.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyPickerComponent,
    CurrencyOverviewComponent,
    CurrencyStatsContainerComponent,
    CurrencyStatsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [EnvironmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
