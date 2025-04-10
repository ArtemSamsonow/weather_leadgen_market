import { Icon } from "@iconify/react";
import { Switch, useFormatDateAndGetWeekday } from "@/shared";
import { useGetWeatherCityQuery } from "@/features/weather";
import { selectActiveCity, selectActiveTemp, useAppSelector } from "@/app/redux";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Важная информация о погоде и местороложении
 */
export const HomeCard = () => {
    const currentCity = useAppSelector(selectActiveCity);
    const currentTemp = useAppSelector(selectActiveTemp);
    const isCelsius = currentTemp === "Celsius";
    const { data } = useGetWeatherCityQuery({ city: currentCity });

    const { dateFull, weekDay } = useFormatDateAndGetWeekday();
    const temp = isCelsius ? Math.floor(data?.current?.temp_c ?? 0) : Math.floor(data?.current?.temp_f ?? 0);
    const feelsLikeTemp = isCelsius ? Math.floor(data?.current?.feelslike_c ?? 0) : Math.floor(data?.current?.feelslike_f ?? 0);
    const tempUnit = isCelsius ? "°C" : "°F";

    return (
        <article className="flex z-20 flex-col justify-between bg-gradient-blue h-auto translate-y-2 ssm:-translate-y-0 ssm:translate-x-2 min-w-[300px] p-8 rounded-3xl shadow-md">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-bold">{weekDay}</h2>
                        <time dateTime={dateFull}>{dateFull}</time>
                    </div>
                    <Switch />
                </div>
                <address className="flex items-center gap-1 not-italic overflow-hidden">
                    <Icon icon="solar:map-point-linear" className="flex-shrink-0" />
                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={`location-${data?.location?.name}`}
                                initial={{ y: 15, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -15, opacity: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                    duration: 0.4,
                                }}
                                className="block"
                            >
                                {data?.location?.country} / {data?.location?.name}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </address>
            </div>
            <div className="flex flex-col items-end">
                <img
                    src={data?.current?.condition?.icon}
                    width={74}
                    height={74}
                    alt={data?.current?.condition?.text || "Погодные условия"}
                />
                <div className="text-5xl font-bold overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${temp}${tempUnit}`}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {temp}
                            {tempUnit}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="mt-2 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`feels-${feelsLikeTemp}${tempUnit}`}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            Ощущается как {feelsLikeTemp}
                            {tempUnit}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </article>
    );
};
