import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { weatherApiReducer, weatherMiddleware, weatherReducerPath } from "@/features/weather";
import { weatherSlice } from "./slices";
import { useSelector } from "react-redux";

const rootReducer = combineSlices({
    [weatherReducerPath]: weatherApiReducer,
    weather: weatherSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([weatherMiddleware]),
});

export type RootState = ReturnType<typeof rootReducer>;

/**
 * Типизированный хук для селектора
 */
export function useAppSelector<TSelected>(
    selector: (state: RootState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean,
) {
    return useSelector<RootState, TSelected>(selector, equalityFn);
}
