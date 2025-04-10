import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/redux";

/**
 * Redux store provider
 * @param children
 * @constructor
 */
export function StoreProvider({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
}
