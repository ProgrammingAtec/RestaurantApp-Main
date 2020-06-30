import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {DishModel, DrinkModel} from '../../models';
import {DishesController} from '../../../dishes/dishes.controller';

@Component({
  selector: 'app-representation',
  templateUrl: './representation.component.html',
  styleUrls: ['./representation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepresentationComponent implements OnInit {
  @Input()
  represent: DrinkModel | DishModel;

  constructor(private readonly dishesController: DishesController) { }
  ngOnInit(): void {
  }

  public menuItemTapped(): void {
    this.dishesController.emitMenuItemTapped(this.represent);
  }
}
