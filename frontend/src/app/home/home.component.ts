import {ApplicationRef, Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    public appRef: ApplicationRef,
    public router: Router
  ) {}

  navigateTo(endpoint: string): void {
    this.router.navigate([endpoint]).then(() => this.appRef.tick());
  }
}
