import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationsService } from 'src/app/shared/http-services/utils/reservations.service';
import { Reservations } from 'src/app/shared/interfaces/reservations';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {
  reservataion_number: string = '';
  reservation_object: Reservations | undefined;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationsService
  ) { }

  ngOnInit(): void {
    this.reservataion_number = this.route.snapshot.paramMap.get('id')!;
    this.reservationService.getReservationsById(this.reservataion_number).subscribe(
      data => {
        this.reservation_object = data;
      },
      err => {}
    );
  }

}
