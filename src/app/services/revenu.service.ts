import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { getDatabase, onValue, ref, set } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class RevenuService {

  constructor() { }

  add(revenuForm: FormGroup) {
    const auth = getAuth();
    const db = getDatabase();
    set(ref(db, 'revenus/' + auth.currentUser?.uid + '/' + revenuForm.value.type), {
      type: revenuForm.value.type,
      montant: revenuForm.value.montant,
      renouvellement: revenuForm.value.renouvellement
    });
  }

  get(userId:any) {
    const db = getDatabase();
    const revenuRef = ref(db, 'revenus/'+userId);
    onValue(revenuRef, (snapshot) => {
      if(snapshot.exists()){
        const data = snapshot.val(); 
        console.log(data);
        return data;
      }
    });
  }
}
