import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from '../shared/materials/materials.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/http-services/authorization/auth.guard';
import { FlightReservationsComponent } from './flight-reservations/flight-reservations.component';
import { NextFlightsComponent } from './next-flights/next-flights.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { BookFlightComponent } from './reservations/book-flight/book-flight.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { AdminGuard } from '../shared/http-services/authorization/admin.guard';



@NgModule({
  declarations: [
  
    HomeComponent,
       FlightReservationsComponent,
       NextFlightsComponent,
       ReservationsComponent,
       ReservationDetailsComponent,
       BookFlightComponent,
       AdministratorComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    MaterialsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'create-reservation',
            component: FlightReservationsComponent,
          },
          {
            path: 'next-flights',
            component: NextFlightsComponent,
          },
          {
            path: 'reservations',
            component: ReservationsComponent,
          },
          {
            path: 'reservation/:id',
            component: ReservationDetailsComponent,
          },
          {
            path: 'booking/:id',
            component: BookFlightComponent,
          },
          {
            path: 'admin',
            component: AdministratorComponent,
            // canActivate: [AdminGuard]
          },
          { path: '**', component: NextFlightsComponent},
          { path: '', redirectTo: 'home', pathMatch: 'full'}
        ]
      }
    ])
  ]
})
export class DashboardModule { }
