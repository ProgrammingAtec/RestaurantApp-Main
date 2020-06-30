import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DishModel, DrinkModel} from '../shared/models';
import {HttpClient} from '@angular/common/http';
import {DishesController} from './dishes.controller';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
  providers: [
    DishesController
  ],
})
export class DishesComponent implements OnInit {
  @ViewChild('grid', { static: true }) grid: ElementRef;

  private _dishes: DishModel[];
  private _showMenuItemDetails = false;

  bottomIndent: number = 0;
  tappedMenuItem: DishModel | DrinkModel;

  get dishes(): DishModel[] {
    return this._dishes;
  }

  get showMenuItemDetails(): boolean {
    return this._showMenuItemDetails;
  }

  constructor(private readonly http: HttpClient,
              private readonly dishesController: DishesController) {}

  ngOnInit(): void {
    this.getDishes();
    this.subscrOnMenuItemTapped();
  }

  private getDishes(): void {
    this.http.get('api/dishes/getAll').subscribe((dishes: { data: DishModel[] }) => {
      this._dishes = dishes.data;
    });
  }

  private subscrOnMenuItemTapped(): void {
    this.dishesController.menuItemTapped.subscribe((menuItem) => {
      this.tappedMenuItem = menuItem;
      this._showMenuItemDetails = true;
      this.calcScrolledHeight();
    });
  }

  private calcScrolledHeight() {
    const distanceFromTop = window.pageYOffset;
    const visibleScreenHeight = window.screen.availHeight;

    this.bottomIndent = this.grid.nativeElement.scrollHeight - (distanceFromTop + visibleScreenHeight);
  }
}
