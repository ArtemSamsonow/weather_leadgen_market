import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { selectActiveTemp, setActiveTemp, useAppSelector } from "@/app/redux";

interface TemperatureSwitchProps {
    className?: string;
}

/**
 * Кастомный компонент Switch
 */
export const Switch = ({ className = "" }: TemperatureSwitchProps) => {
    const currentTemp = useAppSelector(selectActiveTemp);
    const isCelsius = currentTemp === "Celsius";
    const dispatch = useDispatch();

    const toggleTemp = () => {
        dispatch(setActiveTemp(isCelsius ? "Fahrenheit" : "Celsius"));
    };

    return (
        <div
            onClick={toggleTemp}
            style={{
                justifyContent: "flex-" + (isCelsius ? "start" : "end"),
            }}
            className={`px-2 py-1 flex cursor-pointer relative rounded-full w-[80px] min-w-[80px] h-fit bg-[#2b323c] ${className}`}
        >
            <motion.div
                layout
                transition={{
                    type: "spring",
                    visualDuration: 0.2,
                    bounce: 0.2,
                }}
                className="w-8 h-8 bg-blue-500 rounded-full"
            />
            <span className="absolute left-3 inset-y-0 h-6 my-auto">°C</span>
            <span className="absolute right-4 inset-y-0 h-6 my-auto">°F</span>
        </div>
    );
};
