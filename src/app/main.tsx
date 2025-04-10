import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProviders } from "@/app/providers";
import { MainLayout } from "@/app/layout";

import "./styles/index.css";
import "./styles/tailwindcss.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppProviders>
            <MainLayout />
        </AppProviders>
    </StrictMode>,
);
