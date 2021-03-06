import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthenticationService } from '../../../core/api/services';
import { User } from '../../../core/api/models';
import { getCurrentUser } from '../../../core/helpers/generic';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebar = new EventEmitter<void>();
  public config: PerfectScrollbarConfigInterface = {};

  currentUser: User;

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'bg-bleuclair',
      icon: 'ti-file',
      title: 'Nouveau document',
      subject: 'Un nouveau document a été mis en ligne',
      time: '9h30'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Evenement aujourd\'hui',
      subject: 'Les avis de taxe foncière vont être envoyés',
      time: '10h'
    },
    {
      btn: 'bg-marron',
      icon: 'ti-settings',
      title: 'Paramètres incorrects',
      subject: 'Il y a eu une erreur lors de la création d\'un logement',
      time: '16h27'
    }
  ];

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.currentUser = getCurrentUser();
  }

  logOut() {
    this.authenticationService.logout();
  }

}
