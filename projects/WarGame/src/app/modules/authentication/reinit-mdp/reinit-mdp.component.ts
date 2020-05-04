import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reinit-mdp',
  templateUrl: './reinit-mdp.component.html',
  styleUrls: ['./reinit-mdp.component.css']
})
export class ReinitMDPComponent {
  constructor(private router: Router) {}

  message = 'Merci de saisir un nouveau mot de passe.';

}
