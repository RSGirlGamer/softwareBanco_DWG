import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isSidebarActive: boolean = false;
  isLoginPage: boolean = false;

  @ViewChild('btn') btn!: ElementRef;
  @ViewChild('bxSearch') bxSearch!: ElementRef;

  constructor(private renderer: Renderer2, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isLoginPage = event.url === '/login' || event.url === '/register';
    });
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  toggleChange() {
    const sidebar = this.btn.nativeElement.closest('.sidebar');
    const hasActive = sidebar.classList.contains('active');
    if (hasActive) {
      this.renderer.removeClass(sidebar, 'active');
      console.log('click');
    } else {
      this.renderer.addClass(sidebar, 'active');
      console.log('click');
    }
  }
}