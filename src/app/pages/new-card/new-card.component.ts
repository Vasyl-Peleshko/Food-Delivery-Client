import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { nameValidator, cardNumberValidator, expiryDateValidator, cvvValidator } from '../../shared/validators/validator';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { Payment } from '../../shared/interfaces/payment-card.interface';
import { NewCard, NewCardService } from '../../shared/services/payment-card.service';
import { CardTypePipe } from '../../shared/pipes/card-type.pipe';

@Component({
  selector: 'fd-new-card',
  imports: [CommonModule, ReactiveFormsModule, FormErrorComponent, CardTypePipe],
  templateUrl: './new-card.component.html',
  styleUrl: './new-card.component.scss'
})
export class NewCardComponent {
  cardForm!: FormGroup;
  selectedMethod: Payment = {
    name: '',
    icon: '',
    selected: false
  };
  cardNumber = '';
  expiry = '';
  cvv = '';
  saveCard = false;
  
  constructor(
    private fb: FormBuilder,
    private cardService: NewCardService,
  ) {
    this.initForm();
  }
  
  private initForm() {
    this.cardForm = this.fb.group({
      name: ['', [Validators.required, nameValidator]],
      cardNumber: ['', [Validators.required, cardNumberValidator]],
      expiry: ['', [Validators.required, expiryDateValidator]],
      cvv: ['', [Validators.required, cvvValidator]],
      saveCard: [false]
    });
  }

  get formControls() {
    return this.cardForm?.controls || {};
  }

  submitForm() {
    if (this.cardForm.valid) {
      const { name, cardNumber, expiry } = this.cardForm.value;

      const cardData: NewCard = {
        fullName: name,
        cardNumber: cardNumber,
        expirationDate: expiry
      };

      this.cardService.addNewCard(cardData).subscribe()
    } else {
      console.log('❌ Form has errors:', this.cardForm.value);
    }
  }
}
