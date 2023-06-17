import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  data: any;
  private _url: string = `${environment.apiUrl}estudiante`;
  private _urlC: string = `${environment.apiUrl}coordinador`;
  constructor(
    protected http: HttpClient
  ) { }

  getUsers(): Observable<any> {
    return this.http.get<any[]>(this._url + "/all");
  }

  addUser(usr: any): Observable<any> {
    return this.http.post<any>(this._url, usr);
  }

  updateUser(usr: any): Observable<any> {
    return this.http.put<any>(this._url, usr);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(this._url + "/" + id);
  }

  addUserCoord(usr: any): Observable<any> {
    return this.http.post<any>(this._urlC, usr);
  }

  updateUserCoord(usr: any): Observable<any> {
    return this.http.put<any>(this._urlC, usr);
  }

  logIn(usr: any): Observable<any> {
    return this.http.post<any>(this._url + "/sign-in", usr);
  }

}
