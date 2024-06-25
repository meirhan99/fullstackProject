import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllQuestionsComponent } from './components/questions/all-questions/all-questions.component';
import { AllBranchesComponent } from './components/branches/all-branches/all-branches.component';
import { AllReportsComponent } from './components/reports/all-reports/all-reports.component';
import { AllDestinationsComponent } from './components/destinations/all-destinations/all-destinations.component';
import { AllPublicActivitiesComponent } from './components/publicActivities/all-public-activities/all-public-activities.component';
import { AllBusesComponent } from './components/bus/all-buses/all-buses.component';
import { AllBusClassesComponent } from './components/busClasses/all-bus-classes/all-bus-classes.component';
import { AllTripsComponent } from './components/trips/all-trips/all-trips.component';
import { AllReservationComponent } from './components/reservations/all-reservation/all-reservation.component';
import { AllUsersComponent } from './components/users/all-users/all-users.component';
import { AllDriversComponent } from './components/drivers/all-drivers/all-drivers.component';
import { AllAdminsComponent } from './components/admins/all-admins/all-admins.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './gaurds/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },

  {
    path: 'questions',
    component: AllQuestionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'branches',
    component: AllBranchesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'reports', component: AllReportsComponent, canActivate: [AuthGuard] },
  {
    path: 'destinations',
    component: AllDestinationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'activities',
    component: AllPublicActivitiesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'buses', component: AllBusesComponent, canActivate: [AuthGuard] },
  {
    path: 'busClasses',
    component: AllBusClassesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'trips', component: AllTripsComponent, canActivate: [AuthGuard] },
  {
    path: 'reservations',
    component: AllReservationComponent,
    canActivate: [AuthGuard],
  },
  { path: 'users', component: AllUsersComponent, canActivate: [AuthGuard] },
  { path: 'drivers', component: AllDriversComponent, canActivate: [AuthGuard] },
  { path: 'admins', component: AllAdminsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  { path: 'logout', component: LoginComponent },
  { path: '**', redirectTo: '/users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
