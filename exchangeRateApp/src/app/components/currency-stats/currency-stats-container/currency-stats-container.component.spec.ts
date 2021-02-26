import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyStatsContainerComponent } from './currency-stats-container.component';

describe('CurrencyStatsContainerComponent', () => {
  let component: CurrencyStatsContainerComponent;
  let fixture: ComponentFixture<CurrencyStatsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyStatsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyStatsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
