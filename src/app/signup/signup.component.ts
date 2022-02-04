import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ConnexionService } from '../services/connexion.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  value = '';
  signupForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl(''),
  });


  ngOnInit(): void {
  }


  constructor(private fb: FormBuilder,private router:Router, private connexionService : ConnexionService) {

  }
  onSubmit() {
    this.connexionService.signUp(this.signupForm);
    this.router.navigate(['/connexion']);
    
  }
}
