import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public setLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getLocalStorage(key: string): any[] {
    return JSON.parse(localStorage.getItem(key) as string);
  }

  public clear(): void {
    localStorage.clear();
  }
}
