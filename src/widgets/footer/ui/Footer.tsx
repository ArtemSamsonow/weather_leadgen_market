import { Button, useFavoriteCities } from "@/shared";
import { useDispatch } from "react-redux";
import { setActiveCity } from "@/app/redux";

/**
 * Подвал сайта, по совместительству отображаются избранные города
 */
export const Footer = () => {
    const { favoriteCities } = useFavoriteCities();
    const dispatch = useDispatch();

    const handleCityClick = (city: string) => {
        dispatch(setActiveCity(city));
    };

    return (
        favoriteCities.length !== 0 && (
            <footer className="py-4 bg-[#212832] mt-auto">
                <div className="container mx-auto px-4">
                    <p className="text-lg font-semibold mb-3">Сохраненные города</p>
                    <div className="flex flex-wrap gap-2">
                        {favoriteCities.map((city) => (
                            <Button key={city} onClick={() => handleCityClick(city)} className="w-auto">
                                {city}
                            </Button>
                        ))}
                    </div>
                </div>
            </footer>
        )
    );
};
