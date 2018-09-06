import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromStore from "../store";
import {filter, switchMap, take, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";

@Injectable()
export class PizzasGuard implements CanActivate{
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getAllPizzasLoading).pipe(
      tap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadPizzas({}));
        }
      }),
      filter( (loaded: boolean) => loaded),
      take(1)
    );
  }
}
