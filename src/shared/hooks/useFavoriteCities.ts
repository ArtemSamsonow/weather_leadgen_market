import { useState, useEffect, useCallback } from "react";

interface UseFavoriteCitiesProps {
    currentCity?: string;
}

interface UseFavoriteCitiesReturn {
    /** Список избранных городов */
    favoriteCities: string[];
    /** Находится ли текущий город в избранном */
    isCurrentCityFavorite: boolean;
    /** Переключить состояние текущего города в избранном */
    toggleFavorite: () => void;
}

/**
 * Хук для управления списком избранных городов
 * @param currentCity - Название текущего города
 */
export const useFavoriteCities = ({ currentCity }: UseFavoriteCitiesProps = {}): UseFavoriteCitiesReturn => {
    const [favoriteCities, setFavoriteCities] = useState<string[]>([]);

    const loadFavoriteCities = useCallback(() => {
        try {
            const saved = localStorage.getItem("favorite_cities");
            if (saved) {
                setFavoriteCities(JSON.parse(saved));
            }
        } catch (error) {
            console.error("Ошибка при чтении избранных городов:", error);
        }
    }, []);

    useEffect(() => {
        loadFavoriteCities();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "favorite_cities") {
                loadFavoriteCities();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        const handleCustomEvent = () => loadFavoriteCities();
        window.addEventListener("favoriteCitiesUpdated", handleCustomEvent);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("favoriteCitiesUpdated", handleCustomEvent);
        };
    }, [loadFavoriteCities]);

    const saveFavoritesToStorage = useCallback((cities: string[]) => {
        try {
            localStorage.setItem("favorite_cities", JSON.stringify(cities));
            window.dispatchEvent(new CustomEvent("favoriteCitiesUpdated"));
        } catch (error) {
            console.error("Ошибка при сохранении избранных городов:", error);
        }
    }, []);

    const isCurrentCityFavorite = currentCity ? favoriteCities.includes(currentCity) : false;

    const addToFavorites = useCallback(
        (cityName: string) => {
            if (!cityName || favoriteCities.includes(cityName)) return;

            const updatedFavorites = [...favoriteCities, cityName];
            setFavoriteCities(updatedFavorites);
            saveFavoritesToStorage(updatedFavorites);
        },
        [favoriteCities, saveFavoritesToStorage],
    );

    const removeFromFavorites = useCallback(
        (cityName: string) => {
            if (!cityName) return;

            const updatedFavorites = favoriteCities.filter((city) => city !== cityName);
            setFavoriteCities(updatedFavorites);
            saveFavoritesToStorage(updatedFavorites);
        },
        [favoriteCities, saveFavoritesToStorage],
    );

    const toggleFavorite = useCallback(() => {
        if (!currentCity) return;

        if (isCurrentCityFavorite) {
            removeFromFavorites(currentCity);
        } else {
            addToFavorites(currentCity);
        }
    }, [currentCity, isCurrentCityFavorite, removeFromFavorites, addToFavorites]);

    return {
        favoriteCities,
        isCurrentCityFavorite,
        toggleFavorite,
    };
};
