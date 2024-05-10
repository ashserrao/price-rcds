import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  constructor(private _http: HttpClient) {}

  getPrimeData(): Observable<any> {
    return this._http.get('//put your live link in here');
  }

  postRcdData(data: any): Observable<any>{
    return this._http.post('http://localhost:3000/nifty_50', data);
  }
}
