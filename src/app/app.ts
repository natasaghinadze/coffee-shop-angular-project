import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  protected readonly title = signal('coffee-shop');
  private router = inject(Router);
  showFooter = signal<boolean>(true);
  isLoading = signal<boolean>(true);
  
  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.showFooter.set(!event.urlAfterRedirects.includes('/login'));
    });
  }


  ngOnInit() {
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 2500);
  }
}
