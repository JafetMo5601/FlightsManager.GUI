import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {
  arrivalCountry: string = 'Lima, Peru'
  departureCountry: string = 'San Jose, Costa Rica'
  orderNumber: string = 'LL09123A'
  arrivalDate: string = '2022-08-25 07:00:00.0000000'
  departureDate: string = '2022-08-25 08:00:00.0000000'

  constructor() { }

  ngOnInit(): void {
  }

}
