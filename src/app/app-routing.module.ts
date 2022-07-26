import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './shared/http-services/authorization/auth.guard';
import { LoggedInGuard } from './shared/http-services/authorization/logged-in.guard';
import { FlightReservationsComponent } from './dashboard/flight-reservations/flight-reservations.component';
import { NextFlightsComponent } from './dashboard/next-flights/next-flights.component';
import { ReservationsComponent } from './dashboard/reservations/reservations.component';



const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./dashboard/dashboard.module').then(d => d.DashboardModule), 
    canActivate: [AuthGuard]
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./authentication/authentication.module').then(a => a.AuthenticationModule),
    canActivate: [LoggedInGuard]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
