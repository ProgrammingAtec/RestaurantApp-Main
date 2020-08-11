import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartModel} from '../../models/cart.model';
import {CartService} from '../../services/cart.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('openCloseHeight', [
      transition(':enter', [
        style({
          height: 0
        }),
        animate('0.2s ease-in-out', style({
          height: '*'
        }))
      ]),
      transition(':leave', [
        style({
          height: '*'
        }),
        animate('0.2s ease-in-out', style({
          height: 0
        }))
      ])
    ])
  ]
})
export class CartComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  cart: CartModel;
  isSpread = false;
  customIterator: () => { next };

  constructor(
    private readonly cartService: CartService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.cartService.cartValueChanges.subscribe(() => {
      this.cart = this.cartService.getCurrentCartValue();

      if (this.cart) {
        this.customIterator = () => {
          const keys = Object.keys(this.cart.dishes);
          const totalProperties: number = keys.length;
          const dishes = this.cart.dishes;
          let iterator = 0;

          return {
            next() {
              if (iterator < totalProperties) {
                iterator++;
                return {
                  done: false,
                  value: {
                    key: keys[iterator - 1],
                    value: dishes[keys[iterator - 1]]
                  }
                };
              } else {
                return {
                  done: true
                };
              }
            }
          };
        };
        this.cart.dishes[Symbol.iterator] = this.customIterator;
      }
    }));

    // first initialization from dishes.component
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  openDetails(): void {
    this.isSpread = true;
  }

  closeDetails(): void {
    this.isSpread = false;
  }

  removeMenuItem(menuItem: {key: string, value: number}): void {
    if (menuItem.value > 1) {
      this.cart.dishes[menuItem.key]--;
    }
    if (menuItem.value === 1) {
      if (this.cart.totalPositions === 1) this.isSpread = false;
      delete this.cart.dishes[menuItem.key];
    }
    sessionStorage.setItem('dishes', JSON.stringify(this.cart.dishes));
    this.cartService.emitCartWasChanged();
  }
}
