import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private _http: HttpClient) { }

    /**
     * Function to perform http get method
     * @param {string} url
     * @returns {Observable<any>}
     */
    getService(url: string): Observable<any> {
        return this._http.get(url, this._getHttpHeaders())
            .pipe(catchError(this.handleError));
    }

    /**
     * Function to perform http get method
     * @param {string} url
     * @returns {Observable<any>}
     */
    postService(url: string, data: any): Observable<any> {
        return this._http.post(url, data, this._getHttpHeaders())
            .pipe(catchError(this.handleError));
    }

    /**
     * Common function to set access token and headers option
     * for http rest calls
     */
    private _getHttpHeaders(): object {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return { headers: headers };
    }

    /**
     * Function to handle http errors like 404, 500
     * @param {HttpErrorResponse} error
     */
    private handleError(error: HttpErrorResponse) {
        let errMsgObj = { status: error.status, statusTxt: error.statusText, statusMsg: error.message }
        return throwError(errMsgObj);
    };

}