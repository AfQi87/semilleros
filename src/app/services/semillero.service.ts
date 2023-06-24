import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SemilleroService {
  
  private _url: string = `${environment.apiUrl}semillero`;

  constructor(
    protected http: HttpClient
  ) { }

  getLst(): Observable<any> {
    return this.http.get<any[]>(this._url);
  }

  addData(usr: any): Observable<any> {
    return this.http.post<any>(this._url, usr);
  }

  updateData(usr: any): Observable<any> {
    return this.http.put<any>(this._url, usr);
  }

  deleteData(id: any): Observable<any> {
    return this.http.delete(this._url + "/" + id);
  }

  getListLinea(): Observable<any> {
    return this.http.get<any[]>(this._url + "/linea");
  }
}
