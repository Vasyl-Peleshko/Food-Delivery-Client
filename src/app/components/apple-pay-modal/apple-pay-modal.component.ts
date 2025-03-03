import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ApplePayService } from '../../shared/services/stripe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fd-apple-pay-modal',
  imports: [CommonModule],
  templateUrl: './apple-pay-modal.component.html',
  styleUrl: './apple-pay-modal.component.scss'
})
export class ApplePayModalComponent implements OnChanges {
  @Input() visible = false;
  @Output() closeModal = new EventEmitter<void>();

  qrCodeUrl: string | null = null;

  constructor(private applePayService: ApplePayService) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['visible']?.currentValue) {
      await this.generateQRCode();
    }
  }

  private async generateQRCode() {
    this.qrCodeUrl = await this.applePayService.generateApplePayQR();
  }

  close() {
    this.closeModal.emit();
  }
}
