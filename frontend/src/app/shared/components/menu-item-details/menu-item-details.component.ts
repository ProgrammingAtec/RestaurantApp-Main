import {Component, Input, OnInit} from '@angular/core';
import {DishModel, DrinkModel} from '../../models';

@Component({
  selector: 'app-menu-item-details',
  templateUrl: './menu-item-details.component.html',
  styleUrls: ['./menu-item-details.component.scss']
})
export class MenuItemDetailsComponent implements OnInit {
  @Input() menuItem: DishModel | DrinkModel;

  total: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  decrease(): void {
    if (this.total > 0) {
      this.total--;
    }
  }

  increase(): void {
    if (this.total < 20) {
      this.total++;
    }
  }
}
