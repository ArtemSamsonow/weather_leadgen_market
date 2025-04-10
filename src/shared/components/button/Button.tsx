import { ButtonHTMLAttributes, FC } from "react";
import { Icon } from "@iconify/react";
import { HTMLMotionProps, motion } from "framer-motion";

type MotionButtonProps = Omit<HTMLMotionProps<"button">, keyof ButtonHTMLAttributes<HTMLButtonElement>> &
    ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonProps extends MotionButtonProps {
    icon?: string;
    iconPosition?: "left" | "right";
    color?: "primary";
    className?: string;
}

/**
 * Кастомный компонент кнопки
 */
export const Button: FC<ButtonProps> = ({ children, icon, iconPosition = "left", color = "primary", className = "", ...props }) => {
    const colorClasses = {
        primary: "bg-blue-500 transition-colors hover:bg-blue-600 text-white",
    };

    return (
        <motion.div
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
            }}
            style={{ display: "inline-block" }}
        >
            <button className={`flex items-center justify-center px-4 py-2 rounded-md ${colorClasses[color]} ${className}`} {...props}>
                {icon && iconPosition === "left" && (
                    <motion.div initial={{ x: -5, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                        <Icon icon={icon} className="mr-2 w-6 h-6" />
                    </motion.div>
                )}
                <motion.span initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }}>
                    {children}
                </motion.span>
                {icon && iconPosition === "right" && (
                    <motion.div initial={{ x: 5, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                        <Icon icon={icon} className="ml-2 w-6 h-6" />
                    </motion.div>
                )}
            </button>
        </motion.div>
    );
};
