import { HomePage } from "@views";
import { Footer, Header } from "@/widgets";

/**
 *  Отображение наполнения сайта (вместо HomePage может быть роутинг)
 */
export function MainLayout() {
    return (
        <div className="flex flex-col gap-5 min-h-screen">
            <Header />

            <div className="flex-grow">
                <HomePage />
            </div>

            <Footer />
        </div>
    );
}
