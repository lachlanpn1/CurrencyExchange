import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyStatsTableComponent } from './currency-stats-table.component';

describe('CurrencyStatsTableComponent', () => {
  let component: CurrencyStatsTableComponent;
  let fixture: ComponentFixture<CurrencyStatsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyStatsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyStatsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
