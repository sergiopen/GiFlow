import { Header } from "../components/layout/Header";
import UploadGif from "../components/UploadGif";

export const UploadPage = () => {
    return (
        <>
            <Header />
            <main className="max-w-4xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-center text-white">Sube tu GIF</h1>
                <UploadGif />
            </main>
        </>
    );
};
