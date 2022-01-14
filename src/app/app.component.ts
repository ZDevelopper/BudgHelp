import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, HostBinding} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projet';
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public overlayContainer: OverlayContainer) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  @HostBinding('class') componentCssClass:any;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onSetTheme(theme:any) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }
}
