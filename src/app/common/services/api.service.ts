import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  
  private loginUrl = "http://localhost:9090/login";
  private signUpUrl = "http://localhost:9090/signup";
  private _saveGroomDetailURL = "http://localhost:9090/groomdetail";
  private _getGroomDetailById = "http://localhost:9090/groomdetail/9172";

  userMobNumData: BehaviorSubject<any> = new BehaviorSubject({});

  private isLoggedIn = new BehaviorSubject<boolean>(false);

  isLog = this.isLoggedIn.asObservable();

  userMobNum : string;


  constructor(private httpClient: HttpClient) {}

  checkIsLogged(isUserLogged: boolean){
    this.isLoggedIn.next(isUserLogged);
  }

  dataStored(data) {
    this.userMobNum = data;
    this.userMobNumData.next(this.userMobNum);
  }

  doLogin(loginform: any): Observable<any> {
    let httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    let options = {
      headers: httpHeaders
    };
    return this.httpClient.post(
      this.loginUrl,
      JSON.stringify(loginform.value),
      options
    );
  }

  doSignUp(signUpform: any): Observable<any> {
    let httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    let options = {
      headers: httpHeaders
    };
    return this.httpClient.post(
      this.signUpUrl,
      JSON.stringify(signUpform.value),
      options
    );
  }

   saveGroomDetail(groomdetail: FormData): Observable<any> {
    let httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    let options = {
      headers: httpHeaders
    };

    let params = new HttpParams();
   
    params = params.append("userMobNum", this.userMobNum);
    return this.httpClient.put(
      this._saveGroomDetailURL,
      // JSON.stringify(groomdetail.value),
      groomdetail
      // options
    //  { params: params
    //   }
    );
  }

  getGroomDetail(id:number): Observable<any>{

    // return this.http.get(`${this.baseUrl}/student/${id}`);  
    return this.httpClient.get(this._getGroomDetailById);
  }
  

  
}
