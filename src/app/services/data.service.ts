import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = {};
  private mainProgressBar = new BehaviorSubject<boolean[]>([]);
  mainProgressBar$ = this.mainProgressBar.asObservable();

  private userInfo = new BehaviorSubject<any>(null);
  userInfo$ = this.userInfo.asObservable();

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
    const temp = this.mainProgressBar.getValue();
    temp.push(true);
    this.mainProgressBar.next(temp);
  }

  thanksMainProgressBar(): void {
    const temp = this.mainProgressBar.getValue();
    temp.pop();
    this.mainProgressBar.next(temp);
  }

  setUserInfo(info: any): void {
    this.userInfo.next(info);
  }

}
