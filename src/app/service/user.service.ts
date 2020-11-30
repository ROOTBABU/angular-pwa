import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="https://dummy.restapiexample.com/api/v1/employees";
  constructor(private _http:HttpClient) {
  }

  getUserDetails(){
    return this._http.get<any>(this.apiUrl);
  }
}
