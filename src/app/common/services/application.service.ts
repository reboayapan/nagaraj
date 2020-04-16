import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ApplicationService {
  private _isMainHeaderActive: boolean = false;

  constructor() {}

  _getMainHeaderStatus(): boolean {
    return this._isMainHeaderActive;
  }

  _setMainHeaderStatus(isActive: boolean): void {
    this._isMainHeaderActive = isActive;
  }
}
