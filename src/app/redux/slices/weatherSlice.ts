import { createSlice } from "@reduxjs/toolkit";

/**
 * Slicer для управления погодой в городах
 */
export const weatherSlice = createSlice({
    reducers: {
        setActiveCity(state, action) {
            state.currentCity = action.payload;
        },
        setActiveTemp(state, action) {
            state.currentTemp = action.payload;
        },
    },
    selectors: {
        selectActiveCity: (state) => state.currentCity,
        selectActiveTemp: (state) => state.currentTemp,
    },
    initialState: { currentCity: "Москва", currentTemp: "Celsius" },
    name: "weather",
});
export const { setActiveCity, setActiveTemp } = weatherSlice.actions;
export const { selectActiveCity, selectActiveTemp } = weatherSlice.selectors;
