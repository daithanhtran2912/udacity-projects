import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private isLoading = new BehaviorSubject<boolean>(false);

  get loading$(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  show(): void {
    this.isLoading.next(true);
  }

  hide(): void {
    this.isLoading.next(false);
  }
}
