import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="https://dummy.restapiexample.com/api/v1/employees";
  mediumUrl = "https://medium.com/me/settings";

  constructor(private _http:HttpClient) {
  }

  getUserDetails(){
    return this._http.get<any>(this.apiUrl);
  }
  getBookUserDetails():Observable<any>{
    //const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    return this._http.get<any>(this.mediumUrl,requestOptions);
  }
  updateData(){
    let body ={"email":"vikas25019123@gmail.com"}
    const headers = new HttpHeaders().set('X-XSRF-Token','123');

    return this._http.put<any>("https://medium.com/me/email",body);
  }
}
