import { RootState, store } from "@/store/store";
import {
  createSelector as createSelectorNative,
  Selector,
} from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";

export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const selector = <R>(selector: Selector<RootState, R>) => selector;

export const createSelector = <R>(
  selector: Selector<RootState, R>,
  combiner: (res: R) => R = (result) => result,
) => createSelectorNative(selector, combiner);
