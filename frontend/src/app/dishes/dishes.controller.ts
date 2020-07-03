import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {DishModel, DrinkModel} from '../shared/models';

@Injectable()
export class DishesController {
  private _menuItemTapped: Subject<DishModel | DrinkModel> = new Subject();

  showIngredients: boolean = false;

  public emitMenuItemTapped(menuItem: DishModel | DrinkModel): void {
    this._menuItemTapped.next(menuItem);
  }

  public get menuItemTapped(): Subject<DishModel | DrinkModel> {
    return this._menuItemTapped;
  }
}
