import * as fromStore from '../store';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {filter, map, switchMap, take, tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {Pizza} from "../models/pizza.model";

export class PizzaExistsGuard implements CanActivate {

  constructor(private store: Store<fromStore.ProductsState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.pizzaId, 10);
        return this.hasPizza(id);
      })
    );
  }

  hasPizza(id: number): Observable<boolean> {
    return this.store.select(fromStore.getAllPizzasEntities).pipe(
      map((entities: { [key: number]: Pizza }) => !!entities[id]),
      take(1)
    )
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getAllPizzasLoading).pipe(
      tap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadPizzas({}));
        }
      }),
      filter((loaded: boolean) => loaded),
      take(1)
    );
  }
}
