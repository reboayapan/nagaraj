// import { ApiService } from './../../service/api.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import { FullDetailsComponent } from './full-details.component';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class DetailsCanDeactivateGuardService  implements CanActivate {
 istrue:boolean =false;
    constructor(
       
        // private apiService: ApiService , 
        private _router: Router
      ) {}
    
    canActivate() {
      console.log("AlwaysAuthGuard");
      // this.apiService.isLog.subscribe(messgage =>
      //   this.istrue=messgage)
      //   console.log(this.istrue);
      //   if (this.istrue) {
      //       return true;
      //   } else {
      //       window.alert(":)Kindly login first");
      //       this._router.navigate(['/home']);
            return false;
      //   }
    }
  }
