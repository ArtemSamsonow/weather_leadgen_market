import { PropsWithChildren } from "react";
import { StoreProvider } from "@/app/providers";
import { ToastContainer } from "react-toastify";

/**
 * Главный провайдер
 * @param children
 * @constructor
 */
export function AppProviders({ children }: PropsWithChildren) {
    return (
        <StoreProvider>
            {children}
            <ToastContainer />
        </StoreProvider>
    );
}
