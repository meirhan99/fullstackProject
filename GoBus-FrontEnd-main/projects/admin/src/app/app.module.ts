import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderComponent } from './components/header/header.component';
import { AllQuestionsComponent } from './components/questions/all-questions/all-questions.component';
import { QuestionDetailsComponent } from './components/questions/question-details/question-details.component';
import { AddQuestionComponent } from './components/questions/add-question/add-question.component';
import { UpdateQuestionComponent } from './components/questions/update-question/update-question.component';
import { FooterComponent } from './components/footer/footer.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  MatRippleModule,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { DeleteQuestionComponent } from './components/questions/delete-question/delete-question.component';
import { AllBranchesComponent } from './components/branches/all-branches/all-branches.component';
import { AddBranchComponent } from './components/branches/add-branch/add-branch.component';
import { UpdateBranchComponent } from './components/branches/update-branch/update-branch.component';
import { DeleteBranchComponent } from './components/branches/delete-branch/delete-branch.component';
import { BranchDetailsComponent } from './components/branches/branch-details/branch-details.component';
import { AllReportsComponent } from './components/reports/all-reports/all-reports.component';
import { ReportDetailsComponent } from './components/reports/report-details/report-details.component';
import { DeleteReportComponent } from './components/reports/delete-report/delete-report.component';
import { AllDestinationsComponent } from './components/destinations/all-destinations/all-destinations.component';
import { AddDestinationComponent } from './components/destinations/add-destination/add-destination.component';
import { UpdateDestinationComponent } from './components/destinations/update-destination/update-destination.component';
import { DeleteDestinationComponent } from './components/destinations/delete-destination/delete-destination.component';
import { DestinationDetailsComponent } from './components/destinations/destination-details/destination-details.component';
import { AllPublicActivitiesComponent } from './components/publicActivities/all-public-activities/all-public-activities.component';
import { AddPublicActivityComponent } from './components/publicActivities/add-public-activity/add-public-activity.component';
import { DeletePublicActivityComponent } from './components/publicActivities/delete-public-activity/delete-public-activity.component';
import { UpdatePublicActivityComponent } from './components/publicActivities/update-public-activity/update-public-activity.component';
import { PublicActivityDetailsComponent } from './components/publicActivities/public-activity-details/public-activity-details.component';
import { AllBusesComponent } from './components/bus/all-buses/all-buses.component';
import { AddBusComponent } from './components/bus/add-bus/add-bus.component';
import { DeleteBusComponent } from './components/bus/delete-bus/delete-bus.component';
import { UpdateBusComponent } from './components/bus/update-bus/update-bus.component';
import { BusDetailsComponent } from './components/bus/bus-details/bus-details.component';
import { AllBusClassesComponent } from './components/busClasses/all-bus-classes/all-bus-classes.component';
import { AddBusClassComponent } from './components/busClasses/add-bus-class/add-bus-class.component';
import { DeleteBusClassComponent } from './components/busClasses/delete-bus-class/delete-bus-class.component';
import { BusClassDetailsComponent } from './components/busClasses/bus-class-details/bus-class-details.component';
import { UpdateBusClassComponent } from './components/busClasses/update-bus-class/update-bus-class.component';
import { AllTripsComponent } from './components/trips/all-trips/all-trips.component';
import { AddTripComponent } from './components/trips/add-trip/add-trip.component';
import { UpdateTripComponent } from './components/trips/update-trip/update-trip.component';
import { TripDetailsComponent } from './components/trips/trip-details/trip-details.component';
import { DeleteTripComponent } from './components/trips/delete-trip/delete-trip.component';
import { AllReservationComponent } from './components/reservations/all-reservation/all-reservation.component';
import { DeleteReservationComponent } from './components/reservations/delete-reservation/delete-reservation.component';
import { ReservationDetailsComponent } from './components/reservations/reservation-details/reservation-details.component';
import { AllUsersComponent } from './components/users/all-users/all-users.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { DeleteUserComponent } from './components/users/delete-user/delete-user.component';
import { AllDriversComponent } from './components/drivers/all-drivers/all-drivers.component';
import { DriverDetailsComponent } from './components/drivers/driver-details/driver-details.component';
import { DeleteDriverComponent } from './components/drivers/delete-driver/delete-driver.component';
import { AddDriverComponent } from './components/drivers/add-driver/add-driver.component';
import { AddAdminComponent } from './components/admins/add-admin/add-admin.component';
import { DeleteAdminComponent } from './components/admins/delete-admin/delete-admin.component';
import { AdminDetailsComponent } from './components/admins/admin-details/admin-details.component';
import { AllAdminsComponent } from './components/admins/all-admins/all-admins.component';
import { BlockUserComponent } from './components/users/block-user/block-user.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AllQuestionsComponent,
    QuestionDetailsComponent,
    AddQuestionComponent,
    UpdateQuestionComponent,
    DeleteQuestionComponent,
    AllBranchesComponent,
    AddBranchComponent,
    UpdateBranchComponent,
    DeleteBranchComponent,
    BranchDetailsComponent,
    AllReportsComponent,
    ReportDetailsComponent,
    DeleteReportComponent,
    AllDestinationsComponent,
    AddDestinationComponent,
    UpdateDestinationComponent,
    DeleteDestinationComponent,
    DestinationDetailsComponent,
    AllPublicActivitiesComponent,
    AddPublicActivityComponent,
    DeletePublicActivityComponent,
    UpdatePublicActivityComponent,
    PublicActivityDetailsComponent,
    AllBusesComponent,
    AddBusComponent,
    DeleteBusComponent,
    UpdateBusComponent,
    BusDetailsComponent,
    AllBusClassesComponent,
    AddBusClassComponent,
    DeleteBusClassComponent,
    BusClassDetailsComponent,
    UpdateBusClassComponent,
    AllTripsComponent,
    AddTripComponent,
    UpdateTripComponent,
    TripDetailsComponent,
    DeleteTripComponent,
    AllReservationComponent,
    DeleteReservationComponent,
    ReservationDetailsComponent,
    AllUsersComponent,
    UserDetailsComponent,
    DeleteUserComponent,
    AllDriversComponent,
    DriverDetailsComponent,
    DeleteDriverComponent,
    AddDriverComponent,
    AddAdminComponent,
    DeleteAdminComponent,
    AdminDetailsComponent,
    AllAdminsComponent,
    BlockUserComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),

    MatAutocompleteModule,
    MatNativeDateModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSortModule,
    MatTableModule,
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
