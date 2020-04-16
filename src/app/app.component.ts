import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ApplicationService } from "./common/services/application.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private _applicationService: ApplicationService) {}
  get _canShowMainHeader() {
    return this._applicationService._getMainHeaderStatus();
  }

  // TODO:

  // INIT -> this.service._isHeaderActive = true
  // Destroy -> this.service._isHeaderActive = false
}
