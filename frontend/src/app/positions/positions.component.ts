import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DishModel, DrinkModel} from '../shared/models';
import {PositionsController} from './positions.controller';
import {animate, style, transition, trigger} from '@angular/animations';
import {CartService} from '../shared/services/cart.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dishes',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss'],
  providers: [
    PositionsController
  ],
  animations: [
    trigger('heightOpenClose', [
      transition(':enter', [
        style({
          height: '0'
        }),
        animate('0.3s ease-in-out', style({
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
export class PositionsComponent implements OnInit, OnDestroy {
  @ViewChild('grid', { static: true }) grid: ElementRef;

  private _closeDetails = false;
  private _distanceFromTop: number = 0;
  private _touchY: number[] = [];
  private subscriptions: Subscription = new Subscription();

  bottomIndent: number = 0;
  tappedPosition: DishModel | DrinkModel;
  isCartEmpty: boolean;
  showDetails: boolean = false;
  positions: DrinkModel[] | DrinkModel[];
  positionsType: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly positionsController: PositionsController,
    readonly cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.positionsType = this.route.snapshot.paramMap.get('nomination');
    this.getDishes();
    this.subsOnPositionTapped();
    this.subsOnScroll();
    this.subsOnEmptyCart();
    this.cartService.emitCartWasChanged(); // initialization
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  touchMove(event: TouchEvent): void {
    if (!this.showDetails) {
      this._touchY = [];
      return;
    }

    if (this._touchY.length > 40) {
      this._touchY = [];
      return;
    }

    if (this._touchY[this._touchY.length - 1] - this._touchY[0] > 30) {
      if (this.positionsController.showIngredients) {
        this.positionsController.showIngredients = false;
      }
      this._touchY = [];
      this._closeDetails = true;
    }

    if (this._touchY[0] - this._touchY[this._touchY.length - 1] > 30) {
      this.positionsController.showIngredients = true;
      this._touchY = [];
      this._closeDetails = false;
    }

    this._touchY.push(event.targetTouches[0].clientY);
  }

  touchEnd(): void {
    this._touchY = [];
  }

  closeDetails(): void {
    if (this._closeDetails) {
      this.showDetails = false;
      this._closeDetails = false;
    }
    this._touchY = [];
  }

  private subsOnPositionTapped(): void {
    this.subscriptions.add(this.positionsController.positionTappedChanges.subscribe((position) => {
      this.tappedPosition = position;
      this.showDetails = true;
      this.calcScrolledHeight();
      this._touchY = [];
    }));
  }

  private calcScrolledHeight() {
    this._distanceFromTop = window.pageYOffset;
    const visibleScreenHeight = window.innerHeight;
    this.bottomIndent = this.grid.nativeElement.scrollHeight - (this._distanceFromTop + visibleScreenHeight);
  }

  private subsOnScroll(): void {
    window.addEventListener('scroll', (event) => {
      if (this.showDetails) {
        window.scrollTo(0, this._distanceFromTop);
      }
    });
  }

  private getDishes() {
    this.subscriptions.add(this.route.data.subscribe(value => this.positions = value.dishes));
  }

  private subsOnEmptyCart(): void {
    this.subscriptions.add(this.cartService.isCartEmpty.subscribe(isEmpty => this.isCartEmpty = isEmpty));
  }
}
