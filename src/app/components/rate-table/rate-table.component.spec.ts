import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatesTableComponent } from './rate-table.component';
import { RatesService } from '../../services/rates.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('RatesTableComponent', () => {
  let component: RatesTableComponent;
  let fixture: ComponentFixture<RatesTableComponent>;
  let ratesServiceSpy: jasmine.SpyObj<RatesService>;

  // create a mock RatesService with a getRates() method that returns an Observable
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('RatesService', ['getRates']);

    await TestBed.configureTestingModule({
      imports: [RatesTableComponent],
      providers: [
        { provide: RatesService, useValue: spy }
      ]
    }).compileComponents();

    ratesServiceSpy = TestBed.inject(RatesService) as jasmine.SpyObj<RatesService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display rates in the table', () => {
    // create some test rates and make the getRates() method return these test rates
    const testRates = [
      { time: new Date(), symbol: 'EURUSD', bid: 1.1234, ask: 1.1235 },
      { time: new Date(), symbol: 'GBPUSD', bid: 1.3456, ask: 1.3457 }
    ];

    ratesServiceSpy.getRates.and.returnValue(of(testRates));

    // detect changes so that the component is updated
    fixture.detectChanges();

    // get all the table rows
    const rows = fixture.debugElement.queryAll(By.css('table tr'));

    // check that the number of rows is correct
    expect(rows.length).toBe(testRates.length + 1);

    // loop through all the rows except the first one (which is the header row)

    // Note: We could just go with the content of the first row and hardcode it for the sake of this test task
    // however in a real project it's a good idea to use actual data, as it can be updated in the future by someone
    // who doesn't necessarily have the context of the original test, and this will prevent future problems at the cost of
    // a minor performance hit on the test (we don't expect a large number of updates in a test).

    for (let i = 1; i < rows.length; i++) {
      // get all the cells in the current row
      const cells = rows[i].queryAll(By.css('td'));

      // get the current test rate
      const testRate = testRates[i - 1];

      // check that the symbol, bid, ask, and time are displayed correctly
      expect(cells[0].nativeElement.textContent).toContain(testRate.symbol);
      expect(cells[1].nativeElement.textContent).toContain(testRate.bid.toString());
      expect(cells[2].nativeElement.textContent).toContain(testRate.ask.toString());
      expect(cells[3].nativeElement.textContent).toContain(testRate.time.toLocaleString());
    }
  });
});

