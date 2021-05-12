import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = {};
  private mainProgressBarWait = new BehaviorSubject<boolean[]>([]);
  mainProgressBar = this.mainProgressBarWait.asObservable();

  reset(): void {
    this.data = {};
  }

  set(key: string, value: any): void {
    this.data[key] = value;
  }

  get(): any {
    return this.data;
  }

  showMainProgressBarForMe(): void {
    const temp = this.mainProgressBarWait.getValue();
    temp.push(true);
    this.mainProgressBarWait.next(temp);
  }

  thanksMainProgressBar(): void {
    const temp = this.mainProgressBarWait.getValue();
    temp.pop();
    this.mainProgressBarWait.next(temp);
  }
}
