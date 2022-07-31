import { Component, OnInit } from '@angular/core';
import { Reservations } from 'src/app/shared/interfaces/reservations';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  current_reservations: Reservations[] = [
    // {
    //   id: 1,
    //   departure_country: 'San Jose, Costa Rica',
    //   arrival_country: 'Paris, France',
    //   departure_date: new Date('Dec 24, 2021 00:00:00'),
    //   arrival_date: new Date('Dec 24, 2021 00:00:00'),
    // },
    // {
    //   id: 1,
    //   departure_country: 'San Jose, Costa Rica',
    //   arrival_country: 'Paris, France',
    //   departure_date: new Date('Dec 24, 2021 00:00:00'),
    //   arrival_date: new Date('Dec 24, 2021 00:00:00'),
    // },
    // {
    //   id: 1,
    //   departure_country: 'San Jose, Costa Rica',
    //   arrival_country: 'Paris, France',
    //   departure_date: new Date('Dec 24, 2021 00:00:00'),
    //   arrival_date: new Date('Dec 24, 2021 00:00:00'),
    // },
    // {
    //   id: 1,
    //   departure_country: 'San Jose, Costa Rica',
    //   arrival_country: 'Paris, France',
    //   departure_date: new Date('Dec 24, 2021 00:00:00'),
    //   arrival_date: new Date('Dec 24, 2021 00:00:00'),
    // },
    // {
    //   id: 1,
    //   departure_country: 'San Jose, Costa Rica',
    //   arrival_country: 'Paris, France',
    //   departure_date: new Date('Dec 24, 2021 00:00:00'),
    //   arrival_date: new Date('Dec 24, 2021 00:00:00'),
    // },
    // {
    //   id: 1,
    //   departure_country: 'San Jose, Costa Rica',
    //   arrival_country: 'Paris, France',
    //   departure_date: new Date('Dec 24, 2021 00:00:00'),
    //   arrival_date: new Date('Dec 24, 2021 00:00:00'),
    // },
    // {
    //   id: 1,
    //   departure_country: 'San Jose, Costa Rica',
    //   arrival_country: 'Paris, France',
    //   departure_date: new Date('Dec 24, 2021 00:00:00'),
    //   arrival_date: new Date('Dec 24, 2021 00:00:00'),
    // },
    // {
    //   id: 1,
    //   departure_country: 'San Jose, Costa Rica',
    //   arrival_country: 'Paris, France',
    //   departure_date: new Date('Dec 24, 2021 00:00:00'),
    //   arrival_date: new Date('Dec 24, 2021 00:00:00'),
    // },
  ]

  

  past_reservations: Reservations[] = [
    {
      id: 1,
      departure_country: 'San Jose, Costa Rica',
      arrival_country: 'Paris, France',
      departure_date: new Date('Dec 24, 2021 00:00:00'),
      arrival_date: new Date('Dec 24, 2021 00:00:00'),
    },
    {
      id: 1,
      departure_country: 'San Jose, Costa Rica',
      arrival_country: 'Paris, France',
      departure_date: new Date('Dec 24, 2021 00:00:00'),
      arrival_date: new Date('Dec 24, 2021 00:00:00'),
    },
    {
      id: 1,
      departure_country: 'San Jose, Costa Rica',
      arrival_country: 'Paris, France',
      departure_date: new Date('Dec 24, 2021 00:00:00'),
      arrival_date: new Date('Dec 24, 2021 00:00:00'),
    },
    {
      id: 1,
      departure_country: 'San Jose, Costa Rica',
      arrival_country: 'Paris, France',
      departure_date: new Date('Dec 24, 2021 00:00:00'),
      arrival_date: new Date('Dec 24, 2021 00:00:00'),
    },
    // {
      // id: 1,
    //   departure_country: 'San Jose, Costa Rica',
    //   arrival_country: 'Paris, France',
    //   departure_date: new Date('Dec 24, 2021 00:00:00'),
    //   arrival_date: new Date('Dec 24, 2021 00:00:00'),
    // },
    // {
      // id: 1,
    //   departure_country: 'San Jose, Costa Rica',
    //   arrival_country: 'Paris, France',
    //   departure_date: new Date('Dec 24, 2021 00:00:00'),
    //   arrival_date: new Date('Dec 24, 2021 00:00:00'),
    // },
    // {
      // id: 1,
    //   departure_country: 'San Jose, Costa Rica',
    //   arrival_country: 'Paris, France',
    //   departure_date: new Date('Dec 24, 2021 00:00:00'),
    //   arrival_date: new Date('Dec 24, 2021 00:00:00'),
    // },
  ]

  constructor() { }

  ngOnInit(): void {
    this.current_reservations.length
  }

}
