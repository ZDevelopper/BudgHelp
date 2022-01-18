import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm = this.fb.group({
    user: this.fb.group({
      email: [''],
      password: [''],
    }),
  });


  ngOnInit(): void {
  }


  constructor(private fb : FormBuilder) {

  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.signinForm.value);
  }

}
