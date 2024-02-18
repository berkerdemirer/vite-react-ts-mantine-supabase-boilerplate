import { RootState, store } from "@/store/store";
import {
  createSelector as createSelectorNative,
  Selector,
} from "@reduxjs/toolkit";

export type AppDispatch = typeof store.dispatch;
export const selector = <R>(selector: Selector<RootState, R>) => selector;

export const createSelector = <R>(
  selector: Selector<RootState, R>,
  combiner: (res: R) => R = (result) => result,
) => createSelectorNative(selector, combiner);
