import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {objectNotEmpty} from '../shared/functions/general-use-functions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
  tableOrders;

  constructor(private readonly http: HttpClient,
              private readonly cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get('/api/database/getAll').subscribe(allOrders => {
      this.tableOrders = objectNotEmpty(allOrders) ? allOrders : null;
      this.cd.markForCheck();
    });
  }

  backup(): void {
    this.http.get('/api/cart/getBackup').subscribe(lastBackupData => {
      this.tableOrders = lastBackupData;
      this.cd.markForCheck();
    });
  }
}
