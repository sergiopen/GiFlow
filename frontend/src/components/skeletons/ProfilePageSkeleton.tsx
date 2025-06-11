export const ProfilePageSkeleton = () => {
    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <section className="flex flex-col sm:flex-row sm:items-start sm:gap-6 mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg p-6 animate-pulse text-white">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left mb-6 sm:mb-0">
                    <div className="w-24 h-24 rounded-full bg-gray-700 mb-3" />
                    <div className="flex justify-center sm:justify-start gap-8 text-sm text-gray-300">
                        <div>
                            <div className="h-6 w-12 bg-gray-600 rounded mb-1" />
                            <div className="h-4 w-20 bg-gray-700 rounded" />
                        </div>
                        <div className="w-px bg-gray-600 hidden sm:block" />
                        <div>
                            <div className="h-6 w-12 bg-gray-600 rounded mb-1" />
                            <div className="h-4 w-20 bg-gray-700 rounded" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 space-y-3">
                    <div className="h-8 w-2/3 bg-gray-600 rounded" />
                    <div className="h-4 w-1/3 bg-gray-700 rounded" />
                    <div className="h-4 w-full bg-gray-700 rounded" />
                    <div className="h-4 w-5/6 bg-gray-700 rounded" />
                </div>
            </section>

            <div className="space-y-6">
                <div className="h-6 w-40 bg-gray-600 rounded mb-2" />
                <div className="flex overflow-x-auto gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="w-48 h-64 bg-gray-700 rounded-lg flex-shrink-0"
                        />
                    ))}
                </div>

                <div className="h-6 w-40 bg-gray-600 rounded mt-10 mb-2" />
                <div className="flex overflow-x-auto gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="w-48 h-64 bg-gray-700 rounded-lg flex-shrink-0"
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};
