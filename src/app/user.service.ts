import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { LoginDetails } from './login-details';
import { UnlockDetails } from './unlock-details';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl='http://localhost:9090/user-management';

  constructor(private httpClient:HttpClient) {

  }

  getAllCountries():Observable<Map<number,string>>{
    return this.httpClient.get<Map<number,string>>(`${this.baseUrl}/countries`);
  }

  
  getStatesByCountryId(countryId:number):Observable<Map<number,string>>{
    return this.httpClient.get<Map<number,string>>(`${this.baseUrl}/states/${countryId}`);
  }
  getCitiesByStateId(stateId:number):Observable<Map<number,string>>{
    return this.httpClient.get<Map<number,string>>(`${this.baseUrl}/cities/${stateId}`);
  }

  createUser(user:User):Observable<string>{
    return this.httpClient.post(`${this.baseUrl}/user`,user,{responseType:"text"});
  }
  unlockUserAccount(unlockDetails:UnlockDetails):Observable<string>{
    return this.httpClient.post(`${this.baseUrl}/unlock-user`,unlockDetails,{responseType:"text"});
  }
  loginUserAccount(loginDetails:LoginDetails):Observable<string>{
    return this.httpClient.post(`${this.baseUrl}/login-user`,loginDetails,{responseType:"text"});
  }
  sendPaswdToEmail(email:string){
    return this.httpClient.post(`${this.baseUrl}/forgot-passwd/${email}`,{responseType:"text"});
  }
  checkEmailDuplicacy(email:string){
    return this.httpClient.post(`${this.baseUrl}/email/${email}`,{responseType:"text"});
  }

  
}
