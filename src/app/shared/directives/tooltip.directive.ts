import { Directive, ElementRef, Input, Renderer2, HostListener, OnDestroy } from '@angular/core';

@Directive({
  selector: '[fdTooltip]'
})
export class TooltipDirective implements OnDestroy {
  @Input('fdTooltip') tooltipText = '';
  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipElement) {
      this.showTooltip();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  @HostListener('document:click', ['$event']) onClick(event: Event) {
    if (this.tooltipElement && !this.el.nativeElement.contains(event.target)) {
      this.hideTooltip();
    }
  }

  private showTooltip() {
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.tooltipText));

    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'background', 'rgba(0, 0, 0, 0.9)');
    this.renderer.setStyle(this.tooltipElement, 'color', 'white');
    this.renderer.setStyle(this.tooltipElement, 'padding', '6px 12px');
    this.renderer.setStyle(this.tooltipElement, 'borderRadius', '6px');
    this.renderer.setStyle(this.tooltipElement, 'fontSize', '12px');
    this.renderer.setStyle(this.tooltipElement, 'whiteSpace', 'nowrap');
    this.renderer.setStyle(this.tooltipElement, 'zIndex', '1000');
    this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
    this.renderer.setStyle(this.tooltipElement, 'transition', 'opacity 0.3s ease-in-out');

    const rect = this.el.nativeElement.getBoundingClientRect();
    this.renderer.setStyle(this.tooltipElement, 'top', `${window.scrollY + rect.top - 35}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${window.scrollX + rect.left + rect.width / 2}px`);
    this.renderer.setStyle(this.tooltipElement, 'transform', 'translateX(-50%)');

    this.renderer.appendChild(document.body, this.tooltipElement);

    setTimeout(() => {
      if (this.tooltipElement) {
        this.renderer.setStyle(this.tooltipElement, 'opacity', '1');
      }
    }, 10);
  }

  private hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

  ngOnDestroy(): void {
    this.hideTooltip();
  }
}
