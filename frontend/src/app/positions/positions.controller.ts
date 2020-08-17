import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {DishModel, DrinkModel} from '../shared/models';

@Injectable()
export class PositionsController {
  private _positionTappedChanges: Subject<DishModel | DrinkModel> = new Subject();

  showIngredients: boolean = false;

  public emitPositionTapped(menuItem: DishModel | DrinkModel): void {
    this._positionTappedChanges.next(menuItem);
  }

  public get positionTappedChanges(): Subject<DishModel | DrinkModel> {
    return this._positionTappedChanges;
  }
}
