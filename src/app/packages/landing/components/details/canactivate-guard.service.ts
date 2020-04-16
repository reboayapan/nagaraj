import { CanActivate } from "@angular/router";

class AlwaysAuthGuard implements CanActivate {
    canActivate() {
      console.log("AlwaysAuthGuard");
      return true;
    }
  } 