import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  value = '';
  signupForm = this.fb.group({
      email: [''],
      password1: [''],
  });


  ngOnInit(): void {
  }


  constructor(private fb: FormBuilder) {

  }
  onSubmit() {
    this.value = JSON.stringify(this.signupForm.value);
    localStorage.setItem("user", this.value);
    this.afficherUser();
  }

  afficherUser() {
    console.log(localStorage.getItem("user"));
  }

}
