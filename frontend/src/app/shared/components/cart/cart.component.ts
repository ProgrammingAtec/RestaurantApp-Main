import { Component, OnInit } from '@angular/core';
import {CartModel} from '../../models/cart.model';
import {CartService} from '../../services/cart.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('openCloseHeight', [
      transition(':enter', [
        style({
          height: 0
        }),
        animate('0.3s ease-in-out', style({
          height: '*'
        }))
      ]),
      transition(':leave', [
        style({
          height: '*'
        }),
        animate('0.3s ease-in-out', style({
          height: 0
        }))
      ])
    ])
  ]
})
export class CartComponent implements OnInit {
  cart: CartModel;
  isSpread = false;
  customIterator: () => { next };

  constructor(
    private readonly cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.cartValueChanges.subscribe(() => {
      this.cart = this.cartService.getCurrentCartValue();

      this.customIterator = () => {
        const keys = Object.keys(this.cart.dishes);
        const totalProperties: number = keys.length;
        const dishes = this.cart.dishes;
        let iterator = 0;


        return {
          next() {
            if (iterator < totalProperties) {
              iterator++;
              return {
                done: false,
                value: {
                  key: keys[iterator],
                  value: dishes[keys[iterator]]
                }
              };
            } else {
              return {
                done: true
              };
            }
          }
        };
      };
      this.cart.dishes[Symbol.iterator] = this.customIterator;
    });
  }

  toggleDetails(): void {
    this.isSpread = !this.isSpread;
  }
}
