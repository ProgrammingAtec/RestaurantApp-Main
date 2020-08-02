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

  get cartValueChanges(): Subject<void> {
    return this._cartWasChanged;
  }

  updateCart(): void {
    this.updateCurrentCartValue();
    this.updateIsCartEmptyState();
  }

  getCurrentCartValue(): CartModel {
    return this._cart;
  }

  emitCartWasChanged(): void {
    this.updateCart();
    this._cartWasChanged.next();
  }

  private updateCurrentCartValue() {
    if (this._cart) {
      this._cart.dishes = JSON.parse(sessionStorage.getItem('dishes'));
      // this._cart.dishes = JSON.parse(sessionStorage.getItem('drinks'));
      this._cart.totalPositions = getTotalPositions(this._cart.dishes, this._cart.drinks);
      return;
    }

    const newCreatedCart: CartModel = {
      dishes: JSON.parse(sessionStorage.getItem('dishes')),
      drinks: JSON.parse(sessionStorage.getItem('drinks')),
      totalPositions: null
    };
    newCreatedCart.totalPositions = getTotalPositions(newCreatedCart.dishes, newCreatedCart.drinks);
    this._cart = newCreatedCart;

    function getTotalPositions(dishes: object, drinks: object): number {
      let totalPositions: number = 0;
      for (const positioin in dishes) {
        if (dishes.hasOwnProperty(positioin)) totalPositions++;
      }
      for (const position in drinks) {
        if (drinks.hasOwnProperty(position)) totalPositions++;
      }
      return totalPositions;
    }
  }

  private updateIsCartEmptyState(): void {
    if (isObjectEmpty(this._cart)) {
      this.isCartEmpty = true;
      return;
    }

    this.isCartEmpty = false;
  }
}
