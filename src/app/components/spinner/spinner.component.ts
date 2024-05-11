import { Component, OnDestroy } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent implements OnDestroy {
  loading: boolean = false;
  private subscription: Subscription;

  constructor(private spinnerService: SpinnerService) {
    this.subscription = this.spinnerService.loading$.subscribe(
      (loading) => (this.loading = loading)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
