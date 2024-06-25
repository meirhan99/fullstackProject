import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment/payment.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IResponse } from '../../models/iresponse';
import {
  Stripe,
  StripeCardCvcElement,
  StripeCardExpiryElement,
  StripeCardNumberElement,
  loadStripe,
} from '@stripe/stripe-js';
import { Router } from '@angular/router';
import { ReservationService } from '../../services/reservation/reservation.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  @ViewChild('cardCvc') cardCvcElement?: ElementRef;

  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;
  cardNumberComplete = false;
  cardExpiryComplete = false;
  cardCvcComplete = false;
  cardErrors: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private reservationService: ReservationService,
    private dialog: MatDialogRef<PaymentComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.paymentForm = this.fb.group({
      nameOnCard: ['', [Validators.required, Validators.pattern('[a-zA-Z_ ]{3,}')]],
    });
  }
  ngOnInit(): void {
    loadStripe(
      'pk_test_51OBNBaKrHuXxznHQOijLNC9bQQHZ98W6I7a7yzww3WIAT4PYB69LJvrdESaiXHv6Gv9RBGtH09AkEWLoVNNGNUBn00tgYPcrbR'
    ).then((stripe: any) => {
      this.stripe = stripe;
      const elements = stripe.elements();
      if (elements) {
        this.cardNumber = elements.create('cardNumber');
        this.cardNumber?.mount(this.cardNumberElement?.nativeElement);
        this.cardNumber?.on('change', (event) => {
          this.cardNumberComplete = event.complete;
          if (event.error) this.cardErrors = event.error.message;
          else this.cardErrors = null;
        });

        this.cardExpiry = elements.create('cardExpiry');
        this.cardExpiry?.mount(this.cardExpiryElement?.nativeElement);
        this.cardExpiry?.on('change', (event) => {
          this.cardExpiryComplete = event.complete;
          if (event.error) this.cardErrors = event.error.message;
          else this.cardErrors = null;
        });

        this.cardCvc = elements.create('cardCvc');
        this.cardCvc?.mount(this.cardCvcElement?.nativeElement);
        this.cardCvc?.on('change', (event) => {
          this.cardCvcComplete = event.complete;
          if (event.error) this.cardErrors = event.error.message;
          else this.cardErrors = null;
        });
      }
    });
  }
  ConfirmPayment() {
    this.stripe
      ?.confirmCardPayment(this.data.clientSecret, {
        payment_method: {
          card: this.cardNumber!,
          billing_details: {
            name: this.nameOnCard?.value,
          },
        },
      })
      .then((result) => {
        if (result.paymentIntent?.status == 'succeeded') {
          this.toastr.success('success', 'Reservation Success');
          this.dialog.close(true);
          this.router.navigate(['/checkout/success', this.data.id]);
        } else {
          this.dialog.close(true);
          this.toastr.error(`${result.error?.message}`);
          this.reservationService.DeleteReservation(this.data.id).subscribe({
            next: (v) => {},
            // error: (e) => {
            //   this.toaster.error('Register failed');
            // },
            // complete: () => console.log('complete'),
          });
          // this.router.navigate(['/destinations/', id]);
        }
      });
  }

  get nameOnCard() {
    return this.paymentForm.get('nameOnCard');
  }
}
