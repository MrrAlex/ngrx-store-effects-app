import {Component, OnInit} from '@angular/core';

import {Pizza} from '../../models/pizza.model';

import {Topping} from '../../models/topping.model';
import {Observable} from "rxjs";
import {ProductsState} from "../../store/reducers";
import {Store} from "@ngrx/store";
import * as fromStore from "../../store/selectors";
import {LoadTopping} from "../../store/actions/toppings.action";

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  template: `
    <div 
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
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
  toppings$: Observable<Topping[]>;

  constructor(
   private store: Store<ProductsState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new LoadTopping({}));
    this.pizza$ = this.store.select(fromStore.getSelectedPizza);
    this.toppings$ = this.store.select(fromStore.getAllToppings)
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
