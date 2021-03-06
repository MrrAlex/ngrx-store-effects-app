import {createSelector} from "@ngrx/store";
import * as fromToppings from "../reducers/toppings.reducer";
import * as fromFeature from "../reducers";

export const getToppingState = createSelector(fromFeature.getProductsState, (state:fromFeature.ProductsState) => state.toppings);

export const getToppingsEntities = createSelector(getToppingState, fromToppings.getToppingsEntities);

export const getSelectedToppings = createSelector(getToppingState, fromToppings.getSelectedToppings);

export const getAllToppings = createSelector(getToppingsEntities, (entities) => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getToppingsLoaded = createSelector(getToppingState, fromToppings.getToppingsLoaded);

export const getToppingsLoading = createSelector(getToppingState, fromToppings.getToppingsLoading);
