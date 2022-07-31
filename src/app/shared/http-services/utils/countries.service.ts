import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Countries } from '../../interfaces/countries';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(
    private http: HttpClient,
  ) { }

  getCountries(): Observable<Array<Countries>>{
    return this.http.get<Array<Countries>>(
      environment.apiUrl + 'Pais/paises', 
      httpOptions);
  }

  getCountriesFiltered(paisToExcept: string): Observable<Array<Countries>>{
    return this.http.get<Array<Countries>>(
      environment.apiUrl + `Pais/paises-except?nombrePais=${paisToExcept}`, 
      httpOptions);
  }
}
