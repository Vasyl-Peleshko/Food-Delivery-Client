import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

type ViewportSize = 'mobile' | 'tablet' | 'desktop';

@Directive({
  selector: '[fdViewport]'
})
export class IfViewportDirective implements OnInit, OnDestroy {
  @Input('fdViewport') set viewportSize(size: ViewportSize) {
    this.requiredSize = size;
    this.checkViewport();
  }

  private requiredSize: ViewportSize = 'desktop';
  private resizeSubscription!: Subscription;

  constructor(private templateRef: TemplateRef<unknown>, private viewContainer: ViewContainerRef) {}

  ngOnInit(): void {
    this.checkViewport();
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => this.checkViewport());
  }

  private checkViewport() {
    const width = window.innerWidth;
  
    let shouldShow = false;
    if (this.requiredSize === 'mobile' && width < 768) shouldShow = true;
    if (this.requiredSize === 'tablet' && width >= 768 && width < 1024) shouldShow = true;
    if (this.requiredSize === 'desktop' && width >= 1024) shouldShow = true;
    
    if (shouldShow && this.viewContainer.length === 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (!shouldShow) {
      this.viewContainer.clear();
    }
  }
  
  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
