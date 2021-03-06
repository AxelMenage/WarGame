import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-full',
  templateUrl: './layout-full.component.html',
  styleUrls: ['./layout-full.component.css']
})
export class LayoutFullComponent implements OnInit {

  constructor(public router: Router) { }

  tabStatus = 'justified';

  public isCollapsed = false;

  public innerWidth: any;
  public defaultSidebar: any;
  public showSettings = false;
  public showMobileMenu = false;

  options = {
    theme: 'light', // two possible values: light, dark
    dir: 'ltr', // two possible values: ltr, rtl
    layout: 'horizontal', // fixed value. shouldn't be changed.
    sidebartype: 'full', // fixed value. shouldn't be changed.
    sidebarpos: 'absolute', // two possible values: fixed, absolute
    headerpos: 'absolute', // two possible values: fixed, absolute
    boxed: 'full', // two possible values: full, boxed
    navbarbg: 'skin6', // six possible values: skin(1/2/3/4/5/6)
    sidebarbg: 'skin1', // six possible values: skin(1/2/3/4/5/6)
    logobg: 'skin1', // six possible values: skin(1/2/3/4/5/6)
    logoimg: 'assets/images/wim/wim-bleu.png'
  };

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['/tableau-de-bord']);
    }
    this.defaultSidebar = this.options.sidebartype;
    this.handleSidebar();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    switch (this.defaultSidebar) {
      case 'full':
        if (this.innerWidth < 1170) {
          this.options.sidebartype = 'mini-sidebar';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;
      default:
    }
  }

}
