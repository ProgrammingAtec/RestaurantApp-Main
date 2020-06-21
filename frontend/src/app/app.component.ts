import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chingiz';
  dishes: string[];

  constructor(private readonly http: HttpClient) {
  }

  public ngOnInit(): void {
  }

  public getDishes(): void {
    const currentPath = window.location.href;
    console.log('currentPath equals to: ', currentPath);

    this.http.get(`/api/dishes`).subscribe((dishes: { data: string[] }) => {
      this.dishes = dishes.data;
    });
  }
}
