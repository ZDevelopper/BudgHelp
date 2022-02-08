import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getAuth } from '@firebase/auth';
import { RevenuService } from '../services/revenu.service';


export interface Revenus {
  type: string;
  montant: number;
  renouvellement: string;
  suppression: boolean;
}



const ELEMENT_DATA: Revenus[] = [
 
];
@Component({
  selector: 'app-revenus',
  templateUrl: './revenus.component.html',
  styleUrls: ['./revenus.component.scss']
})
export class RevenusComponent implements OnInit {

  hidden: boolean = true;
  auth = getAuth();
  revenuForm = new FormGroup({
    type: new FormControl(''),
    montant: new FormControl(''),
    renouvellement: new FormControl('')
  });

  count: number = 0;
  revenusByUser: any;
  displayedColumns: string[] = ['type', 'montant', 'renouvellement', 'suppression'];
  dataSource = [...ELEMENT_DATA];
  @ViewChild(MatTable) table: MatTable<Revenus>;
  constructor(private revenuService: RevenuService) { }

  ngOnInit(): void {
    console.log(this.dataSource);
  }

  ngAfterViewInit():void{
    this.getFromDataBase();
  }

  getFromDataBase() {
    this.revenuService.getCurrentUserRevenus().subscribe((data) => {
      this.revenusByUser = data;
      for (let r in this.revenusByUser) {
        let objetTempo = {} as Revenus;
        for (let e in this.revenusByUser[r]) {
          switch (this.count) {
            case 0:
              objetTempo.montant = this.revenusByUser[r][e];
              this.count++;
              break;
            case 1:
              objetTempo.renouvellement = this.revenusByUser[r][e];
              this.count++;
              break;
            case 2:
              objetTempo.type = this.revenusByUser[r][e];
              this.count = 0;
              console.log(objetTempo);
              this.dataSource.push(objetTempo);
              break;
          }
        }
      }
      this.table.renderRows();
    });
  }


  add() {
    this.revenuService.add(this.revenuForm);
    this.hide();
  }

  show() {
    this.hidden = false;
  }

  remove(element: any) {
    const index = this.dataSource.indexOf(element);
    this.dataSource.splice(index, 1);
    this.table.renderRows();
  }

  hide() {
    this.hidden = true;
  }

  getTotalCost() {
    return this.dataSource.map(t => t.montant).reduce((acc, value) => acc + value, 0);
  }
}
