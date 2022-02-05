import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ConnexionService } from '../services/connexion.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})



export class SigninComponent {


  constructor(private fb: FormBuilder, private connexionService: ConnexionService, private router: Router) {

  }
  signinForm = this.fb.group({
    email: new FormControl(''),
    password: new FormControl(''),
  });


  submitForm() {
    this.connexionService.signIn(this.signinForm);
    this.router.navigate(['/gestion']);
  }

}
