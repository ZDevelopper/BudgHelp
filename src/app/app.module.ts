import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatTableModule} from '@angular/material/table'
import {MatRadioModule} from '@angular/material/radio'


import { ReactiveFormsModule } from '@angular/forms';
import { GestionComponent } from './gestion/gestion.component';
import { ResumeComponent } from './resume/resume.component';
import { RevenusComponent } from './revenus/revenus.component';
import { ChargesComponent } from './charges/charges.component';
import { DepensesComponent } from './depenses/depenses.component';
import { EpargneComponent } from './epargne/epargne.component';

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAMMDUBhFYFPoHyXqpT8aRIDMC1pAQG-ZE",
  authDomain: "budghelp-ad4e7.firebaseapp.com",
  databaseURL: "https://budghelp-ad4e7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "budghelp-ad4e7",
  storageBucket: "budghelp-ad4e7.appspot.com",
  messagingSenderId: "913649765232",
  appId: "1:913649765232:web:a8981cac744033e8a19db5",
  measurementId: "G-QVSBY7WT74"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    GestionComponent,
    ResumeComponent,
    RevenusComponent,
    ChargesComponent,
    DepensesComponent,
    EpargneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
