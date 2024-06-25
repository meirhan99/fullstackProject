import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DestinationComponent } from './components/destination/destination.component';
import { BranchComponent } from './components/branch/branch.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PublicActivityComponent } from './components/public-activity/public-activity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from './components/question/question.component';
import { DatePipe } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { BusClassComponent } from './components/bus-class/bus-class.component';
import { ChooseTripComponent } from './components/choose-trip/choose-trip.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { FilterTripComponent } from './components/filter-trip/filter-trip.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { PaymentComponent } from './components/payment/payment.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { MatMenuModule } from '@angular/material/menu';

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
import { ReservationSuccessComponent } from './components/reservation-success/reservation-success.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ReservationHistoryComponent } from './components/reservation-history/reservation-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactUsComponent,
    DestinationComponent,
    BranchComponent,
    RegisterComponent,
    LoginComponent,
    PublicActivityComponent,
    QuestionComponent,
    SpinnerComponent,
    BusClassComponent,
    ChooseTripComponent,
    FilterTripComponent,
    ReservationComponent,
    PaymentComponent,
    ReservationSuccessComponent,
    ForgetPasswordComponent,
    ReservationHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-right' }),
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
    MatMenuModule,
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
