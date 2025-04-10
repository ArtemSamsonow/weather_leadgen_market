import { useGetWeatherCityQuery } from "@/features/weather";
import { HomeAdditionalInformation, HomeCard } from "@/views";
import { selectActiveCity, useAppSelector } from "@/app/redux";

/**
 * Главная
 */
export function HomePage() {
    const currentCity = useAppSelector(selectActiveCity);
    const { isLoading } = useGetWeatherCityQuery({ city: currentCity });

    return (
        !isLoading && (
            <main className="flex items-center justify-center px-3">
                <section className="flex flex-col ssm:flex-row w-full max-w-[700px]">
                    <HomeCard />
                    <HomeAdditionalInformation />
                </section>
            </main>
        )
    );
}
