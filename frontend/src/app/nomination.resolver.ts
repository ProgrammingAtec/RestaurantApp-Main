import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {DishModel, DrinkModel} from './shared/models';

@Injectable()
export class NominationResolver implements Resolve<Observable<DrinkModel[] | DishModel[]>> {
  dishes: DishModel[] = [
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

  drinks: DrinkModel[] = [
    {
      name: 'berry',
      quantity: 6,
      price: 390,
      weight: 300,
      ingredients: [
        'berry'
      ]
    },
    {
      name: 'blackberry',
      quantity: 3,
      price: 390,
      weight: 300,
      ingredients: [
        'blackberry'
      ]
    },
    {
      name: 'ice-strawberry',
      quantity: 3,
      price: 499,
      weight: 300,
      ingredients: [
        'ice-strawberry'
      ]
    },
    {
      name: 'watermelon',
      quantity: 1,
      price: 499,
      weight: 300,
      ingredients: [
        'watermelon'
      ]
    },
    {
      name: 'berry',
      quantity: 6,
      price: 390,
      weight: 300,
      ingredients: [
        'berry'
      ]
    },
    {
      name: 'blackberry',
      quantity: 3,
      price: 390,
      weight: 300,
      ingredients: [
        'blackberry'
      ]
    },
    {
      name: 'ice-strawberry',
      quantity: 3,
      price: 499,
      weight: 300,
      ingredients: [
        'ice-strawberry'
      ]
    },
    {
      name: 'watermelon',
      quantity: 1,
      price: 499,
      weight: 300,
      ingredients: [
        'watermelon'
      ]
    },
    {
      name: 'berry',
      quantity: 6,
      price: 390,
      weight: 300,
      ingredients: [
        'berry'
      ]
    },
    {
      name: 'blackberry',
      quantity: 3,
      price: 390,
      weight: 300,
      ingredients: [
        'blackberry'
      ]
    },
    {
      name: 'ice-strawberry',
      quantity: 3,
      price: 499,
      weight: 300,
      ingredients: [
        'ice-strawberry'
      ]
    },
    {
      name: 'watermelon',
      quantity: 1,
      price: 499,
      weight: 300,
      ingredients: [
        'watermelon'
      ]
    },
    {
      name: 'berry',
      quantity: 6,
      price: 390,
      weight: 300,
      ingredients: [
        'berry'
      ]
    },
    {
      name: 'blackberry',
      quantity: 3,
      price: 390,
      weight: 300,
      ingredients: [
        'blackberry'
      ]
    },
    {
      name: 'ice-strawberry',
      quantity: 3,
      price: 499,
      weight: 300,
      ingredients: [
        'ice-strawberry'
      ]
    },
    {
      name: 'watermelon',
      quantity: 1,
      price: 499,
      weight: 300,
      ingredients: [
        'watermelon'
      ]
    },
  ];

  resolve(route: ActivatedRouteSnapshot) {
    const data: DrinkModel[] | DishModel[] = route.paramMap.get('nomination') === 'dishes' ? this.dishes : this.drinks;

    return of(data);
  }
}
