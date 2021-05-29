import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CartModel} from '../../models/cart.model';
import {CartService} from '../../services/cart.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {objectNotEmpty} from 'src/app/shared/functions/general-use-functions';
import {HttpClient} from '@angular/common/http';
import {FormControl} from "@angular/forms";

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
  private _subscriptions: Subscription = new Subscription();
  cart: CartModel;
  isSpread = false;
  customIterator: (positionsType: 'drinks' | 'dishes') => () => {next: () => {done: boolean, value?: object}};
  tableIdControl: FormControl = new FormControl('');

  constructor(
    private readonly cartService: CartService,
    private readonly cd: ChangeDetectorRef,
    private readonly http: HttpClient) {
  }

  ngOnInit(): void {
    this._subscriptions.add(this.cartService.cartValueChanges.subscribe(() => {
      this.cart = this.cartService.getCurrentCartValue();

      if (this.cart) {
        this.customIterator = (positionsType) => {
          return () => {
            const keys = Object.keys(this.cart[positionsType]);
            const totalProperties: number = keys.length;
            const positions = this.cart[positionsType];
            let iterator = 0;

            return {
              next() {
                if (iterator < totalProperties) {
                  iterator++;
                  return {
                    done: false,
                    value: {
                      key: keys[iterator - 1],
                      value: positions[keys[iterator - 1]]
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
        };
        if (this.cart.dishes) this.cart.dishes[Symbol.iterator] = this.customIterator('dishes');
        if (this.cart.drinks) this.cart.drinks[Symbol.iterator] = this.customIterator('drinks');
      }

      this.cd.detectChanges();
    }));
    // first initialization from positions.component

    this._subscriptions.add(this.tableIdControl.valueChanges.subscribe(() => this.cd.detectChanges()));
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  openDetails(): void {
    this.isSpread = true;
    this.cd.detectChanges();
  }

  closeDetails(): void {
    this.isSpread = false;
    this.cd.detectChanges();
  }

  removePosition(menuItem: {key: string, value: number}, isDrink?: boolean, isDish?: boolean): void {
    const positionType: string = isDrink ? 'drinks' : 'dishes';
    if (menuItem.value > 1) {
      this.cart[positionType][menuItem.key]--;
    }
    if (menuItem.value === 1) {
      if (this.cart.totalPositions === 1) this.isSpread = false;
      delete this.cart[positionType][menuItem.key];
    }
    sessionStorage.setItem(positionType, JSON.stringify(this.cart[positionType]));
    this.cartService.emitCartWasChanged();
  }

  objectNotEmpty(dishes: object) {
    return objectNotEmpty(dishes);
  }

  sendPost(): void {
    this.http.post('/api/cart/make-order', { tableId: this.tableIdControl.value, order: this.cart }).subscribe();
  }
}
