import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardType'
})
export class CardTypePipe implements PipeTransform {
  transform(cardNumber: string | undefined): string {
    if (!cardNumber) {
      return 'assets/bank-icon.jpg'; 
    }

    const trimmedCardNumber = cardNumber.replace(/\s+/g, ''); 
    const firstDigit = trimmedCardNumber.charAt(0);
    const firstTwoDigits = trimmedCardNumber.slice(0, 2);

    if (firstDigit === '4') {
      return 'assets/visa.jpg';
    } 
    if (['51', '52', '53', '54', '55'].includes(firstTwoDigits)) {
      return 'assets/mastercard.jpg'; 
    }

    return 'assets/bank-icon.jpg';
  }
}
