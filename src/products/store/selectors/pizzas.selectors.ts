import {createSelector} from "@ngrx/store";
import {getPizasLoaded, getPizzasEntities, getPizzasLoading} from "../reducers/pizzas.reducer";
import {getProductsState, ProductsState} from "../reducers";
import {getRouterState} from "../../../app/store/reducers";
import {Pizza} from "../../models/pizza.model";

export const getPizzasState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

export const getAllPizzasEntities = createSelector(getPizzasState, getPizzasEntities);

export const getSelectedPizza = createSelector(getAllPizzasEntities, getRouterState, (entities, router): Pizza => {
  return router.state && entities[router.state.params.pizzaId];
});

export const getAllPizzas = createSelector(getAllPizzasEntities, (entities) => {
  return Object.keys(entities).map((id) => entities[parseInt(id, 10)])
});
export const getAllPizzasLoaded = createSelector(getPizzasState, getPizasLoaded)

export const getAllPizzasLoading = createSelector(getPizzasState, getPizzasLoading)
