import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DishModel, DrinkModel} from '../../models';
import {PositionsController} from '../../../positions/positions.controller';

@Component({
  selector: 'app-representation',
  templateUrl: './representation.component.html',
  styleUrls: ['./representation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepresentationComponent {
  @Input() positionsType: string;
  @Input() representation: DrinkModel & DishModel;

  constructor(private readonly positionsController: PositionsController) {}

  public menuItemTapped(): void {
    this.positionsController.emitPositionTapped(this.representation);
  }
}
