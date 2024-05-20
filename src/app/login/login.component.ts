import { Component, OnInit, HostListener, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router, 
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.adjustBodyOverflow();
    }
  }

  zoomIn(event: MouseEvent) {
    if (isPlatformBrowser(this.platformId)) {
      const button = event.target as HTMLElement;
      const img = button.querySelector('img');
      if (img) {
        this.renderer.addClass(img, 'zoomed');
      }
    }
  }

  zoomOut(event: MouseEvent) {
    if (isPlatformBrowser(this.platformId)) {
      const button = event.target as HTMLElement;
      const img = button.querySelector('img');
      if (img) {
        this.renderer.removeClass(img, 'zoomed');
      }
    }
  }

  cadastro(){  
    this.router.navigate(['cadastro']);
  }

  adjustBodyOverflow() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      const body = document.body;
      if (width <= 767) {
        this.renderer.setStyle(body, 'overflowX', 'visible');
        this.renderer.setStyle(body, 'overflowY', 'visible');
      } else {
        this.renderer.setStyle(body, 'overflowX', 'hidden');
        this.renderer.setStyle(body, 'overflowY', 'hidden');
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.adjustBodyOverflow();
    }
  }
}