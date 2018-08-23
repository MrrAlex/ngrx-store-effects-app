import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services/pizzas.service';

import { Topping } from '../../models/topping.model';
import { ToppingsService } from '../../services/toppings.service';
import {Observable} from "rxjs";
import {ProductsState} from "../../store/reducers";
import {Store} from "@ngrx/store";
import {getSelectedPizza} from "../../store/selectors";
import {LoadTopping} from "../../store/actions/toppings.action";

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  template: `
    <div 
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="visualise">
        </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise: Pizza;
  toppings: Topping[];

  constructor(
   private store: Store<ProductsState>
  ) {}

  ngOnInit() {
    // this.pizzaService.getPizzas().subscribe(pizzas => {
    //   const param = this.route.snapshot.params.id;
    //   let pizza;
    //   if (param === 'new') {
    //     pizza = {};
    //   } else {
    //     pizza = pizzas.find(pizza => pizza.id == parseInt(param, 10));
    //   }
    //   this.pizza = pizza;
    //   this.toppingsService.getToppings().subscribe(toppings => {
    //     this.toppings = toppings;
    //     this.onSelect(toppings.map(topping => topping.id));
    //   });
    // });
    this.store.dispatch(new LoadTopping({}));
    this.pizza$ = this.store.select(getSelectedPizza);
  }

  onSelect(event: number[]) {
  }

  onCreate(event: Pizza) {
  }

  onUpdate(event: Pizza) {
  }

  onRemove(event: Pizza) {
  }
}
