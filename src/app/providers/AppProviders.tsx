import { PropsWithChildren } from "react";
import { StoreProvider } from "@/app/providers";

/**
 * Главный провайдер
 * @param children
 * @constructor
 */
export function AppProviders({ children }: PropsWithChildren) {
    return <StoreProvider>{children}</StoreProvider>;
}
