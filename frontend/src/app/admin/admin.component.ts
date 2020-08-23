import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
  tableOrders: object;

  constructor(private readonly http: HttpClient,
              private readonly cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.http.get('/api/database/getAll').subscribe(allOrders => {
      this.tableOrders = allOrders;
      this.cd.markForCheck();
    });
  }
}
