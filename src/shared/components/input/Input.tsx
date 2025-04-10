import { InputHTMLAttributes } from "react";
import { Controller, useFormContext, FieldValues, FieldPath } from "react-hook-form";

export interface InputProps<TFieldValues extends FieldValues = FieldValues> extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
    name: FieldPath<TFieldValues>;
    className?: string;
}

/**
 * Кастомный компонент Input с интеграцией react-hook-form
 */
export const Input = <TFieldValues extends FieldValues = FieldValues>({
    name,
    className = "w-full text-white p-2 bg-[#2b323c] rounded",
    ...props
}: InputProps<TFieldValues>) => {
    const { control, getValues } = useFormContext<TFieldValues>();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={getValues(name)}
            render={({ field }) => <input {...field} {...props} className={className} value={field.value ?? ""} />}
        />
    );
};
