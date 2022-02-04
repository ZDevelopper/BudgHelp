import { Component, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { Router } from '@angular/router';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})



export class GestionComponent implements OnInit {
  
  constructor(private router:Router,private connexionService: ConnexionService) { }
  isLogged:boolean=false;

  ngOnInit(): void {
    this.connexionService.isSignedIn.subscribe((etat)=>this.isLogged=etat);
    if(!this.isLogged){
      /* this.router.navigate(['/connexion']); */
    }
  }
}
