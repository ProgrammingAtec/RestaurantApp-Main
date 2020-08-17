import {Component, Input} from '@angular/core';
import {DishModel, DrinkModel} from '../../models';
import {PositionsController} from '../../../positions/positions.controller';
import {animate, style, transition, trigger} from '@angular/animations';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-menu-item-details',
  templateUrl: './menu-item-details.component.html',
  styleUrls: ['./menu-item-details.component.scss'],
  animations: [
    trigger('heightOpenClose', [
      transition(':enter', [
        style({
          height: '0'
        }),
        animate('0.1s ease-in-out', style({
          height: '*',
        }))
      ]),
      transition(':leave', [
        style({
          height: '*'
        }),
        animate('0.1s ease-in-out', style({
          height: '0',
        }))
      ])
    ])
  ]
})
export class MenuItemDetailsComponent {
  @Input() positionsType: string;
  @Input() position: DishModel | DrinkModel;

  total: number = 1;

  constructor(
    readonly positionsController: PositionsController,
    private readonly cartService: CartService) {
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

  addToCart(): void {
    if (sessionStorage.hasOwnProperty('dishes')) {
      let existingDishes: object = JSON.parse(sessionStorage.getItem('dishes'));
      for (const dishName in existingDishes) {
        if (dishName === this.position.name) {
          existingDishes[dishName] = existingDishes[dishName] + this.total;
          sessionStorage.setItem('dishes', JSON.stringify(existingDishes));

          this.cartService.emitCartWasChanged();
          return;
        }
      }

      existingDishes = {
        ...existingDishes,
        ...this.orderCurrentMenuItem()
      };

      sessionStorage.setItem('dishes', JSON.stringify(existingDishes));

      this.cartService.emitCartWasChanged();
      return;
    }

    sessionStorage.setItem('dishes', JSON.stringify(this.orderCurrentMenuItem()));
    this.cartService.emitCartWasChanged();
  }

  private orderCurrentMenuItem(): object {
    const order: object = {};
    order[this.position.name] = this.total;
    return order;
  }
}
