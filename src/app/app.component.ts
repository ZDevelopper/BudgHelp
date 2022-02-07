import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, HostBinding, OnInit} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import { getAuth } from 'firebase/auth';
import { ConnexionService } from './services/connexion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;
  isLogged:boolean=false;
  theme:any="dark-theme";

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public overlayContainer: OverlayContainer,public connexionService : ConnexionService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
      this.connexionService.isSignedIn.subscribe((etat)=>this.isLogged=etat);
  }

  @HostBinding('class') componentCssClass:any;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onSetTheme(theme:any) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
    this.theme=theme;
  }
}
