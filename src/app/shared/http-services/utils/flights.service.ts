import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Aerolinea } from '../../interfaces/aerolinea';
import { Aeropuerto } from '../../interfaces/aeropuerto';
import { Asientos } from '../../interfaces/asientos';
import { Avion } from '../../interfaces/aviones';
import { Horario } from '../../interfaces/horario';
import { Tarifa } from '../../interfaces/tarifa';
import { Vuelo } from '../../interfaces/vuelo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(
    private http: HttpClient,
  ) { }

  getFlights(): Observable<Array<Vuelo>>{
    return this.http.get<Array<Vuelo>>(
      environment.apiUrl + 'Vuelos/vuelos', 
      httpOptions);
  }

  getAsientos(): Observable<Array<Asientos>>{
    return this.http.get<Array<Asientos>>(
      environment.apiUrl + 'Vuelos/asientos', 
      httpOptions);
  }

  getAviones(): Observable<Array<Avion>>{
    return this.http.get<Array<Avion>>(
      environment.apiUrl + 'Vuelos/aviones', 
      httpOptions);
  }

  getAerolineas(): Observable<Array<Aerolinea>>{
    return this.http.get<Array<Aerolinea>>(
      environment.apiUrl + 'Vuelos/aerolineas', 
      httpOptions);
  }

  getAeropuertos(): Observable<Array<Aeropuerto>>{
    return this.http.get<Array<Aeropuerto>>(
      environment.apiUrl + 'Vuelos/aeropuertos', 
      httpOptions);
  }

  getTarifas(): Observable<Array<Tarifa>>{
    return this.http.get<Array<Tarifa>>(
      environment.apiUrl + 'Vuelos/tarifas', 
      httpOptions);
  }

  getHorarios(): Observable<Array<Horario>>{
    return this.http.get<Array<Horario>>(
      environment.apiUrl + 'Vuelos/horarios', 
      httpOptions);
  }

  getNextFlights(): Observable<Array<Vuelo>>{
    return this.http.get<Array<Vuelo>>(
      environment.apiUrl + 'Vuelos/next-vuelos', 
      httpOptions);
  }
}
