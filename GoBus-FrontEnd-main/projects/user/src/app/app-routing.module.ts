import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DestinationComponent } from './components/destination/destination.component';
import { BranchComponent } from './components/branch/branch.component';
import { PublicActivityComponent } from './components/public-activity/public-activity.component';
import { QuestionComponent } from './components/question/question.component';
import { ChooseTripComponent } from './components/choose-trip/choose-trip.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './gaurds/auth.guard';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ReservationSuccessComponent } from './components/reservation-success/reservation-success.component';
import { ReservationHistoryComponent } from './components/reservation-history/reservation-history.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'questions', component: QuestionComponent },
  { path: 'destinations', component: DestinationComponent },
  { path: 'destinations/:id', component: PublicActivityComponent },
  { path: 'branches', component: BranchComponent },
  {
    path: 'reports',
    component: ContactUsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search/:departureDate/:startBranchId/:endBranchId/:quantity',
    component: ChooseTripComponent,
  },
  {
    path: 'reservation/:tripId/:passengers',
    component: ReservationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'checkout/success/:reservationId',
    component: ReservationSuccessComponent,
    canActivate: [AuthGuard],
  },

  { path: 'history', component: ReservationHistoryComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: HomeComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
