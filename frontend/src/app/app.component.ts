import {ApplicationRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _subscriptions: Subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly appRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(this.router.events.subscribe(r => {
      this.appRef.tick();
    }));
  }
}
