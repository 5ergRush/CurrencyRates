import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Rate } from '../../models/rate.model';
import { RatesService } from '../../services/rates.service';
import { CommonModule } from '@angular/common';
import { first, Observable } from 'rxjs';

@Component({
  selector: 'app-rate-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rate-table.component.html',
  styleUrl: './rate-table.component.scss',
  changeDetection : ChangeDetectionStrategy.OnPush
})

export class RatesTableComponent implements OnInit {
  rates$ = new Observable<Rate[]>();

  constructor(private ratesService: RatesService) { }

  ngOnInit(): void {
    this.rates$ = this.ratesService.getRates();
  }

  trackBySymbol(index: number, rate: Rate) {
    return rate.symbol;
  }
}