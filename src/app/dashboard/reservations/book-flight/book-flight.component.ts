import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomPopUpService } from 'src/app/shared/components/custom-pop-up/custom-pop-up.service';
import { TokenStorageService } from 'src/app/shared/http-services/authorization/token-storage.service';
import { FlightsService } from 'src/app/shared/http-services/utils/flights.service';
import { Vuelo } from 'src/app/shared/interfaces/vuelo';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {
  reservataion_number: string = '';
  reservation_object: Vuelo | undefined;

  constructor(
    private customPopUpService: CustomPopUpService,
    private route: ActivatedRoute,
    private flightService: FlightsService,
    private tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.reservataion_number = this.route.snapshot.paramMap.get('id')!;
    this.flightService.getFlightById(this.reservataion_number).subscribe(
      data => {
        this.reservation_object = data;
      },
      err => {}
    );
  }

  public cancelPopUp() {
    this.customPopUpService.confirm(
      'Cancelacion', 
      '¿Desea cancelar la reservacion y volver a la seccion de vuelos?',
      '/home/next-flights'
      );
  }

  public confirmPopUp() {
    this.flightService.createReservation(this.reservataion_number, this.tokenService.getUserId()).subscribe(
      data => {
        if (data.status === 'Success') {
          this.customPopUpService.confirm(
            'Reservacion', 
            '¡Vuelo reservado exitosamente! Puedes encontrar la informacion en la seccion de reservaciones',
            '/home/reservations'
            );
        } else {
          this.customPopUpService.confirm(
            'Reservacion', 
            'Hubo un problema realizando la reservacion, intente mas tarde o contacte administracion',
            '/home/reservations'
            );
        }
      }, 
      err => {
        if (err.status === 'Success') {
          this.customPopUpService.confirm(
            'Reservacion', 
            '¡Vuelo reservado exitosamente! Puedes encontrar la informacion en la seccion de reservaciones',
            '/home/reservations'
            );
        } else {
          this.customPopUpService.confirm(
            'Reservacion', 
            'Hubo un problema realizando la reservacion, intente mas tarde o contacte administracion',
            '/home/reservations'
            );
        }
      }
    );
  }

}
