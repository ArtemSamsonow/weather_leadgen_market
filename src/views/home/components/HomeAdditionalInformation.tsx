import { Button, useFavoriteCities } from "@/shared";
import { useGetWeatherCityQuery } from "@/features/weather";
import { selectActiveCity, selectActiveTemp, useAppSelector } from "@/app/redux";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Блок на главной странице с дополнительной информацие о погоде
 */
export const HomeAdditionalInformation = () => {
    const currentCity = useAppSelector(selectActiveCity);
    const currentTemp = useAppSelector(selectActiveTemp);
    const isCelsius = currentTemp === "Celsius";
    const { data } = useGetWeatherCityQuery({ city: currentCity });
    const { isCurrentCityFavorite, toggleFavorite } = useFavoriteCities({
        currentCity: data?.location?.name,
    });

    const formatDateShort = (dateStr: string) => {
        const parts = dateStr.split("-");
        return `${parts[2]}.${parts[1]}`;
    };

    const temperatureUnit = isCelsius ? "°C" : "°F";

    return (
        <aside className="bg-[#212832] p-8 gap-7 flex flex-col items-end z-10 w-full ssm:max-w-[400px] -translate-y-2 ssm:-translate-y-0 ssm:-translate-x-2 rounded-b-2xl ssm:rounded-bl-none ssm:rounded-r-2xl">
            <dl className="flex flex-col gap-1 w-full ssm:max-w-[325px]">
                {[
                    { label: "Скорость ветра", value: `${data?.current?.wind_kph} км/ч` },
                    { label: "Количество осадков", value: `${data?.current?.precip_mm} мм` },
                    { label: "Влажность", value: `${data?.current?.humidity} %` },
                    { label: "Облачность", value: `${data?.current?.cloud} %` },
                ].map((item, index) => (
                    <motion.div
                        key={item.label}
                        className="flex justify-between"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.3,
                            delay: index * 0.1,
                            ease: "easeOut",
                        }}
                    >
                        <dt className="font-bold">{item.label}</dt>
                        <dd className="overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={item.value}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {item.value}
                                </motion.span>
                            </AnimatePresence>
                        </dd>
                    </motion.div>
                ))}
            </dl>
            <section className="flex justify-center gap-3 p-3 w-full md:w-auto flex-col flex-wrap shadow-custom rounded-2xl h-full md:max-h-[150px]">
                {data?.forecast?.forecastday.map((day, index) => (
                    <article key={day.date}>
                        <div className="flex flex-row md:flex-col h-full items-center justify-between">
                            <img
                                src={day.day?.condition?.icon}
                                width={48}
                                height={48}
                                className="min-w-12 min-h-12"
                                alt={day.day?.condition?.text || `Погода на день ${index + 1}`}
                            />
                            <time dateTime={day.date}>{formatDateShort(day.date ?? "")}</time>
                            <div className="overflow-hidden h-[24px] flex items-center">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={`${currentCity}-day-${index}-${isCelsius ? "c" : "f"}`}
                                        className="font-bold"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.05,
                                        }}
                                    >
                                        {Math.floor(isCelsius ? (day.day?.avgtemp_c ?? 0) : (day.day?.avgtemp_f ?? 0))}
                                        {temperatureUnit}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        </div>
                    </article>
                ))}
            </section>

            <div className="flex w-full ssm:max-w-[325px] justify-center">
                <Button
                    icon={isCurrentCityFavorite ? "solar:star-bold" : "solar:star-linear"}
                    onClick={toggleFavorite}
                    className={isCurrentCityFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                >
                    {isCurrentCityFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                </Button>
            </div>
        </aside>
    );
};
