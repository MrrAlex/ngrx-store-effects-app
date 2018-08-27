import {createSelector} from "@ngrx/store";
import * as fromToppings from "../reducers/toppings.reducer";

export const getToppingsEntities = createSelector(getToppingState, fromToppings.getToppingsEntities);

export const getAllToppings = createSelector(getToppingsEntities, entities)
