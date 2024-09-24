// src/app/services/rate.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { RatesService } from './rates.service';
import { Observable } from 'rxjs';

describe('RateService', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [RatesService],
    });
  });

  it('should fetch rates', () => {
    const service = TestBed.inject(RatesService);
    const rates = service.getRates();
    expect(rates).toBeInstanceOf(Observable);
  });
});