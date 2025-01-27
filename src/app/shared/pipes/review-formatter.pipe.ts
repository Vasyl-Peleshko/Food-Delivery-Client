import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reviewFormatter',
  standalone: true
})
export class ReviewFormatterPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 25) {
      return value.toString(); 
    }
    
    const roundedValue = Math.floor(value / 25) * 25; 
    return `${roundedValue}+`;
  }
}
