import {getPizasLoaded, getPizzasEntities, getPizzasLoading, PizzaState, reducer} from "./pizzas.reducer";
import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";

export interface ProductsState {
  pizzas: PizzaState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: reducer
}

export const getProductsState = createFeatureSelector<ProductsState>('products');

export const getPizzasState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

export const getAllPizzasEntities = createSelector(getPizzasState, getPizzasEntities)
export const getAllPizzas = createSelector(getAllPizzasEntities, (entities) => {
    return Object.keys(entities).map((id) => entities[parseInt(id, 10)])
  });
export const getAllPizzasLoaded = createSelector(getPizzasState, getPizasLoaded)
export const getAllPizzasLoading = createSelector(getPizzasState, getPizzasLoading)
