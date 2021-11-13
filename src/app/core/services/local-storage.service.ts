import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public setLocation(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getLocation(key: string): string[] {
    return JSON.parse(localStorage.getItem(key) as string);
  }

  public clear(): void {
    localStorage.clear();
  }
}
