import { TestBed } from '@angular/core/testing';
import { RatesService } from './services/rates.service';
import { take, toArray } from 'rxjs/operators';

describe('Performance Tests', () => {
  let service: RatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RatesService]
    });
    service = TestBed.inject(RatesService);
    // Set the default timeout interval to 10 seconds as the performance tests can take
    // a long time due to the frequency of updates.
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  // Test that the service can handle high-frequency updates
  it('should handle high-frequency updates', (done) => {
    // Set the update frequency to 40 updates per second the test duration to 5 seconds
    const updateFrequency = 40;
    const testDuration = 5000;
    const expectedUpdates = testDuration / updateFrequency;

    let updateCount = 0;
    // Create an interval that will trigger updates at the specified frequency
    const interval = setInterval(() => {
      const rate = {
        time: new Date(),
        symbol: 'EURUSD',
        bid: 1.1234 + Math.random() * 0.01,
        ask: 1.2345 + Math.random() * 0.01
      };
      service['ratesSubject$'].next(rate);
      updateCount++;
    }, updateFrequency);

    // Subscribe to the getRates() observable and take the specified number of updates,
    // then check if the number of updates is correct
    service.getRates().pipe(
      take(expectedUpdates),
      toArray()
    ).subscribe({
      next: updates => {
        clearInterval(interval);
        expect(updates.length).toBeGreaterThanOrEqual(expectedUpdates - 1);
        expect(updateCount).toBeGreaterThanOrEqual(expectedUpdates);
        done();
      },
      error: error => {
        clearInterval(interval);
        done.fail(error);
      },
      complete: () => {
        // do nothing
      }
    });

  });
});