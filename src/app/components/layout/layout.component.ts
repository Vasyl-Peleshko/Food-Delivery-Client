import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';

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
export class LayoutComponent implements OnInit, OnDestroy {
  showHeader = true;
  showFooter = true;
  isHeaderTransparent = false;
  headerTitle = '';
  showBackButton = false;
  showHeaderIcon = false;
  showTitle = false;
  routeSub!: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {  
    this.updateLayout();
  
    this.routeSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateLayout();
    });
  }
  
  private updateLayout(): void {
    let activeRoute = this.activatedRoute;
  
    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }
  
    const routeData = activeRoute.snapshot.data as RouteConfigData;
  
    this.showHeader = routeData?.displayHeader ?? true;
    this.showFooter = routeData?.displayFooter ?? true;
    this.isHeaderTransparent = routeData?.isHeaderTransparent ?? false;
    this.headerTitle = routeData?.headerTitle ?? '';
    this.showBackButton = routeData?.displayBackButton ?? false;
    this.showHeaderIcon = routeData?.displayHeaderIcon ?? true;
    this.showTitle = routeData?.displayTitle ?? true;
  }
  
  goBack(): void {
    this.router.navigate(['..']);
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
