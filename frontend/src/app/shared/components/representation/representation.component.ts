import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {DishModel, DrinkModel} from '../../models';
import {PositionsController} from '../../../positions/positions.controller';

@Component({
  selector: 'app-representation',
  templateUrl: './representation.component.html',
  styleUrls: ['./representation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepresentationComponent implements OnInit {
  @Input() positionsType: string;
  @Input() representation: DrinkModel | DishModel;

  constructor(private readonly positionsController: PositionsController) { }
  ngOnInit(): void {
  }

  public menuItemTapped(): void {
    this.positionsController.emitPositionTapped(this.representation);
  }
}
