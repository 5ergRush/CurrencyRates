import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RatesTableComponent } from "./components/rate-table/rate-table.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RatesTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'CurrencyRates';
}
