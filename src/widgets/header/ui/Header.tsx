import { RHFProvider } from "@/app/providers";
import { Button, Input } from "@/shared";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetWeatherCityQuery } from "@/features/weather";
import { useDispatch } from "react-redux";
import { setActiveCity } from "@/app/redux";

/**
 * Шапка сайта, по совместительству имеет форму с поиском городов
 */
export const Header = () => {
    const [city, setCity] = useState<string>("");
    const dispatch = useDispatch();

    const methods = useForm({
        defaultValues: {
            query: "",
        },
    });

    const { isLoading } = useGetWeatherCityQuery({ city }, { skip: !city });

    const onSubmit = methods.handleSubmit((formData) => {
        if (formData.query.trim()) {
            setCity(formData.query.trim());
            dispatch(setActiveCity(formData.query.trim()));
            methods.reset();
        }
    });

    return (
        <header className="flex justify-center gap-2 bg-[#212832] p-7">
            <RHFProvider methods={methods} onSubmit={onSubmit} className="flex relative w-full max-w-[520px] gap-2">
                <Input name="query" type="text" placeholder="Напишите ваш город" />
                <Button type="submit" className="absolute right-0 w-[120px]" disabled={isLoading} icon="solar:map-point-search-linear">
                    Поиск
                </Button>
            </RHFProvider>
        </header>
    );
};
