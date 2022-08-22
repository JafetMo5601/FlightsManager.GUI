import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Reserva } from '../../interfaces/reserva';
import { Reservations } from '../../interfaces/reservations';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(
    private http: HttpClient,
  ) { }

  getNextReservationsByUser(userId: string): Observable<Array<Reservations>>{
    return this.http.get<Array<Reservations>>(
      environment.apiUrl + `Reservas/next-reserva-usuario?userId=${userId}`, 
      httpOptions);
  }

  getPastReservationsByUser(userId: string): Observable<Array<Reservations>>{
    return this.http.get<Array<Reservations>>(
      environment.apiUrl + `Reservas/past-reserva-usuario?userId=${userId}`, 
      httpOptions);
  }

  getReservationsByUser(userId: string): Observable<Array<Reservations>>{
    return this.http.get<Array<Reservations>>(
      environment.apiUrl + `Reservas/reserva-usuario?userId=${userId}`, 
      httpOptions);
  }

  getReservationsById(reservationId: string): Observable<Reservations>{
    return this.http.get<Reservations>(
      environment.apiUrl + `Reservas/reserva-id?reservaId=${reservationId}`, 
      httpOptions);
  }
}
