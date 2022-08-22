import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Aerolinea } from '../../interfaces/aerolinea';
import { Aeropuerto } from '../../interfaces/aeropuerto';
import { Asientos } from '../../interfaces/asientos';
import { Avion } from '../../interfaces/aviones';
import { Horario } from '../../interfaces/horario';
import { HttpResponse } from '../../interfaces/http-response';
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

  getFlightById(vueloId: string): Observable<Vuelo>{
    return this.http.get<Vuelo>(
      environment.apiUrl + `Vuelos/vuelo-id?vueloId=${vueloId}`, 
      httpOptions);
  }

  createReservation(vueloId: string, userId: string): Observable<HttpResponse>{
    return this.http.post<HttpResponse>(
      environment.apiUrl + `Reservas/reserva-upsert?vueloId=${vueloId}&pasajeroId=${userId}&reservaId=0`, 
      httpOptions);
  }
  
  createFlight(
    idAvion: number, 
    idAeropuertoPartida: number,
    idAeropuertoDestino: number,
    idHorario: number,
    idTarifa: number): Observable<HttpResponse>{
    return this.http.post<HttpResponse>(
      environment.apiUrl + 'Vuelos/vuelo', 
      {
        idAvion: idAvion,
        idAeropuertoPartida: idAeropuertoPartida,
        idAeropuertoDestino: idAeropuertoDestino,
        idHorario: idHorario,
        idTarifa: idTarifa
      },
      httpOptions);
  }

  getAirportsFiltered (airportName: string): Observable<Array<Aeropuerto>>{
    return this.http.get<Array<Aeropuerto>>(
      environment.apiUrl + `Vuelos/airport-except?airportName=${airportName}`,
      httpOptions
    )
  }
}
