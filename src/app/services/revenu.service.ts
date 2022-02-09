import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { getDatabase, onValue, ref, remove, set } from 'firebase/database';
import { Observable, of, switchMap } from 'rxjs';
import { ConnexionService } from './connexion.service';

@Injectable({
  providedIn: 'root'
})
export class RevenuService {

  constructor(private connexionService: ConnexionService) { }

  add(revenuForm: FormGroup) {
    const auth = getAuth();
    const db = getDatabase();
    set(ref(db, 'revenus/' + auth.currentUser?.uid + '/' + revenuForm.value.type), {
      type: revenuForm.value.type,
      montant: revenuForm.value.montant,
      renouvellement: revenuForm.value.renouvellement
    });
  }

  public getRevenusByUser(userId: any): Observable<any> {
    return new Observable((observer) => {
      const db = getDatabase();
      const revenuRef = ref(db, 'revenus/' + userId);
      onValue(revenuRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          observer.next(data)
        } else {
          observer.error()
        }
      });
    })
  }

  public getCurrentUserRevenus(): Observable<any> {
    return this.connexionService.currentUser.pipe(
      switchMap((user) => {
        if (user) {
          return this.getRevenusByUser(user.uid)
        } else {
          return of(null)
        }
      })
    )
  }

  delete(type: string, userId: any) {
    const db = getDatabase();
    remove(ref(db, 'revenus/' + userId + '/' + type));
  }
}
