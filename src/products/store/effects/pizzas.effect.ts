import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import * as pizzasActions from "../actions/pizzas.action";
import {catchError, map, switchMap} from "rxjs/operators";
import {PizzasService} from "../../services";
import {of} from "rxjs/observable/of";
import {Pizza} from "../../models/pizza.model";
import * as fromRoot from "../../../app/store/actions";

@Injectable()
export class PizzasEffects {
  constructor(private actions$: Actions, private pizzaService: PizzasService) {
  };

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzasActions.LOAD_PIZZAS).pipe(
    switchMap(() => {
      return this.pizzaService.getPizzas().pipe(
        map((pizzas: Pizza[]) => new pizzasActions.LoadPizzasSuccess(pizzas),
          catchError(error => of(new pizzasActions.LoadPizzasFail(error))))
      );
    })
  )

  @Effect()
  createPizza$ = this.actions$.ofType(pizzasActions.CREATE_PIZZA).pipe(
    map((action: pizzasActions.CreatePizza) => action.payload),
    switchMap((pizza: Pizza) => this.pizzaService.createPizza(pizza).pipe(
      map((pizza: Pizza) => new pizzasActions.CreatePizzaSuccess(pizza)),
      catchError(error => of(new pizzasActions.CreatePizzaFail(error)))
    ))
  );

  @Effect()
  createPizzaSuccess$ = this.actions$.ofType(pizzasActions.CREATE_PIZZA_SUCCESS).pipe(
    map( (action: pizzasActions.CreatePizzaSuccess) => action.payload),
    map( (pizza: Pizza) => new fromRoot.Go({
      path: ["/products", pizza.id]
    }))
  );

  @Effect()
  updatePizza$ = this.actions$.ofType(pizzasActions.UPDATE_PIZZA).pipe(
    map( (action: pizzasActions.UpdatePizza) => action.payload),
    switchMap( (pizza: Pizza) => this.pizzaService.updatePizza(pizza).pipe(
      map((pizza: Pizza) => new pizzasActions.UpdatePizzaSuccess(pizza)),
      catchError(error => of(new pizzasActions.UpdatePizzaFail(error)))
    ))
  );

  @Effect()
  deletePizza$ = this.actions$.ofType(pizzasActions.DELETE_PIZZA).pipe(
    map( (action: pizzasActions.DeletePizza) => action.payload),
    switchMap( (pizza: Pizza) => this.pizzaService.removePizza(pizza).pipe(
      map(() => new pizzasActions.DeletePizzaSuccess(pizza)),
      catchError(error => of(new pizzasActions.DeletePizzaFail(error)))
    ))
  );

  @Effect()
  handlePizzaSuccess$ = this.actions$.ofType(pizzasActions.DELETE_PIZZA_SUCCESS, pizzasActions.UPDATE_PIZZA_SUCCESS).pipe(
    map( (action: pizzasActions.CreatePizzaSuccess) => action.payload),
    map( () => new fromRoot.Go({
      path: ["/products"]
    }))
  );
}
