import {Component, OnInit} from '@angular/core';

import {Pizza} from '../../models/pizza.model';

import {Topping} from '../../models/topping.model';
import {Observable} from "rxjs";
import {ProductsState} from "../../store/reducers";
import {Store} from "@ngrx/store";
import * as fromStore from "../../store/selectors";
import * as fromStoreActions from "../../store/actions";
import {tap} from "rxjs/operators";

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
          [pizza]="visualise$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;

  constructor(
   private store: Store<ProductsState>
  ) {}

  ngOnInit() {
    this.pizza$ = this.store.select(fromStore.getSelectedPizza).pipe(
      tap((pizza: Pizza) => {
        const pizzaExists = !!(pizza && pizza.toppings);
        const toppings = pizzaExists ? pizza.toppings.map((topping: Topping) => topping.id) : [];

        this.store.dispatch(new fromStoreActions.VisualizeToppings(toppings));
      })
    );
    this.toppings$ = this.store.select(fromStore.getAllToppings);
    this.visualise$ = this.store.select(fromStore.getPizzaVisualized);
    this.store.dispatch(new fromStoreActions.LoadTopping({}));
    this.store.dispatch(new fromStoreActions.LoadPizzas({}));
  }
  onSelect(event: number[]) {
    console.log(event);
    this.store.dispatch(new fromStoreActions.VisualizeToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new fromStoreActions.CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new fromStoreActions.UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm("Are you sure");
    if (remove) {
      this.store.dispatch(new fromStoreActions.DeletePizza(event));
    }
  }
}
