import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/core/services/utilisateurs/authentification.service';
import { Utilisateur } from 'src/app/core/api/models/utilisateur.model';

@Component({
  selector: 'app-form-reinit-mdp',
  templateUrl: './form-reinit-mdp.component.html',
  styleUrls: ['./form-reinit-mdp.component.css']
})
export class FormReinitMDPComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  submitted = false;
  token: string;
  error = '';
  success = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthentificationService
  ) {}

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      motdepasse: ['', Validators.required],
      motdepasse2: ['', Validators.required]
    });

    this.token = this.route.snapshot.queryParams['token'] || '';

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.resetForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.f.motdepasse.value === '' || this.f.motdepasse2.value === '') {
      this.error = 'Les deux champs doivent être remplis.';
      return;
    }

    if (this.f.motdepasse.value !== this.f.motdepasse2.value) {
      this.error = 'Les mots de passe saisis sont différents.';
      return;
    }

    this.loading = true;
    const utilisateur = new Utilisateur();
    (utilisateur.token = this.token),
      (utilisateur.motDePasse = this.f.motdepasse.value);
    this.authenticationService
      .reinitialiserMotdePasse(utilisateur, null)
      .pipe(first())
      .subscribe(
        data => {
          this.error = '';
          this.success =
            'Votre mot de passe a bien été modifié. Vous pouvez dès à présent l\'utiliser pour vous connecter.';
        },
        error => {
          this.success = '';
          this.error = error.error.message;
          this.loading = false;
        }
      );
  }
}
