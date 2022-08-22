import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPopUpService } from 'src/app/shared/components/custom-pop-up/custom-pop-up.service';
import { FlightsService } from 'src/app/shared/http-services/utils/flights.service';
import { Vuelo } from 'src/app/shared/interfaces/vuelo';


@Component({
  selector: 'app-next-flights',
  templateUrl: './next-flights.component.html',
  styleUrls: ['./next-flights.component.css']
})
export class NextFlightsComponent implements OnInit {
  displayedColumns: string[] = ['airport_departure', 'airport_arrival', 'avion', 'class', 'price', 'actions'];
  flights: Array<Vuelo> = []
  dataSource = new MatTableDataSource(this.flights);

  constructor(
    private customPopUpService: CustomPopUpService,
    private flightService: FlightsService
  ) { }

  ngOnInit(): void {
    this.flightService.getNextFlights().subscribe(
      data => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
      },
      err => {
        this.openCustomPopUp('Hubo un error contactando los servidores, contacte a los administradores.', '/home')
      }
    )
  }
  

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openCustomPopUp(message: string, link: string | undefined = undefined) {
    this.customPopUpService.confirm(
      'Reservaciones', 
      message,
      link
      );
  }
}
