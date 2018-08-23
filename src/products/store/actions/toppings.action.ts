import {Action} from "@ngrx/store";
import {Topping} from "../../models/topping.model";

export const LOAD_TOPPINGS = '[Products] Load Toppings';
export const LOAD_TOPPINGS_FAIL = '[Products] Load Toppings Fail';
export const LOAD_TOPPINGS_SUCCESS = '[Products] Load Toppings Success';

export class LoadTopping implements Action {
  readonly type: string = LOAD_TOPPINGS;
  constructor(public payload: any) {}
}

export class LoadToppingFail implements Action {
  readonly type: string = LOAD_TOPPINGS_FAIL;
  constructor(public payload: any) {}
}

export class LoadToppingSuccess implements Action {
  readonly type: string = LOAD_TOPPINGS_SUCCESS;
  constructor(public payload: Topping[]) {}
}

export type ToppingAction = LoadTopping | LoadToppingFail | LoadToppingSuccess;
