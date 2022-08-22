import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/shared/http-services/authorization/token-storage.service';
import { ReservationsService } from 'src/app/shared/http-services/utils/reservations.service';
import { Reservations } from 'src/app/shared/interfaces/reservations';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  current_reservations: Reservations[] = []
  past_reservations: Reservations[] = []
  user_id: string = '';

  constructor(
    private reservasService: ReservationsService,
    private storage: TokenStorageService
  ) {
    this.user_id = this.storage.getUserId();
  }

  ngOnInit(): void {
    this.reservasService.getNextReservationsByUser(this.user_id).subscribe(
      data => {
        this.current_reservations = data;
      },
      err => {}
    );

    this.reservasService.getPastReservationsByUser(this.user_id).subscribe(
      data => {
        this.past_reservations = data;
      },
      err => {}
    );
  }

}
