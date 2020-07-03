import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DishModel, DrinkModel} from '../shared/models';
import {HttpClient} from '@angular/common/http';
import {DishesController} from './dishes.controller';
import {animate, style, transition, trigger} from '@angular/animations';
import {CartService} from "../shared/services/cart.service";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
  providers: [
    DishesController
  ],
  animations: [
    trigger('heightOpenClose', [
      transition(':enter', [
        style({
          height: '0'
        }),
        animate('3ms ease-in-out', style({
          height: '*',
        }))
      ]),
      transition(':leave', [
        style({
          height: '*'
        }),
        animate('0.3s ease-in-out', style({
          height: '0',
        }))
      ])
    ])
  ]
})
export class DishesComponent implements OnInit {
  @ViewChild('grid', { static: true }) grid: ElementRef;

  private _dishes: DishModel[];
  private _showMenuItemDetails = false;
  private _distanceFromTop: number = 0;
  private _touchY: number[] = [];

  bottomIndent: number = 0;
  tappedMenuItem: DishModel | DrinkModel;

  get dishes(): DishModel[] {
    return this._dishes;
  }

  get showMenuItemDetails(): boolean {
    return this._showMenuItemDetails;
  }

  constructor(
    private readonly http: HttpClient,
    private readonly dishesController: DishesController,
    readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getDishes();
    this.subscrOnMenuItemTapped();
    this.subscrOnScroll();
  }

  touchMove(event: TouchEvent): void {
    if (!this._showMenuItemDetails) {
      this._touchY = [];
      return;
    }

    if (this._touchY.length > 100) {
      this._touchY = [];
      return;
    }

    if (this._touchY[this._touchY.length - 1] - this._touchY[0] > 30) {
      if (this.dishesController.showIngredients) {
        this.dishesController.showIngredients = false;
        this._touchY = [];
        return;
      }
      this._showMenuItemDetails = false;
      this._touchY = [];
    }

    if (this._touchY[0] - this._touchY[this._touchY.length - 1] > 30) {
      this.dishesController.showIngredients = true;
      this._touchY = [];
    }

    this._touchY.push(event.targetTouches[0].clientY);
  }

  closeDetails(): void {
    this._touchY = [];
    this._showMenuItemDetails = false;
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
      this._touchY = [];
    });
  }

  private calcScrolledHeight() {
    this._distanceFromTop = window.pageYOffset;
    const visibleScreenHeight = window.screen.availHeight;
    this.bottomIndent = this.grid.nativeElement.scrollHeight - (this._distanceFromTop + visibleScreenHeight);
  }

  private subscrOnScroll(): void {
    window.addEventListener('scroll', (event) => {
      if (this._showMenuItemDetails) {
        window.scrollTo(0, this._distanceFromTop);
      }
    });
  }
}
