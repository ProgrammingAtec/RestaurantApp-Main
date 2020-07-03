import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {isObjectEmpty} from '../functions/general-use-functions';
import {CartModel} from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart: CartModel;
  private _cartWasChanged: Subject<void> = new Subject();

  isCartEmpty: boolean = true;

  updateCart(): void {
    this.updateCurrentCartValue();
    this.updateIsCartEmptyState();
    this.getUpdatedTotalCartPositions();
  }

  getCurrentCartValue(): CartModel {
    return this._cart;
  }

  get cartValueChanges(): Subject<void> {
    return this._cartWasChanged;
  }

  emitCartWasChanges(): void {
    this.updateCart();
    this._cartWasChanged.next();
  }

  private updateCurrentCartValue() {
    if (this._cart) {
      this._cart.dishes = JSON.parse(sessionStorage.getItem('dishes'));
      this._cart.totalPositions = this.getUpdatedTotalCartPositions();

      return;
    }

    const newCreatedCart: CartModel = {
      dishes: JSON.parse(sessionStorage.getItem('dishes')),
      drinks: null,
      totalPositions: 1
    };

    this._cart = newCreatedCart;
  }

  private updateIsCartEmptyState(): void {
    if (isObjectEmpty(this._cart)) {
      this.isCartEmpty = true;
      return;
    }

    this.isCartEmpty = false;
  }

  private getUpdatedTotalCartPositions(): number {
    let totalPositions: number = 0;
    for (const position in this._cart.dishes) {
      totalPositions++;
    }

    for (const position in this._cart.drinks) {
      totalPositions++;
    }

    return totalPositions;
  }
}
