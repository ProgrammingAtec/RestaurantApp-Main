import {ApplicationRef, ChangeDetectorRef, Component, Input} from '@angular/core';
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
          height: '0',
          color: '#fff'
        }),
        animate('0.3s ease-in-out', style({
          height: '*',
          color: '#000'
        }))
      ]),
      transition(':leave', [
        style({
          height: '*',
          color: '#000'
        }),
        animate('0.3s ease-in-out', style({
          height: '0',
          color: '#fff'
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
    private readonly cd: ChangeDetectorRef,
    private readonly appRef: ApplicationRef,
    private readonly cartService: CartService) {
  }

  decrease(): void {
    if (this.total > 0) {
      this.total--;

      this.cd.detectChanges();
    }
  }

  increase(): void {
    if (this.total < 15) {
      this.total++;

      this.cd.detectChanges();
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
    this.appRef.tick();
    this.cartService.emitCartWasChanged();
  }

  private orderCurrentPosition(): object {
    const order: object = {};
    order[this.position.name] = this.total;
    return order;
  }
}
