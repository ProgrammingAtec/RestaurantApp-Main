import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DishModel, DrinkModel} from '../shared/models';
import {HttpClient} from '@angular/common/http';
import {DishesController} from './dishes.controller';
import {animate, style, transition, trigger} from '@angular/animations';
import {CartService} from '../shared/services/cart.service';
import {Subscription} from 'rxjs';

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
export class DishesComponent implements OnInit, OnDestroy {
  @ViewChild('grid', { static: true }) grid: ElementRef;

  public dishes: DishModel[] = [
    {
      name: 'henkali',
      quantity: 3,
      price: 499,
      weight: 300,
      ingredients: [
        'tomato',
        'potato',
        'cucamber',
        'carrot',
        'shinat',
        'fish',
        'chicken'
      ]
    },
    {
      name: 'plov',
      quantity: 3,
      price: 499,
      weight: 300,
      ingredients: [
        'tomato',
        'potato',
        'cucamber',
        'carrot',
        'shinat',
        'fish',
        'chicken'
      ]
    },
    {
      name: 'hachapooree',
      quantity: 3,
      price: 499,
      weight: 300,
      ingredients: [
        'tomato',
        'potato',
        'cucamber',
        'carrot',
        'shinat',
        'fish',
        'chicken'
      ]
    },
    {
      name: 'caeser',
      quantity: 1,
      price: 499,
      weight: 300,
      ingredients: [
        'tomato',
        'potato',
        'cucamber',
        'carrot',
        'shinat',
        'fish',
        'chicken'
      ]
    },
    {
      name: 'henkali',
      quantity: 3,
      price: 499,
      weight: 300,
      ingredients: [
        'tomato',
        'potato',
        'cucamber',
        'carrot',
        'shinat',
        'fish',
        'chicken'
      ]
    },
    {
      name: 'plov',
      quantity: 3,
      price: 499,
      weight: 300,
      ingredients: [
        'tomato',
        'potato',
        'cucamber',
        'carrot',
        'shinat',
        'fish',
        'chicken'
      ]
    },
    {
      name: 'hachapooree',
      quantity: 3,
      price: 499,
      weight: 300,
      ingredients: [
        'tomato',
        'potato',
        'cucamber',
        'carrot',
        'shinat',
        'fish',
        'chicken'
      ]

    },
    {
      name: 'caeser',
      quantity: 1,
      price: 499,
      weight: 300,
      ingredients: [
        'tomato',
        'potato',
        'cucamber',
        'carrot',
        'shinat',
        'fish',
        'chicken'
      ]
    },
    {
      name: 'henkali',
      quantity: 3,
      price: 499,
      weight: 300,
      ingredients: [
        'tomato',
        'potato',
        'cucamber',
        'carrot',
        'shinat',
        'fish',
        'chicken'
      ]
    },
    {
      name: 'plov',
      quantity: 3,
      price: 499,
      weight: 300,
      ingredients: [
        'tomato',
        'potato',
        'cucamber',
        'carrot',
        'shinat',
        'fish',
        'chicken'
      ]
    },
    {
      name: 'hachapooree',
      quantity: 3,
      price: 499,
      weight: 300,
      ingredients: [
        'tomato',
        'potato',
        'cucamber',
        'carrot',
        'shinat',
        'fish',
        'chicken'
      ]
    },
    {
      name: 'caeser',
      quantity: 1,
      price: 499,
      weight: 300,
      ingredients: [
        'tomato',
        'potato',
        'cucamber',
        'carrot',
        'shinat',
        'fish',
        'chicken'
      ]
    }
  ];

  private _closeDetails = false;
  private _distanceFromTop: number = 0;
  private _touchY: number[] = [];
  private subscriptions: Subscription = new Subscription();

  bottomIndent: number = 0;
  tappedMenuItem: DishModel | DrinkModel;
  isCartEmpty: boolean;
  showDetails: boolean = false;

  constructor(
    private readonly http: HttpClient,
    private readonly dishesController: DishesController,
    readonly cartService: CartService
  ) {
  }

  ngOnInit(): void {
    // this.getDishes();
    this.subscrOnMenuItemTapped();
    this.subscrOnScroll();
    this.subscrOnEmptyCart();
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
      if (this.dishesController.showIngredients) {
        this.dishesController.showIngredients = false;
      }
      this._touchY = [];
      this._closeDetails = true;
    }

    if (this._touchY[0] - this._touchY[this._touchY.length - 1] > 30) {
      this.dishesController.showIngredients = true;
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

  private getDishes(): void {
    this.http.get('api/dishes/getAll').subscribe((dishes: { data: DishModel[] }) => {
      this.dishes = dishes.data;
    });
  }

  private subscrOnMenuItemTapped(): void {
    this.subscriptions.add(this.dishesController.menuItemTapped.subscribe((menuItem) => {
      this.tappedMenuItem = menuItem;
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

  private subscrOnScroll(): void {
    window.addEventListener('scroll', (event) => {
      if (this.showDetails) {
        window.scrollTo(0, this._distanceFromTop);
      }
    });
  }

  private subscrOnEmptyCart(): void {
    this.subscriptions.add(this.cartService.isCartEmpty.subscribe(isEmpty => this.isCartEmpty = isEmpty));
  }
}
