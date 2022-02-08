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
  { type: "Salaire", montant: 1828, renouvellement: "Mensuel", suppression: true }
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
  objetTempo: Revenus = { type: "", montant: 0, renouvellement: "", suppression: true }
  count: number = 0;
  revenusByUser: any;
  displayedColumns: string[] = ['type', 'montant', 'renouvellement', 'suppression'];
  dataSource = [...ELEMENT_DATA];
  @ViewChild(MatTable) table: MatTable<Revenus>;
  constructor(private revenuService: RevenuService) { }

  ngOnInit(): void {
    this.getFromDataBase();
  }

  getFromDataBase() {
    this.revenuService.getCurrentUserRevenus().subscribe((data) => {
      this.revenusByUser = data;
      console.log(this.revenusByUser);
      for (let r in this.revenusByUser) {
        for (let e in this.revenusByUser[r]) {
          console.log(this.revenusByUser[r][e]);
          switch (this.count) {
            case 0:
              this.objetTempo.montant = this.revenusByUser[r][e];
              this.count++;
              break;
            case 1:
              this.objetTempo.renouvellement = this.revenusByUser[r][e];
              this.count++;
              break;
            case 2:
              this.objetTempo.type = this.revenusByUser[r][e];
              this.count = 0;
              console.log(this.objetTempo);
              this.dataSource.push(this.objetTempo);
              break;
          }
        }
      }
    });
    console.log(this.dataSource);

  }


  add() {
    this.revenuService.add(this.revenuForm);
    this.table.renderRows();
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
    this.table.renderRows();
  }

  getTotalCost() {
    return this.dataSource.map(t => t.montant).reduce((acc, value) => acc + value, 0);
  }
}
