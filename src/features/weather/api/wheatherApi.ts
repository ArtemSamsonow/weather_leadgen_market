import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IWeatherItem, IWeatherPayload } from "@/features/weather";

/**
 * Api погоды
 */
export const weatherApi = createApi({
    reducerPath: "weatherApi",
    baseQuery: fetchBaseQuery({ baseUrl: `https://api.weatherapi.com/v1` }),
    tagTypes: ["Weather"],
    endpoints: (builder) => ({
        /**
         * Получение данных о погоде в определенном городе
         */
        getWeatherCity: builder.query<IWeatherItem, IWeatherPayload>({
            query: ({ city }) => ({
                url: `/forecast.json`,
                params: {
                    key: "db00a794de0e47e4a10152234250804",
                    q: city,
                    days: 5,
                },
            }),
            providesTags: ["Weather"],
        }),
    }),
});

export const {
    reducerPath: weatherReducerPath,
    middleware: weatherMiddleware,
    reducer: weatherApiReducer,
    useGetWeatherCityQuery,
} = weatherApi;
