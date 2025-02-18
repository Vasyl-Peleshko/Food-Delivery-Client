import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, DestroyRef, DoCheck } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RoutingConstants } from '../../shared/constants/routing-constants';
import { CartService } from '../../shared/services/cart.service';

interface RouteConfigData {
  displayHeader?: boolean;
  displayBackButton?: boolean;
  displayFooter?: boolean;
  displayTitle?: boolean;
  isHeaderTransparent?: boolean;
  headerTitle?: string;
  displayHeaderIcon?: boolean;
}

@Component({
  selector: 'fd-layout',
  templateUrl: './layout.component.html',
  imports: [CommonModule, RouterOutlet],
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, DoCheck {
  private _destroyRef = inject(DestroyRef); 
  cartItemCount?: number = 0;

  layoutConfig: RouteConfigData = {
    displayHeader: true,
    displayFooter: true,
    isHeaderTransparent: false,
    headerTitle: '',
    displayBackButton: false,
    displayHeaderIcon: false,
    displayTitle: false
  };

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private cartServicee: CartService,
  ) {}

  ngOnInit(): void {  
    this.updateLayout();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed(this._destroyRef) 
    ).subscribe(() => {
      this.updateLayout();
    });
  }
  
  ngDoCheck() {
    this.getCartItemCount();
  }

  getCartItemCount() {
    const cartItems = this.cartServicee.getCart();
    this.cartItemCount = cartItems.length;
  }

  navigateToCart() {
    this.router.navigate([`${RoutingConstants.CART}`]); 
  }

  private updateLayout(): void {
    let activeRoute = this.activatedRoute;

    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }

    const routeData = activeRoute.snapshot.data as RouteConfigData;

    this.layoutConfig = {
      displayHeader: routeData.displayHeader ?? true,
      displayFooter: routeData.displayFooter ?? true,
      isHeaderTransparent: routeData.isHeaderTransparent ?? false,
      headerTitle: routeData.headerTitle ?? '',
      displayBackButton: routeData.displayBackButton ?? false,
      displayHeaderIcon: routeData.displayHeaderIcon ?? true,
      displayTitle: routeData.displayTitle ?? true
    };
  }

  goBack(): void {
    this.router.navigate(['..']);
  }
}
