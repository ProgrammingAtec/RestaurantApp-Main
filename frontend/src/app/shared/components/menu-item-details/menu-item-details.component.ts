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
    if (sessionStorage.hasOwnProperty(this.positionsType)) {
      let existingPositions: object = JSON.parse(sessionStorage.getItem(this.positionsType));
      for (const positionName in existingPositions) {
        if (positionName === this.position.name) {
          existingPositions[positionName] = existingPositions[positionName] + this.total;
          sessionStorage.setItem(this.positionsType, JSON.stringify(existingPositions));

          this.cartService.emitCartWasChanged();
          return;
        }
      }

      existingPositions = {
        ...existingPositions,
        ...this.orderCurrentPosition()
      };

      sessionStorage.setItem(this.positionsType, JSON.stringify(existingPositions));

      this.cartService.emitCartWasChanged();
      return;
    }

    sessionStorage.setItem(this.positionsType, JSON.stringify(this.orderCurrentPosition()));
    this.cartService.emitCartWasChanged();
  }

  private orderCurrentPosition(): object {
    const order: object = {};
    order[this.position.name] = this.total;
    return order;
  }
}
