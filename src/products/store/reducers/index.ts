import {PizzaState, reducer} from "./pizzas.reducer";
import {ActionReducerMap, createFeatureSelector} from "@ngrx/store";

export interface ProductsState {
  pizzas: PizzaState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');
